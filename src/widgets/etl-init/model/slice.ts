import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CsvSource {
    type: "CsvHDFSSourceSettings";
    delimiter: string;
    paths: string[];
}

interface JsonSource {
    type: "JsonHDFSSourceSettings";
    paths: string[];
    field?: string;
}

interface XmlSource {
    type: "XmlHDFSSourceSettings";
    paths: string[];
    rootTag: string;
}

interface ClickHouseSource {
    type: string;
    host: string;
    port: string;
    username: string;
    password: string;
    database: string;
}

interface PostgreSQLSource {
    type: string;
    host: string;
    port: string;
    username: string;
    password: string;
    schema: string;
    database: string;
}


export type SourceSetting = CsvSource | JsonSource | XmlSource | ClickHouseSource | PostgreSQLSource;

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