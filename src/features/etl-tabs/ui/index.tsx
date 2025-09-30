import type React from "react";

interface IEtlTabs {
    handleType: (name: any) => void;
    type: string | null;
}

export const EtlTabs: React.FC<IEtlTabs> = ({ handleType, type }) => {
    return (
        <div className="w-full flex items-center gap-1 mt-[30px] overflow-hidden font-raleway font-[700]">
            <button
                onClick={() => handleType("CsvHDFSSourceSettings")}
                className={`${type === "CsvHDFSSourceSettings" ? "bg-secondary" : "bg-primary"
                    } hover:bg-secondary transition-all ease-in-out duration-200 
      rounded-tr-[10px] rounded-tl-[10px] min-w-[70px] md:min-w-[88px]
      border-2 border-secondary cursor-pointer h-[36px] md:h-[42px]
      px-[12px] md:px-[20px] text-xsmall xl:text-small 2xl:text-default `}
            >
                CSV
            </button>

            <button
                onClick={() => handleType("JsonHDFSSourceSettings")}
                className={`${type === "JsonHDFSSourceSettings" ? "bg-secondary" : "bg-primary"
                    } hover:bg-secondary transition-all ease-in-out duration-200 
      rounded-tr-[10px] rounded-tl-[10px] min-w-[70px] md:min-w-[88px]
      border-2 border-secondary cursor-pointer h-[36px] md:h-[42px]
      px-[12px] md:px-[26px] text-xsmall xl:text-small 2xl:text-default`}
            >
                JSON
            </button>

            <button
                onClick={() => handleType("XmlHDFSSourceSettings")}
                className={`${type === "XmlHDFSSourceSettings" ? "bg-secondary" : "bg-primary"
                    } hover:bg-secondary transition-all ease-in-out duration-200 
      rounded-tr-[10px] rounded-tl-[10px] min-w-[70px] md:min-w-[88px]
      border-2 border-secondary cursor-pointer h-[36px] md:h-[42px]
      px-[12px] md:px-[26px] text-xsmall xl:text-small 2xl:text-default`}
            >
                XML
            </button>

            <button
                onClick={() => handleType("ClickHouseSourceSettings")}
                className={`${type === "ClickHouseSourceSettings" ? "bg-secondary" : "bg-primary"
                    } hover:bg-secondary transition-all ease-in-out duration-200 
      rounded-tr-[10px] rounded-tl-[10px] min-w-[70px] md:min-w-[88px]
      border-2 border-secondary cursor-pointer h-[36px] md:h-[42px]
      px-[12px] md:px-[26px] text-xsmall xl:text-small 2xl:text-default`}
            >
                CLICKHOUSE
            </button>

            <button
                onClick={() => handleType("PostgreSQLSourceSettings")}
                className={`${type === "PostgreSQLSourceSettings" ? "bg-secondary" : "bg-primary"
                    } hover:bg-secondary transition-all ease-in-out duration-200 
      rounded-tr-[10px] rounded-tl-[10px] min-w-[70px] md:min-w-[88px]
      border-2 border-secondary cursor-pointer h-[36px] md:h-[42px]
      px-[12px] md:px-[26px] text-xsmall xl:text-small 2xl:text-default`}
            >
                POSTGRESQL
            </button>
        </div>

    )
}