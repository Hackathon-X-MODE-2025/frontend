import type React from "react";

interface IEtlParamForm {
    param: string;
    handleParam: (param: string) => void;
    handleSave: () => void;
    isTable: boolean;
    type: string | null;
    isSuccess: boolean;
    validateionError: boolean;
}

export const EtlParamForm: React.FC<IEtlParamForm> = ({ param, handleParam, handleSave, isSuccess, isTable, type, validateionError }) => {
    return (
        <div className="w-full flex items-center p-[20px] border border-t-0 border-secondary rounded-[10px]">
            {type === "CsvHDFSSourceSettings" && isSuccess && (
                <input
                    value={param}
                    onChange={(e) => handleParam(e.target.value)}
                    className="p-[20px] h-[53px] w-[40%] bg-secondary rounded-[10px] text-default"
                    placeholder="Введите разделитель..."
                />
            )}
            {type === "XmlHDFSSourceSettings" && isSuccess && (
                <input
                    value={param}
                    onChange={(e) => handleParam(e.target.value)}
                    className={`p-[20px] h-[53px] w-[40%] bg-secondary rounded-[10px] text-default ${validateionError && 'border-1 border-red-500'}`}
                    placeholder="Введите тэг..."
                />
            )}
            {
                isTable && <button onClick={handleSave} className="text-default h-[53px] border-1 border-secondary  rounded-[10px] ml-[30px] cursor-pointer px-[20px]">ДОБАВИТЬ</button>
            }



        </div>
    )
}