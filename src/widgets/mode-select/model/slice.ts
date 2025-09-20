import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDefaulChatMode: false,
    isEtlMode: false,
}

export const modeSelectSlice = createSlice({
    name: 'modeSelectSlice',
    initialState,
    reducers: {
        setDefaultChatMode: (state, { payload }) => {
            state.isDefaulChatMode = payload
        },
        setEtlMode: (state, { payload }) => {
            state.isEtlMode = payload
        }
    }
})

export const { setDefaultChatMode, setEtlMode } = modeSelectSlice.actions