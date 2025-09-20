import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CsvSource {
    type: "CsvSourceSettings";
    delimiter: string;
    s3Paths: string[];
}

interface JsonSource {
    type: "JsonSourceSettings";
    s3Paths: string[];
    field?: string;
}

interface XmlSource {
    type: "XmlSourceSettings";
    s3Paths: string[];
    rootTag: string;
}

export type SourceSetting = CsvSource | JsonSource | XmlSource;

export interface IEtlInitSlice {
    sourceSettings: SourceSetting[] | [];
}

const initialState: IEtlInitSlice = {
    sourceSettings: []
}

export const etlInitSlice = createSlice({
    name: 'etlInitSlice',
    initialState,
    reducers: {
        addEtlSource: (state, { payload }: PayloadAction<SourceSetting>) => {
            const temp = [...state.sourceSettings]
            temp.push(payload)
            state.sourceSettings = [...temp]
        },
        // remooveEtlSource: (state, {payload}) => {
        //     const temp = [...state.sourceSettings].filter((el) => el.s3Paths !=== payload)

        // },
        resetEtlSources: () => initialState
    }
})

export const { addEtlSource, resetEtlSources } = etlInitSlice.actions