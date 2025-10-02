import { useNavigate, useParams } from "react-router-dom"
import { useConfirmChatMutation } from "../../../entities/session/session-api"
import type React from "react"


export const ChatResult: React.FC<any> = ({ setLoading }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [confirmChatTrigger] = useConfirmChatMutation()

    const handleConfirm = () => {
        confirmChatTrigger(id)
        setLoading(true)
    }
    return (
        <div className="2xl:w-[calc(33%-120px)] mt-[30px] relative">
            <button onClick={handleConfirm} className="bg-[#478FEE] font-[700] hover:bg-[#64A7FF] transition-all duration-200 text-small 2xl:text-default h-[53px] px-[20px] rounded-[10px] cursor-pointer  ">ПОЛУЧИТЬ РЕЗУЛЬТАТ</button>
        </div>
    )
}