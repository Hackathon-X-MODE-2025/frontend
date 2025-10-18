

export const EtlAnalyzing: React.FC<any> = ({ progress }) => {
    const progressValue = progress === null ? 0 : progress
    return (
        <div className="flex justify-center items-center h-full">
            <video
                src="/analazying.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-[400px] h-[400px]"
            />
            <div className="w-[400px] h-[7px] bg-secondary rounded-[10px] ">
                <div className={` bg-[#F1F1F1] h-full rounded-[10px] transition-all duration-500 ease-in-out`} style={{ width: `${progressValue}%` }} />
            </div>
        </div>
    )
}