import { Box } from "@mui/material"
import { useAppSelector } from "../../../app/hooks"


export const DefaultChat = () => {
    const isDefaultChat = useAppSelector((state) => state.modeSelectSlice.isDefaulChatMode)

    if (!isDefaultChat) return null
    return (
        <Box className='flex gap-2 justify-center items-center w-full'>
            <textarea
                className="w-10/12 min-h-[80px] bg-[#303030] text-white placeholder-slate-400
             rounded-xl p-4 text-base outline-none resize-none
             border border-transparent  transition"
                placeholder="Напиши свой запрос сюда..."
            />
        </Box>
    )
}