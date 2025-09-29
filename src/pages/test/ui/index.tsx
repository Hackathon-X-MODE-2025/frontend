

export const TestPage = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <video
                src="/l2.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-[400px] h-[400px]"
            />
        </div>
    )
}