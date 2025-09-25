import type React from "react";

interface IEtlSetupAnalyze {
    handleContinue: () => void;
}

export const EtlSetupContinue: React.FC<IEtlSetupAnalyze> = ({ handleContinue }) => {
    return (
        <div
            className="text-end w-full bg-secondary rounded-br-[10px] rouded-bl-[10px] p-[20px]"

        >
            <button className=" bg-[#478FEE] hover:bg-[#64A7FF] transition-all ease-in-out duration-200 w-1/3 h-[53px] rounded-[10px] text-default cursor-pointer" onClick={handleContinue}>
                Продолжить
            </button>
        </div>
    )
}