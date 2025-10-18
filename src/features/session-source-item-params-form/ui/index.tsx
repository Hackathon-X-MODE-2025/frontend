import type React from "react";
import { CrossIco } from "../../../shared/svg_components/cross-ico";
import { useForm, } from "react-hook-form"
import { SOURCE_MAP_SETTINGS } from "../../../widgets/session-choose-source/model/constants";
import { motion, AnimatePresence } from "motion/react";

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

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={close}
                    />

                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ type: "spring", stiffness: 250, damping: 22 }}
                    >
                        <motion.div
                            className="bg-[#262637B2] pt-[30px] rounded-[10px] pb-[30px] px-[20px] min-w-[400px] flex flex-col relative shadow-lg"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-white font-medium">{title}</span>
                                <button
                                    className="cursor-pointer transition-transform duration-300 hover:rotate-180"
                                    onClick={close}
                                >
                                    <CrossIco />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-x-[30px] gap-y-[20px] mt-[30px]">
                                {formSchema.map((item: any) => (
                                    <div key={item.name} className="flex flex-col gap-1">
                                        <div>
                                            <span className="text-small text-white">{item.title}</span>
                                            <span className="text-[#ac3c41]">*</span>
                                        </div>
                                        <input
                                            {...register(item.name, { required: item.required })}
                                            className={`h-[53px] ${errors[item.name] ? "border border-[#ac3c41]" : ""
                                                } bg-secondary px-[20px] rounded-[10px] w-[350px] outline-none`}
                                            placeholder={item.placeholder || "Введите значение"}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-center mt-[40px]">
                                <button
                                    onClick={handleSubmit(handleContinue)}
                                    className="h-[53px] px-[57px] bg-[#3270C2] hover:bg-[#478FEE] transition-all duration-200 ease-in-out w-fit rounded-[10px] cursor-pointer text-white"
                                >
                                    Продолжить
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}