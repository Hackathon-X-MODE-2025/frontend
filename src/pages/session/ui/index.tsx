import { Box } from "@mui/material"
import { SessionsChooseSource } from "../../../widgets/session-choose-source/ui"
import { useGetSessionQuery } from "../../../entities/session/session-api";
import { useParams } from "react-router-dom";
// import { EtlChat } from "../../../widgets/etl-chat/ui"
// import { EtlChatText } from "../../../widgets/etl-chat-text/ui"


export const Session = () => {
    const { id } = useParams()
    const { data: sessionData, isSuccess } = useGetSessionQuery(id, {
        pollingInterval: 1000,
        refetchOnMountOrArgChange: true,
    });

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