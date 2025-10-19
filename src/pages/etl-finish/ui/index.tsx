import { useEffect } from "react";
import { useGetSessionQuery } from "../../../entities/session/session-api";
import { useNavigate, useParams } from "react-router-dom";


export const EtlFinish = () => {
    const { id } = useParams()

    const navigate = useNavigate()

    const { data: sessionData, isSuccess, isFetching, isError } = useGetSessionQuery(id, {
        pollingInterval: 1000,
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        if (!isSuccess) return
        if (sessionData.status === 'FINISHED') {
            navigate(`/s/${id}/c/f`)
        }
    }, [isFetching])

    useEffect(() => {
        if (isError) {
            navigate('/')
        }
    }, [isFetching])

    const handleRedirect = () => {
        window.open('https://air-hack.bigtows.org/')
    }

    if (!isSuccess) return null
    if (sessionData?.status !== 'FINISHED') return null

    return (
        <div className="flex justify-center items-center text-default font-raleway h-full">
            <div className="flex flex-col items-center justify-center p-[50px] bg-secondary rounded-[10px]">
                <button className="px-[88px] py-[20px] font-raleway font-bold text-[36px] transition-all duration-300 bg-[#3270C2] rounded-[10px] cursor-pointer hover:bg-[#579BF3]" onClick={handleRedirect}>AIRFLOW</button>
                <span className="mt-[30px] text-[17px] font-raleway">DAG передан, ожидайте синхронизации</span>
            </div>
        </div>
    )
}