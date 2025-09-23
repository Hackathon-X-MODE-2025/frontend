import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material"
import { useAppSelector } from "../../../app/hooks"
import { useEtlInitActions } from "../model/hooks"
import { useEffect, useState } from "react"
import type { SourceSetting } from "../model/slice"
import { useCreateSessionMutation } from "../../../entities/session/session-api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useLazyBrowseStoreQuery, type IBrowseStoreRes } from "../../../entities/hdfs/hdfs-api"
import { FileUploader } from "../../../features/file-uploader/ui"
import { UploadIco } from "../../../shared/svg_components/upload-ico"
import { CsvIco } from "../../../shared/svg_components/csv-ico"
import { FolderIco } from "../../../shared/svg_components/folder-ico"

export const EtlInit = () => {

    const [browseStoreTrigger] = useLazyBrowseStoreQuery()

    const navigate = useNavigate()

    const isEtlMode = useAppSelector((state) => state.modeSelectSlice.isEtlMode)
    const sourceSettings = useAppSelector((s) => s.etlInitSlice.sourceSettings);

    const { addItem, reset } = useEtlInitActions()

    const [type, setType] = useState<"CsvHDFSSourceSettings" | "JsonHDFSSourceSettings" | "XmlHDFSSourceSettings" | "PostgreSQLSourceSettings" | "ClickHouseSourceSettings" | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [param, setParam] = useState("");
    const [s3Data, setS3Data] = useState<IBrowseStoreRes[] | []>([])
    const [s3Path, setS3Path] = useState('/')
    const [isSuccess, setSuccess] = useState(false)

    const [clickhouseForm, setClickHouseForm] = useState({
        type: "ClickHouseSourceSettings",
        host: "clickhouse-headless",
        port: "8123",
        username: "default",
        password: "v68YeRr76E",
        database: "system"
    })

    const [postgreForm, setPostgreForm] = useState({
        type: "PostgreSQLSourceSettings",
        host: "postgresql",
        port: "5432",
        username: "postgres",
        password: "qPUlmoejb6",
        schema: "public",
        database: "etl-setup"
    })

    const handleToggleFile = (file: string) => {
        setSelectedFiles((prev) =>
            prev.includes(file) ? prev.filter((f) => f !== file) : [...prev, file]
        );
    };


    const handleChangeClickHouseForm = (name: string, value: string) => {
        setClickHouseForm({
            ...clickhouseForm,
            [name]: value
        })
    }

    const handleChangePostgreForm = (name: string, value: string) => {
        setPostgreForm({
            ...postgreForm,
            [name]: value
        })
    }

    useEffect(() => {
        if (!type) return
        browseStoreTrigger('/')
            .unwrap()
            .then((res) => {
                setS3Path('/')
                setS3Data(res)
                setSuccess(true)
            })
            .catch(() => {
                setSuccess(false)
                setType(null)
                toast.error('Системная ошибка')
            })
    }, [type])

    const handleSave = () => {
        if (!type) return;

        let payload: SourceSetting;

        if (type === "CsvHDFSSourceSettings") {
            payload = {
                type,
                delimiter: param || ",",
                paths: selectedFiles,
            };
        } else if (type === "XmlHDFSSourceSettings") {
            payload = {
                type,
                rootTag: param || "root",
                paths: selectedFiles,
            };
        } else if (type === 'PostgreSQLSourceSettings') {
            payload = {
                type,
                host: postgreForm.host,
                port: postgreForm.port,
                username: postgreForm.username,
                password: postgreForm.password,
                schema: postgreForm.schema,
                database: postgreForm.database
            };
        } else if (type === 'ClickHouseSourceSettings') {
            payload = {
                type,
                host: clickhouseForm.host,
                port: clickhouseForm.port,
                username: clickhouseForm.username,
                password: clickhouseForm.password,
                database: clickhouseForm.database
            };
        } else {
            payload = {
                type: 'JsonHDFSSourceSettings',
                paths: selectedFiles,
            };
        }

        addItem(payload)
        setType(null);
        setSelectedFiles([]);
        setParam("");
    };

    const [createSessionTrigger] = useCreateSessionMutation()

    const handleAnalyze = () => {
        createSessionTrigger({
            sourceSettings: sourceSettings
        })
            .unwrap()
            .then((res) => {
                reset()
                navigate(`/s/${res.id}`);
            })
            .catch(() => {
                toast.error('Ошибка')
            })
    };

    const handleChangeDir = (name: string) => {
        browseStoreTrigger(s3Path + name + '/')
            .unwrap()
            .then((res) => {
                setS3Path(s3Path + name + '/')
                setS3Data(res)
            })
            .catch(() => {
                toast.error('Системная ошибка')
            })
    }

    if (!isEtlMode) return null

    const isTable = type === 'CsvHDFSSourceSettings' || type === 'JsonHDFSSourceSettings' || type === 'XmlHDFSSourceSettings'

    return (
        <div className="flex gap-[30px] w-full h-full">
            <div className="w-7/12 bg-primary flex flex-col h-full">
                <span className="text-subtitle">Проводник</span>

                {/* // Загрузка файлов */}
                <div className="mt-[25px] flex items-center border-2 border-secondary rounded-[10px] p-[20px]">
                    <button className="flex items-center gap-[16px] bg-secondary py-[20px] px-[47px] rounded-[10px] cursor-pointer">
                        <UploadIco />
                        <span className="text-default">Загрузить файл</span>
                    </button>
                    <div className="ml-[30px]">
                        В разработке...
                    </div>
                </div>
                {/* // Таблица и табы */}
                <div className="w-full flex items-center gap-1 mt-[30px]">
                    <button
                        onClick={() => setType("CsvHDFSSourceSettings")}
                        className={`text-default ${type === 'CsvHDFSSourceSettings' ? 'bg-secondary' : 'bg-primary'} rounded-tr-[10px] rounded-tl-[10px] min-w-[88px] border-2 border-secondary cursor-pointer h-[42px]`}>
                        Csv
                    </button>
                    <button
                        onClick={() => setType("JsonHDFSSourceSettings")}
                        className={`text-default ${type === 'JsonHDFSSourceSettings' ? 'bg-secondary' : 'bg-primary'} px-[26px] rounded-tr-[10px] rounded-tl-[10px] min-w-[88px] border-2 border-secondary cursor-pointer h-[42px]`}>
                        Json
                    </button>
                    <button
                        onClick={() => setType("XmlHDFSSourceSettings")}
                        className={`text-default ${type === 'XmlHDFSSourceSettings' ? 'bg-secondary' : 'bg-primary'}  px-[26px] rounded-tr-[10px] rounded-tl-[10px] min-w-[88px] border-2 border-secondary cursor-pointer h-[42px]`}>
                        Xml
                    </button>
                    <button
                        onClick={() => setType("ClickHouseSourceSettings")}
                        className={`text-default ${type === 'ClickHouseSourceSettings' ? 'bg-secondary' : 'bg-primary'}  px-[26px] rounded-tr-[10px] rounded-tl-[10px] min-w-[88px] border-2 border-secondary cursor-pointer h-[42px]`}>
                        ClickHouse
                    </button>
                    <button
                        onClick={() => setType("PostgreSQLSourceSettings")}
                        className={`text-default ${type === 'PostgreSQLSourceSettings' ? 'bg-secondary' : 'bg-primary'} px-[26px] rounded-tr-[10px] rounded-tl-[10px] min-w-[88px] border-2 border-secondary cursor-pointer h-[42px]`}>
                        PostgreSQL
                    </button>
                </div>

                {
                    isTable && (

                        <div className="flex-1 overflow-y-auto border border-b-0 border-secondary">
                            <table className="min-w-full text-sm text-left ">
                                <thead className=" text-gray-300 uppercase text-xs font-semibold">
                                    <tr>
                                        <th className="px-4 py-3 w-10">
                                            <input type="checkbox" className="h-4 w-4 rounded border-gray-500 bg-gray-700" />
                                        </th>
                                        <th className="px-4 py-3">Имя</th>
                                        <th className="px-4 py-3">Размер</th>
                                        <th className="px-4 py-3">Дата загрузки</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {s3Data.map((file) => (
                                        <tr key={file.name} className="hover:bg-gray-800/50 transition">
                                            <td className="px-4 py-3">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded "
                                                    checked={selectedFiles.includes(s3Path + file.name)}
                                                    onChange={() => handleToggleFile(s3Path + file.name)}
                                                />
                                            </td>
                                            <td className="px-4 py-3 flex items-center gap-2">
                                                {
                                                    file.directory && (
                                                        <button onClick={() => handleChangeDir(file.name)} className="flex items-center gap-1 cursor-pointer">
                                                            <FolderIco />
                                                            {file.name}
                                                        </button>
                                                    )
                                                }
                                                {!file.directory && (<>
                                                    <CsvIco />
                                                    {file.name}
                                                </>)}

                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">{file.size}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">{file.lastModified}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                }

                {
                    !isTable && type === 'ClickHouseSourceSettings' && (
                        <div className="flex-1 overflow-y-auto border border-b-0 border-secondary flex items-center justify-center">

                            <div className="flex flex-col gap-[20px]">

                                <div className="flex items-center gap-[20px]">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-small">Host</span>
                                        <input
                                            onChange={(e) => handleChangeClickHouseForm(e.target.name, e.target.value)}
                                            value={clickhouseForm.host}
                                            name="host"
                                            className="h-[53px] bg-secondary px-[20px] rounded-[10px] w-[350px]"
                                            placeholder="Введите Host"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-small">Порт</span>
                                        <input
                                            onChange={(e) => handleChangeClickHouseForm(e.target.name, e.target.value)}
                                            value={clickhouseForm.port}
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
                                            onChange={(e) => handleChangeClickHouseForm(e.target.name, e.target.value)}
                                            value={clickhouseForm.username}
                                            name="username"
                                            className="h-[53px] bg-secondary px-[20px] rounded-[10px] w-[350px]"
                                            placeholder="Введите Логин"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-small">Пароль</span>
                                        <input
                                            onChange={(e) => handleChangeClickHouseForm(e.target.name, e.target.value)}
                                            value={clickhouseForm.password}
                                            name="password"
                                            className="h-[53px] bg-secondary px-[20px] rounded-[10px] w-[350px]"
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
                                            className="h-[53px] bg-secondary px-[20px] rounded-[10px] w-[350px]"
                                            placeholder="Введите имя"
                                        />
                                    </div>
                                    <button className="text-default h-[53px] border-1 border-secondary  rounded-[10px] ml-[20px] cursor-pointer px-[20px] self-end">ДОБАВИТЬ</button>
                                </div>

                            </div>



                        </div>
                    )
                }

                {
                    !isTable && type === 'PostgreSQLSourceSettings' && (
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

                                    <button className="text-default h-[53px] border-1 border-secondary  rounded-[10px]  cursor-pointer px-[20px] self-end">ДОБАВИТЬ</button>
                                </div>

                            </div>



                        </div>
                    )
                }

                <div className="w-full flex items-center p-[20px] border border-t-0 border-secondary rounded-[10px]">
                    {type === "CsvHDFSSourceSettings" && isSuccess && (
                        <input
                            value={param}
                            onChange={(e) => setParam(e.target.value)}
                            className="p-[20px] h-[53px] w-[40%] bg-secondary rounded-[10px] text-default"
                            placeholder="Введите разделитель..."
                        />
                    )}
                    {type === "XmlHDFSSourceSettings" && isSuccess && (
                        <input
                            value={param}
                            onChange={(e) => setParam(e.target.value)}
                            className="p-[20px] h-[53px] w-[40%] bg-secondary rounded-[10px] text-default"
                            placeholder="Введите тэг..."
                        />
                    )}
                    {
                        isTable && <button onClick={handleSave} className="text-default h-[53px] border-1 border-secondary  rounded-[10px] ml-[30px] cursor-pointer px-[20px]">ДОБАВИТЬ</button>
                    }



                </div>

            </div>
            <div className="w-5/12 h-full bg-secondary">

            </div>
        </div>
        // <Box className='flex gap-2 justify-center items-center w-full'>
        //     <Box className="flex flex-col gap-6 p-6 w-full ">
        //         {!type && (
        //             <Box className="flex gap-4 justify-center items-center w-full">
        //                 <Button variant="outlined" onClick={() => setType("CsvHDFSSourceSettings")}>CSV</Button>
        //                 <Button variant="outlined" onClick={() => setType("JsonHDFSSourceSettings")}>JSON</Button>
        //                 <Button variant="outlined" onClick={() => setType("XmlHDFSSourceSettings")}>XML</Button>
        //             </Box>
        //         )}
        //         <FileUploader />


        //         {sourceSettings.length > 0 && (
        //             <Button
        //                 variant="contained"
        //                 color="primary"
        //                 size="large"
        //                 onClick={handleAnalyze}
        //             >
        //                 Начать анализ
        //             </Button>
        //         )}


        //         {type && isSuccess && (
        //             <Box className="bg-[#181818] rounded-xl p-4 text-white   overflow-y-auto max-h-[40vh] ">
        //                 <h3 className="font-semibold mb-2">Выбери файлы</h3>
        //                 <Box className='flex flex-col scroll-auto'>

        //                     {s3Data.map((file) => (
        //                         <>
        //                             {
        //                                 file.directory
        //                                     ? <button onClick={() => handleChangeDir(file.name)}>{file.name}</button>
        //                                     : <FormControlLabel
        //                                         key={s3Path + file.name}
        //                                         control={
        //                                             <Checkbox
        //                                                 checked={selectedFiles.includes(s3Path + file.name)}
        //                                                 onChange={() => handleToggleFile(s3Path + file.name)}
        //                                             />
        //                                         }
        //                                         label={file.name}
        //                                     />
        //                             }

        //                         </>

        //                     ))}
        //                 </Box>

        //             </Box>
        //         )}

        //         {type === "CsvHDFSSourceSettings" && isSuccess && (
        //             <TextField
        //                 label="Delimiter"
        //                 value={param}
        //                 onChange={(e) => setParam(e.target.value)}
        //                 variant="outlined"
        //                 fullWidth
        //                 sx={{
        //                     "& .MuiOutlinedInput-root": {
        //                         bgcolor: "#1e293b",
        //                         borderRadius: "0.75rem",
        //                         color: "white",
        //                     },
        //                     "& .MuiInputLabel-root": { color: "#94a3b8" },
        //                 }}
        //             />
        //         )}
        //         {type === "XmlHDFSSourceSettings" && isSuccess && (
        //             <TextField
        //                 label="Root tag"
        //                 value={param}
        //                 onChange={(e) => setParam(e.target.value)}
        //                 variant="outlined"
        //                 fullWidth
        //                 sx={{
        //                     "& .MuiOutlinedInput-root": {
        //                         bgcolor: "#1e293b",
        //                         borderRadius: "0.75rem",
        //                         color: "white",
        //                     },
        //                     "& .MuiInputLabel-root": { color: "#94a3b8" },
        //                 }}
        //             />
        //         )}

        //         {/* Сохранить */}

        //         {
        //             type && isSuccess && <Button
        //                 variant="outlined"
        //                 color="inherit"
        //                 onClick={() => { setType(null); setSuccess(false) }}
        //             >
        //                 Назад
        //             </Button>
        //         }

        //         {type && isSuccess && (
        //             <Button
        //                 variant="contained"
        //                 color="success"
        //                 disabled={selectedFiles.length === 0}
        //                 onClick={handleSave}
        //             >
        //                 Сохранить
        //             </Button>
        //         )}
        //     </Box>
        // </Box>
    )
}


