import { useState } from "react"
import { RegisterUser } from "../../widgets/register-user/ui"
import { LoginUser } from "../../widgets/login-user/ui"
import { useCheckAuth } from "../hooks/user-hooks"
import { AnimatePresence, motion } from "motion/react"


export const AuthorizeForm = () => {
    const { userInfo } = useCheckAuth()
    const [tab, setTab] = useState<0 | 1>(1)
    return (
        <AnimatePresence>
            {
                !userInfo?.userId && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        transition={{ type: "spring", stiffness: 220, damping: 20 }}
                        className="flex justify-center items-center w-full"
                    >
                        <div className="p-[30px]  bg-primary border-2 border-secondary rounded-[10px] flex flex-col gap-2">
                            <div className="flex  gap-2 font-sans">
                                <button className={`${tab === 1 && 'text-white border-b border-b-white'} text-gray-500 cursor-pointer transition-all duration-300 ease-in-out`} onClick={() => setTab(1)}>Вход</button>
                                <button className={`${tab === 0 && 'text-white border-b border-b-white'} text-gray-500 cursor-pointer transition-all duration-300 ease-in-out`} onClick={() => setTab(0)}>Регистрация</button>
                            </div>
                            <div className="mt-2">
                                {
                                    tab === 0 && <RegisterUser />
                                }
                                {
                                    tab === 1 && <LoginUser />
                                }
                            </div>
                        </div>

                    </motion.div>
                )
            }

        </AnimatePresence>

    )
}