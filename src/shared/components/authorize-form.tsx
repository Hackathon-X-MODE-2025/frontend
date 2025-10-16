import { useState } from "react"
import { RegisterUser } from "../../widgets/register-user/ui"
import { LoginUser } from "../../widgets/login-user/ui"


export const AuthorizeForm = () => {
    const [tab, setTab] = useState<0 | 1>(1)
    return (
        <div className="flex w-full flex-wrap gap-[20px] items-center justify-center">
            <div className="p-8  bg-secondary rounded-[10px] flex flex-col gap-2">
                <div className="flex justify-center items-center gap-2">
                    <button className={`${tab === 1 && 'text-white border-b border-b-white'} text-gray-500 cursor-pointer`} onClick={() => setTab(1)}>ВОЙТИ</button>
                    <button className={`${tab === 0 && 'text-white border-b border-b-white'} text-gray-500 cursor-pointer`} onClick={() => setTab(0)}>РЕГИСТРАЦИЯ</button>
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

        </div>
    )
}