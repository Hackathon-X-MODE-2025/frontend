import { Box } from "@mui/material"
import { ModeSelect } from "../../../widgets/mode-select/ui"
import { DefaultChat } from "../../../widgets/default-chat/ui"
import { EtlInit } from "../../../widgets/etl-init/ui"


export const WorkSpace = () => {
    return (
        <Box className='flex h-full overflow-hidden'>
            <ModeSelect />
            <DefaultChat />
            <EtlInit />
        </Box>
    )
}