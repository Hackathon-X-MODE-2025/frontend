import type React from "react";
import { CrossIco } from "../../../shared/svg_components/cross-ico";
import { useForm, } from "react-hook-form"
import { SOURCE_MAP_SETTINGS } from "../../../widgets/session-choose-source/model/constants";

interface ISessionSourceItemParamsForm {
    open: boolean;
    formValues: any;
    formSchema: any;
    handleClose: () => void;
    complete: (result: any) => void;
    title: string;
    formName: string;
}

export const SessionSourceItemParamsForm: React.FC<ISessionSourceItemParamsForm> = ({ title, formName, open, handleClose, formValues, formSchema, complete }) => {

    const { register, formState: { errors }, handleSubmit, reset } = useForm({
        defaultValues: formValues
    })

    const close = () => {
        reset()
        handleClose()
    }

    const handleContinue = (data: any) => {
        const result = {
            ...data,
            type: SOURCE_MAP_SETTINGS[formName]
        }
        complete(result)
    }

    if (!open) return
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-[#262637B2] pt-[30px] rounded-[10px]  pb-[30px] px-[20px] min-w-[400px] flex flex-col relative">
                <div className="flex justify-between items-center">
                    <span>{title}</span>
                    <button className="cursor-pointer" onClick={close}><CrossIco /></button>

                </div>


                <div className="grid grid-cols-2 gap-x-[30px] gap-y-[20px] mt-[30px]">
                    {
                        formSchema.map((item: any) => (
                            <div key={item.name} className="flex flex-col gap-1">
                                <div>
                                    <span className="text-small">{item.title}</span>
                                    <span className="text-[#ac3c41]">*</span>
                                </div>
                                <input
                                    {...register(item.name, { required: item.required })}
                                    className={`h-[53px] ${errors[item.name] && 'border-1 border-[#ac3c41]'} bg-secondary px-[20px] rounded-[10px] w-[350px]`}
                                    placeholder="Введите число ГБ"
                                />
                            </div>
                        ))
                    }
                </div>
                <div className="flex items-center justify-center mt-[40px]">
                    <button onClick={handleSubmit(handleContinue)} className="h-[53px] px-[57px] bg-[#11816E] hover:bg-[#44A37A] transition-all duration-200 ease-in-out w-fit rounded-[10px] cursor-pointer">Продолжить</button>
                </div>


            </div>
        </div>
    )
}