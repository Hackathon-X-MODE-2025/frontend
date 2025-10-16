import { API } from "../../app/api";
import type { SourceSettingReq } from "../../widgets/etl-init/model/slice";


export interface ICreateSessionReq {
    userId: string;
    sourceSettings: SourceSettingReq[];
    expectedSizeInGB: number,
    schedulerRate: string;
    updateRate: string;
}

interface ICreateSessionRes {
    id: string,
    status: string
}

export interface EtlSessionChatDto {
    id: number;
    ddl: string;
    dag: string;
    createdDate: string;
    modifiedDate: string;
}

export interface PageInfo {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}

export interface PagedModelEtlSessionChatDto {
    content: EtlSessionChatDto[];
    page: PageInfo;
}

export interface PageableRequest {
    page: number;
    id: any;
    // size: number;
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
        }),
        chooseDataBase: builder.mutation({
            query: ({ id, body }) => {
                return {
                    url: `/etl-setup/sessions/${id}/choose-data-base`,
                    method: 'POST',
                    body
                }
            }
        }),
        getChat: builder.query<PagedModelEtlSessionChatDto, PageableRequest>({
            query: ({ page, id }) => {
                return {
                    url: `/etl-setup/sessions/${id}/chats?page=${page}&size=30&sort=id,Asc`
                }
            }
        }),
        patchRecomendationsChat: builder.mutation({
            query: ({ id, body }) => {
                return {
                    url: `/etl-setup/sessions/${id}/chats`,
                    method: 'PATCH',
                    body
                }
            }
        }),
        confirmChat: builder.mutation({
            query: (id) => {
                return {
                    url: `/etl-setup/sessions/${id}/chats/commit`,
                    method: 'POST'
                }
            }
        })
    })
})

export const {
    useCreateSessionMutation,
    useGetSessionQuery,
    useGetSessionsQuery,
    useChooseDataBaseMutation,
    useGetChatQuery,
    usePatchRecomendationsChatMutation,
    useConfirmChatMutation
} = sessionApi