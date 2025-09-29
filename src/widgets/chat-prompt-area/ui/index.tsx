import { useEffect, useRef, useState } from "react";
import { ArrowUpIco } from "../../../shared/svg_components/arrow-up-ico";


export const ChatPromptArea = () => {
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto"; // сброс
        el.style.height = Math.min(el.scrollHeight, 200) + "px";
        // тут 200px = максимум, можно поменять
    }, [value]);
    return (
        <div className="w-2/3 flex bg-secondary rounded-[10px] ml-[120px] mt-[30px] h-[85px] overflow-auto scrollbar-hidden font-ralyway relative">
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Введите запрос"
                className="w-11/12 px-3 py-2 bg-transparent text-white outline-none resize-none overflow-y-auto scrollbar-hidden"
                rows={1}
            />
            <button className="w-[35px] h-[35px] bg-[#403F56] hover:bg-[#65658C] duration-200 transition-all flex justify-center items-center rounded-[81px] shrink-0 right-[15px] absolute bottom-[15px] cursor-pointer">
                <ArrowUpIco />
            </button>
        </div>
    )
}