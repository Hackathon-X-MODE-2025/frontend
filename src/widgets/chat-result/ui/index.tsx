import { useParams } from "react-router-dom"
import { useConfirmChatMutation } from "../../../entities/session/session-api"


export const ChatResult = () => {
    const { id } = useParams()
    const [confirmChatTrigger] = useConfirmChatMutation()

    const handleConfirm = () => {
        confirmChatTrigger(id)
    }
    return (
        <div className="2xl:w-[calc(33%-120px)] mt-[30px] relative">
            <button onClick={handleConfirm} className="bg-[#478FEE] font-[700] hover:bg-[#64A7FF] transition-all duration-200 text-small 2xl:text-default h-[53px] px-[20px] rounded-[10px] cursor-pointer  ">ПОЛУЧИТЬ РЕЗУЛЬТАТ</button>
        </div>
    )
}