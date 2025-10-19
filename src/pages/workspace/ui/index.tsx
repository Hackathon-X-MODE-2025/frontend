import { Box } from "@mui/material"
import { ModeSelect } from "../../../widgets/mode-select/ui"
// import { DefaultChat } from "../../../widgets/default-chat/ui"
import { EtlInit } from "../../../widgets/etl-init/ui"
import { AuthorizeForm } from "../../../shared/components/authorize-form"
import { useCheckAuth } from "../../../shared/hooks/user-hooks"
import { AnimatePresence, motion } from 'motion/react'
import { useAppSelector } from "../../../app/hooks"


export const WorkSpace = () => {
    const { userInfo } = useCheckAuth();
    const isEtlMode = useAppSelector((state) => state.modeSelectSlice.isEtlMode)

    return (
        <Box className='flex h-full overflow-hidden pt-[73px] pb-[44px] px-[52px]'>
            <AuthorizeForm />

            {userInfo?.userId && (
                <>
                    <AnimatePresence mode="wait">
                        {!isEtlMode && (
                            <motion.div
                                key="mode-select"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="w-full h-full flex justify-center"
                            >
                                <ModeSelect />
                            </motion.div>
                        )}

                        {isEtlMode && (
                            <motion.div
                                key="etl-init"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="w-full h-full"
                            >
                                <EtlInit />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}
        </Box>
    );
};