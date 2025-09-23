import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CsvSource {
    type: "CsvHDFSSourceSettings";
    delimiter: string;
    paths: string[];
    id: string;
}

interface JsonSource {
    type: "JsonHDFSSourceSettings";
    paths: string[];
    field?: string;
    id: string;
}

interface XmlSource {
    type: "XmlHDFSSourceSettings";
    paths: string[];
    rootTag: string;
    id: string;
}

interface ClickHouseSource {
    type: 'ClickHouseSourceSettings';
    host: string;
    port: string;
    username: string;
    password: string;
    database: string;
    id: string;
}

interface PostgreSQLSource {
    type: 'PostgreSQLSourceSettings';
    host: string;
    port: string;
    username: string;
    password: string;
    schema: string;
    database: string;
    id: string;
}


export type SourceSetting = CsvSource | JsonSource | XmlSource | ClickHouseSource | PostgreSQLSource;
export type SourceSettingReq = Omit<SourceSetting, "id">;

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
        remooveEtlSource: (state, { payload }) => {
            const temp = [...state.sourceSettings].filter((el) => el.id !== payload)
            state.sourceSettings = [...temp]

        },
        resetEtlSources: () => initialState
    }
})

export const { addEtlSource, resetEtlSources, remooveEtlSource } = etlInitSlice.actions