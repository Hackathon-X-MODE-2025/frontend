
interface ISessionSourceItem {
    background: string;
    isDisabled: boolean;
    icon: React.ReactNode;
    content: string;
    confirm: (name: string) => void;
    title: string;
    index: number;
}

export const SessionSourceItem: React.FC<ISessionSourceItem> = ({ background, isDisabled, icon, content, confirm, title, index }) => {
    return (
        <div className="flex gap-[20px] p-[20px] bg-secondary relative h-[167px] rounded-[10px] overflow-x-hidden">
            <div style={{ backgroundColor: background }} className={`w-[80px] h-[80px] p-[15px] flex justify-center items-center rounded-[10px] `}>
                {icon}
            </div>
            <div className="flex flex-col  ">
                <span className="text-default font-raleway font-bold">{index}. {title}</span>
                <div
                    className="p-0 m-0 text-small font-raleway mt-[5px]
             leading-[1rem] max-h-[3.2rem] overflow-y-auto"
                >
                    {content}
                </div>

                {!isDisabled && <button onClick={() => confirm(title)} className="font-raleway hover:bg-[#65658C40] transition-all duration-200 font-[600] absolute bottom-4  px-[15px] py-[5px] border-1 border-[#65658C] text-small rounded-[5px] cursor-pointer w-fit">ПРОДОЛЖИТЬ</button>}
                {isDisabled && <div className="h-[30px] px-[15px] " />}
            </div>
            {isDisabled && <div className="absolute w-full h-full z-10 bg-black opacity-30 top-0 left-0 rounded-[10px]" />}
        </div>
    )
}