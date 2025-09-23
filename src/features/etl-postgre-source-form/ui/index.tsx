

interface IEtlPostgreSourceForm {
    postgreForm: {
        type: string,
        host: string,
        port: string,
        username: string,
        password: string,
        schema: string,
        database: string
    };
    handleChangePostgreForm: (name: string, value: string) => void;
    handleSave: () => void;
}

export const EtlPostgreSourceForm: React.FC<IEtlPostgreSourceForm> = ({ postgreForm, handleChangePostgreForm, handleSave }) => {
    return (
        <div className="flex-1 overflow-y-auto border border-b-0 border-secondary flex items-center justify-center">

            <div className="flex flex-col gap-[20px]">

                <div className="flex items-center gap-[20px]">
                    <div className="flex flex-col gap-1">
                        <span className="text-small">Host</span>
                        <input
                            onChange={(e) => handleChangePostgreForm(e.target.name, e.target.value)}
                            value={postgreForm.host}
                            name="host"
                            className="h-[53px] bg-secondary px-[20px] rounded-[10px] w-[350px]"
                            placeholder="Введите Host"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-small">Порт</span>
                        <input
                            onChange={(e) => handleChangePostgreForm(e.target.name, e.target.value)}
                            value={postgreForm.port}
                            name="port"
                            className="h-[53px] bg-secondary px-[20px] rounded-[10px] w-[350px]"
                            placeholder="Введите порт"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-[20px]">
                    <div className="flex flex-col gap-1">
                        <span className="text-small">Логин</span>
                        <input
                            onChange={(e) => handleChangePostgreForm(e.target.name, e.target.value)}
                            value={postgreForm.username}
                            name="username"
                            className="h-[53px] bg-secondary px-[20px] rounded-[10px] w-[350px]"
                            placeholder="Введите Логин"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-small">Пароль</span>
                        <input
                            onChange={(e) => handleChangePostgreForm(e.target.name, e.target.value)}
                            value={postgreForm.password}
                            name="password"
                            className="h-[53px] bg-secondary px-[20px] rounded-[10px] w-[350px]"
                            placeholder="Введите Пароль"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-[20px]">
                    <div className="flex flex-col gap-1">
                        <span className="text-small">Имя базы данных</span>
                        <input
                            onChange={(e) => handleChangePostgreForm(e.target.name, e.target.value)}
                            value={postgreForm.database}
                            name="database"
                            className="h-[53px] bg-secondary px-[20px] rounded-[10px] w-[350px]"
                            placeholder="Введите имя"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-small">Схема</span>
                        <input
                            onChange={(e) => handleChangePostgreForm(e.target.name, e.target.value)}
                            value={postgreForm.schema}
                            name="schema"
                            className="h-[53px] bg-secondary px-[20px] rounded-[10px] w-[350px]"
                            placeholder="Введите имя"
                        />
                    </div>
                </div>

                <div className="flex items-center ">

                    <button onClick={handleSave} className="text-default h-[53px] border-1 border-secondary  rounded-[10px]  cursor-pointer px-[20px] self-end">ДОБАВИТЬ</button>
                </div>

            </div>



        </div>
    )
}