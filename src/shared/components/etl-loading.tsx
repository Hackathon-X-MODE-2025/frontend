

export const EtlLoading = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <video
                src="/etl.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-[400px] h-[400px]"
            />
        </div>
    )
}