import type React from "react";

interface IEtlSetupAnalyze {
    handleAnalyze: () => void;
    disabled: boolean
}

export const EtlSetupAnalyze: React.FC<IEtlSetupAnalyze> = ({ handleAnalyze, disabled }) => {
    return (
        <div
            className="text-center  rounded-br-[10px] rouded-bl-[10px] p-[20px]"

        >
            <button disabled={disabled} className={`${disabled ? 'opacity-30' : 'hover:bg-[#478FEE]'} bg-[#3270C2]  px-[50px] transition-all ease-in-out duration-200 h-[53px] rounded-[10px] text-default cursor-pointer`} onClick={handleAnalyze}>
                Начать анализ
            </button>
        </div>
    )
}