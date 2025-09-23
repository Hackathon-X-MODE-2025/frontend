import { API } from "../../app/api";
import type { SourceSettingReq } from "../../widgets/etl-init/model/slice";


export interface ICreateSessionReq {
    sourceSettings: SourceSettingReq[]
}

interface ICreateSessionRes {
    id: string,
    status: string
}

export const sessionApi = API.injectEndpoints({
    endpoints: (builder) => ({
        createSession: builder.mutation<ICreateSessionRes, ICreateSessionReq>({
            query: (body) => {
                return {
                    url: '/etl-setup/sessions',
                    method: 'POST',
                    body
                }
            }
        }),
        getSessions: builder.query({
            query: () => `/etl-setup/sessions`
        }),
        getSession: builder.query({
            query: (id) => `/etl-setup/sessions/${id}`
        })
    })
})

export const { useCreateSessionMutation, useGetSessionQuery, useGetSessionsQuery } = sessionApi