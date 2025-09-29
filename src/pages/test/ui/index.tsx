

export const TestPage = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <video
                src="/l.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-[400px] h-[400px]"
            />
        </div>
    )
}