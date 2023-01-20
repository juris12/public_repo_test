import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            transformResponse: responseData => {
                return usersAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => [
                
                { type: 'User', id: "LIST" },
                
                ...result.ids.map(id => ({ type: 'User', id }))
            ]
        }),
        getUsersByUserId: builder.query({
            query: id => `/users/${id}`,
            transformResponse: responseData => {
                return usersAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => [
                ...result.ids.map(id => ({ type: 'User', id }))
            ]
        }),
        addNewUser: builder.mutation({
            query: initialPost => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialPost
                }
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),
        updateUser: builder.mutation({
            query: initialPost => ({
                url: `/users/${initialPost.id}`,
                method: 'PATCH',
                body: {
                    ...initialPost
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/users/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        })
    })
})

export const {
    useGetUsersQuery,
    useGetUsersByUserIdQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApiSlice