import { API } from "../../app/api";


export const userApi = API.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (body) => {
                return {
                    url: '/etl-setup/users',
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: ['session']
        }),
        loginUser: builder.mutation({
            query: (body) => {
                return {
                    url: '/etl-setup/users/authorize',
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: ['session']
        })
    })
})


export const {
    useLoginUserMutation,
    useRegisterUserMutation
} = userApi