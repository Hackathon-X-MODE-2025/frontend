import { API } from "../../app/api";
import { resetProgress, setProgress } from "./slice";


export interface IBrowseStoreRes {
    directory: boolean;
    lastModified: number;
    name: string;
    size: number
}

export const hdfsApi = API.injectEndpoints({
    endpoints: (builder) => ({
        browseStore: builder.query<IBrowseStoreRes[], string>({
            query: (path) => `hdfs/browse?path=${path}`,
        }),
        previewFile: builder.query({
            query: (path) => `hdfs/browse/preview?path=${path}`
        }),

        uploadFiles: builder.mutation<{ file: string; success: boolean }[], { files: File[]; path: string }>({
            async queryFn({ files, path }, api, _extra, baseQuery) {
                const results: { file: string; success: boolean }[] = [];

                for (const file of files) {
                    api.dispatch(setProgress({ file: file.name, progress: 0 }));
                    try {
                        const createRes = await baseQuery({
                            url: `hdfs/s3/multipart/create?key=${path}${file.name}`,
                            method: "POST",
                        });
                        if (createRes.error) throw createRes.error;
                        const { uploadId } = createRes.data as { uploadId: string };

                        const chunkSize = 64 * 1024 * 1024;
                        const parts: { partNumber: number; eTag: string }[] = [];

                        let partNumber = 1;
                        for (let i = 0; i < file.size; i += chunkSize) {
                            const chunk = file.slice(i, i + chunkSize);

                            const presignRes = await baseQuery({
                                url: `hdfs/s3/multipart/presign?key=${path}${file.name}&uploadId=${uploadId}&partNumber=${partNumber}`,
                                method: "GET",
                            });
                            if (presignRes.error) throw presignRes.error;
                            const { url } = presignRes.data as { url: string };

                            const putRes = await fetch(url, { method: "PUT", body: chunk });
                            if (!putRes.ok) throw new Error("Chunk upload failed");

                            const eTag = putRes.headers.get("Etag") ?? "";
                            parts.push({ partNumber, eTag });

                            const progress = Math.min(100, Math.round(((i + chunk.size) / file.size) * 100));
                            api.dispatch(setProgress({ file: file.name, progress }));

                            partNumber++;
                        }

                        await baseQuery({
                            url: `hdfs/s3/multipart/complete?key=${path}${file.name}&uploadId=${uploadId}`,
                            method: "POST",
                            body: parts,
                        });

                        results.push({ file: file.name, success: true });
                        api.dispatch(resetProgress(file.name));
                    } catch (err) {
                        console.error(err);
                        results.push({ file: file.name, success: false });
                        api.dispatch(resetProgress(file.name));
                    }
                }

                return { data: results };
            },
        }),
    }),
    overrideExisting: false,
});

export const {
    useLazyBrowseStoreQuery,
    useBrowseStoreQuery,
    useUploadFilesMutation,
    useLazyPreviewFileQuery
} = hdfsApi;
