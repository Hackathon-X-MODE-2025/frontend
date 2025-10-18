import type React from "react";
import { CrossIco } from "../../../shared/svg_components/cross-ico";
import { EtlSetupAnalyze } from "../../etl-setup-analyze/ui";
import { motion, AnimatePresence } from "motion/react";

interface IPreAnalyzeModal {
    open: boolean;
    formValue: any;
    handleClose: () => void;
    handleChangePreAnalyzeForm: (name: string, value: string) => void;
    complete: () => void;
}

export const PreAnalyzeModal: React.FC<IPreAnalyzeModal> = ({
    open,
    handleClose,
    handleChangePreAnalyzeForm,
    formValue,
    complete,
}) => {
    const isDisabled = Object.entries(formValue).filter(([k]: any) => Boolean(formValue[k])).length !== 3
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
                        onClick={handleClose}
                    />

                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 250, damping: 25 }}
                    >
                        <motion.div
                            className="bg-[#262637B2] rounded-[10px] pt-[55px] pb-[30px] px-[20px] 
                         min-w-[400px] flex flex-col gap-[23px] relative shadow-lg"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={handleClose}
                                className="absolute right-6 top-6 cursor-pointer transition-transform duration-300 hover:rotate-180"
                            >
                                <CrossIco />
                            </button>

                            <div className="flex items-center gap-[20px]">
                                <div className="flex flex-col gap-1">
                                    <span className="text-small text-white">
                                        Общий потенциальный размер данных
                                    </span>
                                    <input
                                        required
                                        onChange={(e) =>
                                            handleChangePreAnalyzeForm(e.target.name, e.target.value)
                                        }
                                        value={formValue.expectedSizeInGB}
                                        name="expectedSizeInGB"
                                        type="number"
                                        className={`${!formValue?.expectedSizeInGB && 'border border-red-400'} h-[53px] bg-secondary px-[20px] rounded-[10px] w-[350px]`}
                                        placeholder="Введите число ГБ"
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="text-small text-white">Частота обновлений</span>
                                    <select
                                        required
                                        onChange={(e) =>
                                            handleChangePreAnalyzeForm(e.target.name, e.target.value)
                                        }
                                        name="updateRate"
                                        value={formValue.updateRate}
                                        defaultValue=""
                                        className={`${formValue?.updateRate === '' ? 'border border-red-400' : 'border-none'} h-[53px] bg-secondary px-[20px] rounded-[10px] w-[350px] text-white placeholder-slate-400 outline-none  appearance-none cursor-pointer`}
                                    >
                                        <option value="" disabled>
                                            Выберите значение
                                        </option>
                                        <option value="LOW">Редко</option>
                                        <option value="NORMAL">Среднее</option>
                                        <option value="HIGH">Часто</option>
                                        <option value="SUPER_HIGH">Очень часто</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-[20px]">
                                <div className="flex flex-col gap-1">
                                    <span className="text-small text-white">
                                        Расписание обновлений
                                    </span>
                                    <select
                                        required
                                        onChange={(e) =>
                                            handleChangePreAnalyzeForm(e.target.name, e.target.value)
                                        }
                                        name="schedulerRate"
                                        value={formValue.schedulerRate}
                                        defaultValue=""
                                        className={`${formValue?.schedulerRate === '' ? 'border border-red-400' : 'border-none'} h-[53px] bg-secondary px-[20px] rounded-[10px] w-[350px] text-white placeholder-slate-400 outline-none  appearance-none cursor-pointer`}
                                    >
                                        <option value="" disabled>
                                            Выберите значение
                                        </option>
                                        <option value="EVERY_HOUR">Каждый час</option>
                                        <option value="EVERY_DAY">Каждый день</option>
                                        <option value="EVERY_WEEK">Каждую неделю</option>
                                        <option value="EVERY_MONTH">Каждый месяц</option>
                                        <option value="EVERY_YEAR">Каждый год</option>
                                    </select>
                                </div>
                            </div>

                            <EtlSetupAnalyze disabled={isDisabled} handleAnalyze={complete} />
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};