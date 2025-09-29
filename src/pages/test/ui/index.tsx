

export const TestPage = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <video
                src="/loading.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-[400px] h-[400px]"
            />
        </div>
    )
}