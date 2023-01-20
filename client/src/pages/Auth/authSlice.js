import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null,role: null, id: null,name:null },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken, role, id } = action.payload
            state.token = accessToken
            state.role = role
            state.id = id
        },
        setUser: (state, action) => {
            const { user_name } = action.payload
            state.name = user_name
        },
        logOut: (state, action) => {
            state.token = null
            state.role = null
            state.id = null
        },
    }
})

export const { setCredentials, logOut, setUser } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token