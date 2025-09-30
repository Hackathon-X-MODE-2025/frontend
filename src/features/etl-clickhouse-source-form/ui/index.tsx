import type React from "react"

interface IEtlClickHouseSourceForm {
    clickhouseForm: {
        type: string,
        host: string,
        port: string,
        username: string,
        password: string,
        database: string
    };
    handleChangeClickHouseForm: (name: string, value: string) => void;
    handleSave: () => void;
}

export const EtlClickHouseSourceForm: React.FC<IEtlClickHouseSourceForm> = ({ clickhouseForm, handleChangeClickHouseForm, handleSave }) => {
    return (
        <div className="flex-1 overflow-y-auto border border-b-0 border-secondary flex items-center justify-center">

            <div className="flex flex-col gap-[20px]">

                <div className="flex items-center gap-[20px]">
                    <div className="flex flex-col gap-1">
                        <span className="text-small">Host</span>
                        <input
                            onChange={(e) => handleChangeClickHouseForm(e.target.name, e.target.value)}
                            value={clickhouseForm.host}
                            name="host"
                            className="h-[53px] bg-secondary px-[20px] rounded-[10px] w-[140px] 2xl:w-[310px]"
                            placeholder="Введите Host"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-small">Порт</span>
                        <input
                            onChange={(e) => handleChangeClickHouseForm(e.target.name, e.target.value)}
                            value={clickhouseForm.port}
                            name="port"
                            className="h-[53px] bg-secondary px-[20px] rounded-[10px] w-[140px] 2xl:w-[310px]"
                            placeholder="Введите порт"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-[20px]">
                    <div className="flex flex-col gap-1">
                        <span className="text-small">Логин</span>
                        <input
                            onChange={(e) => handleChangeClickHouseForm(e.target.name, e.target.value)}
                            value={clickhouseForm.username}
                            name="username"
                            className="h-[53px] bg-secondary px-[20px] rounded-[10px] w-[140px] 2xl:w-[310px]"
                            placeholder="Введите Логин"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-small">Пароль</span>
                        <input
                            onChange={(e) => handleChangeClickHouseForm(e.target.name, e.target.value)}
                            value={clickhouseForm.password}
                            name="password"
                            className="h-[53px] bg-secondary px-[20px] rounded-[10px] w-[140px] 2xl:w-[310px]"
                            placeholder="Введите Пароль"
                        />
                    </div>
                </div>

                <div className="flex items-center ">
                    <div className="flex flex-col gap-1">
                        <span className="text-small">Имя базы данных</span>
                        <input
                            onChange={(e) => handleChangeClickHouseForm(e.target.name, e.target.value)}
                            value={clickhouseForm.database}
                            name="database"
                            className="h-[53px] bg-secondary px-[20px] rounded-[10px] w-[140px] 2xl:w-[310px]"
                            placeholder="Введите имя"
                        />
                    </div>
                    <button onClick={handleSave} className="text-default h-[53px] border-1 border-secondary  rounded-[10px] ml-[20px] cursor-pointer px-[20px] self-end">ДОБАВИТЬ</button>
                </div>

            </div>



        </div>
    )
}