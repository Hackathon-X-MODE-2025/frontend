import { useParams } from "react-router-dom";
import { useGetSessionQuery } from "../../../entities/session/session-api";
import { ChatReadWindow } from "../../../widgets/chat-read-window/ui";
import { ChatPromptArea } from "../../../widgets/chat-prompt-area/ui";
import { ChatResult } from "../../../widgets/chat-result/ui";



export const Chat = () => {
    const { id } = useParams()
    const { data: sessionData, isSuccess } = useGetSessionQuery(id, {
        pollingInterval: 1000,
        refetchOnMountOrArgChange: true,
    });

    console.group(sessionData)

    if (!isSuccess) return
    return (
        <div className='h-full relative font-raleway'>
            <ChatReadWindow />
            <div className="flex">
                <ChatPromptArea />
                <ChatResult />
            </div>
        </div>
    )
}