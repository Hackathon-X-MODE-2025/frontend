import { Box } from "@mui/material"
import { EtlChat } from "../../../widgets/etl-chat/ui"
import { EtlChatText } from "../../../widgets/etl-chat-text/ui"


export const Session = () => {
    return (
        <Box className='h-full relative'>
            <EtlChatText />
            <EtlChat />
        </Box>
    )
}