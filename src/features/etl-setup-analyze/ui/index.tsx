import type React from "react";

interface IEtlSetupAnalyze {
    handleAnalyze: () => void;
}

export const EtlSetupAnalyze: React.FC<IEtlSetupAnalyze> = ({ handleAnalyze }) => {
    return (
        <div
            className="text-center  rounded-br-[10px] rouded-bl-[10px] p-[20px]"

        >
            <button className=" bg-[#11816E] hover:bg-[#44A37A] px-[50px] transition-all ease-in-out duration-200 h-[53px] rounded-[10px] text-default cursor-pointer" onClick={handleAnalyze}>
                Начать анализ
            </button>
        </div>
    )
}