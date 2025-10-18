import { PlusIco } from "../../../shared/svg_components/plus-ico";
import { Tooltip } from "react-tooltip";

interface ISessionSourceItem {
    background: string;
    isDisabled: boolean;
    icon: React.ReactNode;
    content: string;
    confirm: (name: string) => void;
    title: string;
    index: number;
    pros: string[];
    cons: string[];
}

export const SessionSourceItem: React.FC<ISessionSourceItem> = ({
    pros,
    cons,
    background,
    isDisabled,
    icon,
    content,
    confirm,
    title,
    index,
}) => {
    const isRecomended = pros?.length > 0 || cons?.length > 0;

    const tooltipId = `rec-tooltip-${title}`;

    return (
        <>
            <div className="flex gap-[20px] p-[20px] bg-secondary relative h-[150px] rounded-[10px] overflow-x-hidden">
                <div
                    style={{ backgroundColor: background }}
                    className="w-[110px] h-[110px] p-[15px] flex justify-center items-center rounded-[10px] flex-shrink-0"
                >
                    {icon}
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                        <span className="text-default font-raleway font-bold">
                            {index}. {title}
                        </span>

                        {isRecomended && (
                            <>
                                <button
                                    data-tooltip-id={tooltipId}
                                    data-tooltip-place="bottom"
                                    data-tooltip-offset={12}
                                    data-tooltip-float
                                    className="-translate-y-2 translate-x-1 font-raleway hover:bg-[#65658C40] transition-all duration-200 xl:font-[400] 2xl:font-[600] px-[2px] py-[5px] border-1 border-[#65658C] block text-xsmall 2xl:text-small rounded-[5px] cursor-pointer w-fit"
                                >
                                    <PlusIco height={10} />
                                </button>

                                <Tooltip
                                    id={tooltipId}
                                    float
                                    clickable
                                    className="!bg-[#2E2E46]/90 !text-white !p-4 !rounded-xl !w-[400px] !max-w-none !font-raleway !shadow-xl !z-[9999]"
                                    style={{
                                        backdropFilter: "blur(8px)",
                                        border: "1px solid #4F4F72",
                                        position: "fixed",
                                        zIndex: 9999,
                                    }}
                                >
                                    <div className="text-sm font-semibold mb-2 uppercase tracking-wide">
                                        Рекомендуемый выбор
                                    </div>

                                    <div className="flex flex-col gap-1 text-[13px]">
                                        {pros.map((el, i) => (
                                            <span key={i}>
                                                {i + 1}. {el}
                                            </span>
                                        ))}
                                    </div>

                                    {cons.length > 0 && (
                                        <>
                                            <hr className="my-3 border-[#65658C80]" />
                                            <div className="flex flex-col gap-1 text-[13px] text-gray-300">
                                                {cons.map((el, i) => (
                                                    <span key={i}>
                                                        {i + 1}. {el}
                                                    </span>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </Tooltip>
                            </>
                        )}

                    </div>

                    <div className="m-0 text-[13px] font-raleway mt-[1px] leading-[1rem] max-h-[3rem] overflow-y-auto">
                        {content}
                    </div>

                    {!isDisabled && (
                        <button
                            onClick={() => confirm(title)}
                            className="font-raleway hover:bg-[#65658C40] transition-all duration-200 font-[600] absolute bottom-4 px-[15px] py-[5px] border-1 border-[#65658C] text-small rounded-[5px] cursor-pointer w-fit"
                        >
                            ПРОДОЛЖИТЬ
                        </button>
                    )}

                    {isDisabled && (
                        <button className="font-raleway font-[600] absolute bottom-4 px-[15px] py-[5px] border-1 border-[#DF3D3D] text-small rounded-[5px] cursor-pointer w-fit">
                            СЕЙЧАС НЕДОСТУПНО
                        </button>
                    )}
                </div>

                {isDisabled && (
                    <div className="absolute w-full h-full z-10 bg-black opacity-30 top-0 left-0 rounded-[10px]" />
                )}
            </div>
        </>
    );
};
