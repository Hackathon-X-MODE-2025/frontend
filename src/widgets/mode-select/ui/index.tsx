import { Box } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { setDefaultChatMode, setEtlMode } from "../model/slice"
import { DefaultChatIco } from "../../../shared/svg_components/default-chat-ico"
import { EtlChatIco } from "../../../shared/svg_components/elt-chat-ico"


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
        <Box className='flex w-full gap-[30px] items-center justify-center'>
            <div onClick={defaultChat} className="w-[369px] h-[200px] bg-secondary hover:bg-[#403F56] transition ease-in-out flex p-[30px] rounded-[10px] items-start cursor-pointer">
                <div className="w-full flex items-center justify-between">
                    <span className="text-title">Начать чат</span>
                    <DefaultChatIco />
                </div>
            </div>
            <div onClick={modeEtl} className="w-[369px] h-[200px] bg-secondary hover:bg-[#403F56] transition ease-in-out flex p-[30px] rounded-[10px] items-start cursor-pointer">
                <div className="w-full flex items-center justify-between">
                    <span className="text-title">ETL-режим</span>
                    <EtlChatIco />
                </div>
            </div>
        </Box>
    )
}