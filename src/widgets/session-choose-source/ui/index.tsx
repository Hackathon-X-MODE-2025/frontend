


export const SessionsChooseSource = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex flex-wrap items-center gap-2">
                <button className="h-[53px] cursor-pointer px-[20px] hover:bg-secondary border-1 border-secondary transition-all duration-200 rounded-[10px]">HDFS</button>
                <button className="h-[53px] cursor-pointer px-[20px] hover:bg-secondary border-1 border-secondary transition-all duration-200 rounded-[10px]">POSTGRES</button>
                <button className="h-[53px] cursor-pointer px-[20px] hover:bg-secondary border-1 border-secondary transition-all duration-200 rounded-[10px]">CLICK_HOUSE</button>
                <button className="h-[53px] cursor-pointer px-[20px] hover:bg-secondary border-1 border-secondary transition-all duration-200 rounded-[10px]">MONGO_DB</button>
                <button className="h-[53px] cursor-pointer px-[20px] hover:bg-secondary border-1 border-orange-400 transition-all duration-200 rounded-[10px]">CASSANDRA</button>
                <button className="h-[53px] cursor-pointer px-[20px] hover:bg-secondary border-1 border-yellow-500 transition-all duration-200 rounded-[10px]">ELASTICSEARCH</button>
                <button className="h-[53px] cursor-pointer px-[20px] hover:bg-secondary border-1 border-green-400 transition-all duration-200 rounded-[10px]">TIMESCALE_DB</button>
                <button className="h-[53px] cursor-pointer px-[20px] hover:bg-secondary border-1 border-red-500 transition-all duration-200 rounded-[10px]">SCYLLA_DB</button>
            </div>

        </div>
    )
}