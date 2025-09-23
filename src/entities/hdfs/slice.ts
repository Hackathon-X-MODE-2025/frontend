import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UploadProgress {
    file: string;
    progress: number;
}

interface UploadState {
    files: Record<string, number>;
}

const initialState: UploadState = {
    files: {},
};

export const uploadSlice = createSlice({
    name: "uploadSlice",
    initialState,
    reducers: {
        setProgress: (state, action: PayloadAction<UploadProgress>) => {
            state.files[action.payload.file] = action.payload.progress;
        },
        resetProgress: (state, action: PayloadAction<string>) => {
            delete state.files[action.payload];
        },
        resetAll: () => initialState,
    },
});

export const { setProgress, resetProgress, resetAll } = uploadSlice.actions;
