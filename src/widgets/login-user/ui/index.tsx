import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useState } from "react"
import { useLoginUserMutation } from "../../../entities/user/user-api"
import { API } from "../../../app/api"


export const LoginUser = () => {
    const [loginUser] = useLoginUserMutation()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const [loading, setLoading] = useState(false)

    const handleSave = (data: any) => {
        setLoading(true)
        loginUser(data)
            .unwrap()
            .then((res) => {
                localStorage.setItem('user_id', res.id)
                localStorage.setItem('user_name', res.login)
                API.util.resetApiState()
            })
            .catch(() => {
                toast.error('Ошибка авторизации')
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <div className="flex flex-col gap-2">
            <input
                {...register('login', { required: 'Поле обязательно' })}
                className={`p-[10px] h-[53px] w-full  bg-primary rounded-[10px] text-default ${errors['login'] && 'border border-red-400'}`}
                placeholder="Введите логин..."
            />
            <input
                {...register('password', { required: 'Поле обязательно' })}
                type="password"
                className={`p-[10px] h-[53px] w-full bg-primary rounded-[10px] text-default ${errors['password'] && 'border border-red-400'}`}
                placeholder="Введите пароль..."
            />
            <button disabled={loading} onClick={handleSubmit(handleSave)} className={`bg-[#478FEE] hover:bg-[#64A7FF] transition-all ease-in-out duration-200  h-[53px] rounded-[10px] text-small 2xl:text-default cursor-pointer min-w-[100px] mt-2 ${loading && 'opacity-40'}`}>
                {loading ? 'Загрузка' : 'Подтвердить'}
            </button>
        </div>
    )
}
