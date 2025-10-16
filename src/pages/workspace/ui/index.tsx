import { Box } from "@mui/material"
import { ModeSelect } from "../../../widgets/mode-select/ui"
// import { DefaultChat } from "../../../widgets/default-chat/ui"
import { EtlInit } from "../../../widgets/etl-init/ui"
import { AuthorizeForm } from "../../../shared/components/authorize-form"
import { useCheckAuth } from "../../../shared/hooks/user-hooks"


export const WorkSpace = () => {
    const { userInfo } = useCheckAuth()
    return (
        <Box className='flex h-full overflow-hidden pt-[73px] pb-[44px] px-[52px]'>
            {
                !userInfo?.userId && <AuthorizeForm />
            }

            {
                userInfo?.userId &&
                <>
                    <ModeSelect />
                    <EtlInit />
                </>
            }
            {/* <DefaultChat /> */}
        </Box>
    )
}