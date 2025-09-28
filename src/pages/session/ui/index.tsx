import { Box } from "@mui/material"
import { SessionsChooseSource } from "../../../widgets/session-choose-source/ui"
import { useGetSessionQuery } from "../../../entities/session/session-api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
// import { EtlChat } from "../../../widgets/etl-chat/ui"
// import { EtlChatText } from "../../../widgets/etl-chat-text/ui"


export const Session = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: sessionData, isSuccess, isFetching } = useGetSessionQuery(id, {
        pollingInterval: 1000,
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        if (!isSuccess) return
        if (sessionData.status !== 'USER_WAITING') return
        navigate(`/s/${id}/c`)
    }, [isFetching])

    return (
        <Box className='h-full relative'>
            {/* <EtlChatText />
            <EtlChat /> */}
            {
                isSuccess && sessionData.status === 'USER_CHOOSE_DATABASE' && <SessionsChooseSource />
            }

        </Box>
    )
}