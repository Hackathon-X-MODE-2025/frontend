import { Box } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { setDefaultChatMode, setEtlMode } from "../model/slice"


export const ModeSelect = () => {
    const dispatch = useAppDispatch()

    const isDefaulChatMode = useAppSelector((state) => state.modeSelectSlice.isDefaulChatMode)
    const isEtlMode = useAppSelector((state) => state.modeSelectSlice.isEtlMode)

    const isModeSelect = !isDefaulChatMode && !isEtlMode

    const modeEtl = () => {
        dispatch(setEtlMode(true))
    }

    const defaultChat = () => {
        dispatch(setDefaultChatMode(true))
    }

    if (!isModeSelect) return null

    return (
        <Box className='flex gap-2 items-center'>
            <button
                onClick={defaultChat}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl px-8 py-4 text-lg shadow-lg hover:shadow-indigo-700/50 transition cursor-pointer"
            >
                Начать чат
            </button>

            <button
                onClick={modeEtl}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl px-8 py-4 text-lg shadow-lg hover:shadow-emerald-700/50 transition cursor-pointer"
            >
                Режим ETL
            </button>
        </Box>
    )
}