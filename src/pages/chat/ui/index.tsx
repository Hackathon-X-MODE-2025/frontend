import { useNavigate, useParams } from "react-router-dom";
import { useGetSessionQuery } from "../../../entities/session/session-api";
import { ChatReadWindow } from "../../../widgets/chat-read-window/ui";
import { ChatPromptArea } from "../../../widgets/chat-prompt-area/ui";
import { ChatResult } from "../../../widgets/chat-result/ui";
import { EtlLoading } from "../../../shared/components/etl-loading";
import { useEffect, useState } from "react";
import { EtlAnalyzing } from "../../../shared/components/etl-analyzing";



export const Chat = () => {
    const navigate = useNavigate()
    const [finishLoading, setFinishLoading] = useState(false)
    const { id } = useParams()
    const { data: sessionData, isSuccess, isFetching } = useGetSessionQuery(id, {
        pollingInterval: 1000,
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        if (!isSuccess) return
        if (sessionData.status === 'FINISHED') {
            navigate(`/s/${id}/c/f`)
        }
    }, [isFetching])

    if (!isSuccess) return
    if ((isSuccess && sessionData.status === 'ETL_CREATION') || finishLoading) {
        return (
            <EtlLoading progress={sessionData.process} />
        )
    }
    if (isSuccess && sessionData.status === 'AI_ETL_ANALYZING') {
        return (
            <EtlAnalyzing progress={sessionData.process} />
        )
    }
    return (
        <div className='h-full relative font-raleway'>
            {/* {isSuccess && sessionData.status === 'AI_ETL_ANALYZING' && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-lg">Анализ...</span>
                </div>
            )} */}
            <ChatReadWindow />
            <div className="flex items-center justify-between pr-[50px] gap-[20px]">
                {
                    isSuccess && sessionData.status !== 'AI_ETL_ANALYZING' && <ChatPromptArea />
                }
                {
                    isSuccess && sessionData.status !== 'AI_ETL_ANALYZING' && <ChatResult setLoading={setFinishLoading} />
                }
            </div>
        </div>
    )
}