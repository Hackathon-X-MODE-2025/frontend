import { API } from "../../app/api";
import type { SourceSettingReq } from "../../widgets/etl-init/model/slice";


export interface ICreateSessionReq {
    sourceSettings: SourceSettingReq[];
    expectedSizeInGB: number,
    schedulerRate: string;
    updateRate: string;
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
            },
            invalidatesTags: ['session']
        }),
        getSessions: builder.query({
            query: ({ page, pageSize }) => `/etl-setup/sessions?page=${page}&size=${pageSize}`,
            providesTags: ['session']
        }),
        getSession: builder.query({
            query: (id) => `/etl-setup/sessions/${id}`
        })
    })
})

export const { useCreateSessionMutation, useGetSessionQuery, useGetSessionsQuery } = sessionApi