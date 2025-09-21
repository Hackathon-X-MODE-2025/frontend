import { API } from "../../app/api";


export const hdfsApi = API.injectEndpoints({
    endpoints: (builder) => ({
        browseStore: builder.query({
            query: (path: string) => `hdfs/browse?path=${path}`
        })
    })
})


export const { useLazyBrowseStoreQuery, useBrowseStoreQuery } = hdfsApi