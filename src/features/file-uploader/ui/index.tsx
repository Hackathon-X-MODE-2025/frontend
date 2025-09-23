import { useAppSelector } from "../../../app/hooks";
import { useUploadFilesMutation } from "../../../entities/hdfs/hdfs-api";


export const FileUploader = () => {
    const [uploadFiles, { isLoading }] = useUploadFilesMutation();
    const progress = useAppSelector((s) => s.uploadSlice.files);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        await uploadFiles(files);
    };

    return (
        <div>
            <input type="file" multiple onChange={handleUpload} />
            {isLoading && <p>Загрузка идёт...</p>}
            <ul>
                {Object.entries(progress).map(([name, p]) => (
                    <li key={name}>
                        {name}: {p}%
                    </li>
                ))}
            </ul>
        </div>
    );
}