import type React from "react";
import { useAppSelector } from "../../../app/hooks";

interface IEtlSetupAnalyze {
    handleContinue: () => void;
}

export const EtlSetupContinue: React.FC<IEtlSetupAnalyze> = ({ handleContinue }) => {
    const sourceSettings = useAppSelector((s) => s.etlInitSlice.sourceSettings);

    if (sourceSettings.length === 0) return null
    return (
        <div
            className="text-start 2xl:text-end w-full bg-secondary rounded-br-[10px] rouded-bl-[10px] p-[20px]"

        >
            <button className=" bg-[#478FEE] hover:bg-[#64A7FF] transition-all ease-in-out duration-200 w-1/3 h-[53px] rounded-[10px] text-small 2xl:text-default cursor-pointer min-w-[100px] " onClick={handleContinue}>
                Продолжить
            </button>
        </div>
    )
}