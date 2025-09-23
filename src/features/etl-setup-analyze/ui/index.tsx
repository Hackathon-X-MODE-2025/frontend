import type React from "react";

interface IEtlSetupAnalyze {
    handleAnalyze: () => void;
}

export const EtlSetupAnalyze: React.FC<IEtlSetupAnalyze> = ({ handleAnalyze }) => {
    return (
        <div
            className="text-center w-full bg-secondary rounded-br-[10px] rouded-bl-[10px] p-[20px]"

        >
            <button className=" bg-[#478FEE] hover:bg-[#64A7FF] transition-all ease-in-out duration-200 w-full h-[53px] rounded-[10px] text-default cursor-pointer" onClick={handleAnalyze}>
                Начать анализ
            </button>
        </div>
    )
}