import { Box } from "@mui/material"
import { SessionsChooseSource } from "../../../widgets/session-choose-source/ui"
// import { EtlChat } from "../../../widgets/etl-chat/ui"
// import { EtlChatText } from "../../../widgets/etl-chat-text/ui"


export const Session = () => {
    return (
        <Box className='h-full relative'>
            {/* <EtlChatText />
            <EtlChat /> */}
            <SessionsChooseSource />

        </Box>
    )
}