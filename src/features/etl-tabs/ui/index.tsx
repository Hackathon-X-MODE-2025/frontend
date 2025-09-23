import type React from "react";

interface IEtlTabs {
    handleType: (name: any) => void;
    type: string | null;
}

export const EtlTabs: React.FC<IEtlTabs> = ({ handleType, type }) => {
    return (
        <div className="w-full flex items-center gap-1 mt-[30px]">
            <button
                onClick={() => handleType("CsvHDFSSourceSettings")}
                className={`text-default ${type === 'CsvHDFSSourceSettings' ? 'bg-secondary' : 'bg-primary'} hover:bg-secondary transition-all ease-in-out duration-200 rounded-tr-[10px] rounded-tl-[10px] min-w-[88px] border-2 border-secondary cursor-pointer h-[42px]`}>
                Csv
            </button>
            <button
                onClick={() => handleType("JsonHDFSSourceSettings")}
                className={`text-default ${type === 'JsonHDFSSourceSettings' ? 'bg-secondary' : 'bg-primary'} hover:bg-secondary transition-all ease-in-out duration-200  px-[26px] rounded-tr-[10px] rounded-tl-[10px] min-w-[88px] border-2 border-secondary cursor-pointer h-[42px]`}>
                Json
            </button>
            <button
                onClick={() => handleType("XmlHDFSSourceSettings")}
                className={`text-default ${type === 'XmlHDFSSourceSettings' ? 'bg-secondary' : 'bg-primary'} hover:bg-secondary transition-all ease-in-out duration-200   px-[26px] rounded-tr-[10px] rounded-tl-[10px] min-w-[88px] border-2 border-secondary cursor-pointer h-[42px]`}>
                Xml
            </button>
            <button
                onClick={() => handleType("ClickHouseSourceSettings")}
                className={`text-default ${type === 'ClickHouseSourceSettings' ? 'bg-secondary' : 'bg-primary'} hover:bg-secondary transition-all ease-in-out duration-200   px-[26px] rounded-tr-[10px] rounded-tl-[10px] min-w-[88px] border-2 border-secondary cursor-pointer h-[42px]`}>
                ClickHouse
            </button>
            <button
                onClick={() => handleType("PostgreSQLSourceSettings")}
                className={`text-default ${type === 'PostgreSQLSourceSettings' ? 'bg-secondary' : 'bg-primary'} hover:bg-secondary transition-all ease-in-out duration-200  px-[26px] rounded-tr-[10px] rounded-tl-[10px] min-w-[88px] border-2 border-secondary cursor-pointer h-[42px]`}>
                PostgreSQL
            </button>
        </div>
    )
}