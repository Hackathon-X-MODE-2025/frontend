import type React from "react";
import { CrossIco } from "../../../shared/svg_components/cross-ico";
import { EtlSetupAnalyze } from "../../etl-setup-analyze/ui";

interface IPreAnalyzeModal {
    open: boolean;
    formValue: any;
    handleClose: () => void;
    handleChangePreAnalyzeForm: (name: string, value: string) => void;
    complete: () => void;
}

export const PreAnalyzeModal: React.FC<IPreAnalyzeModal> = ({ open, handleClose, handleChangePreAnalyzeForm, formValue, complete }) => {

    if (!open) return
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-[#262637B2] rounded-[10px] pt-[55px] pb-[30px] px-[20px] min-w-[400px] flex flex-col gap-[23px] relative">
                <button className="absolute right-6 top-6 cursor-pointer" onClick={handleClose}><CrossIco /></button>
                <div className="flex  items-center gap-[20px]">

                    <div className="flex flex-col gap-1">
                        <span className="text-small">Общий потенциальный размер данных</span>
                        <input
                            onChange={(e) => { handleChangePreAnalyzeForm(e.target.name, e.target.value) }}
                            value={formValue.size}
                            name="expectedSizeInGB"
                            type="number"
                            className="h-[53px] bg-secondary px-[20px] rounded-[10px] w-[350px]"
                            placeholder="Введите число ГБ"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-small">Частота обновлений</span>
                        <select
                            onChange={(e) => { handleChangePreAnalyzeForm(e.target.name, e.target.value) }}
                            name="updateRate"
                            value={formValue.shedule}
                            className="h-[53px] bg-secondary px-[20px] rounded-[10px] w-[350px] 
                            text-white placeholder-slate-400 outline-none border-none
                            appearance-none cursor-pointer"
                            defaultValue=""
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
                        <span className="text-small">Расписание обновлений</span>
                        <select
                            onChange={(e) => { handleChangePreAnalyzeForm(e.target.name, e.target.value) }}
                            name="schedulerRate"
                            value={formValue.frequency}
                            className="h-[53px] bg-secondary px-[20px] rounded-[10px] w-[350px] 
                            text-white placeholder-slate-400 outline-none border-none
                            appearance-none cursor-pointer"
                            defaultValue=""
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

                    {/* <div className="flex flex-col gap-1">
                        <span className="text-small">Еще поле</span>
                        <input
                            onChange={(e) => { handleChangePreAnalyzeForm(e.target.name, e.target.value) }}
                            value={formValue.other}
                            name="other"
                            className="h-[53px] bg-secondary px-[20px] rounded-[10px] w-[350px]"
                            placeholder="ПАМАГИТЕ"
                        />
                    </div> */}


                </div>

                <EtlSetupAnalyze handleAnalyze={complete} />

            </div>
        </div>
    )
}