import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material"
import { useAppSelector } from "../../../app/hooks"
import { useEtlInitActions } from "../model/hooks"
import { useEffect, useState } from "react"
import type { SourceSetting } from "../model/slice"
import { useCreateSessionMutation } from "../../../entities/session/session-api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useLazyBrowseStoreQuery } from "../../../entities/hdfs/hdfs-api"


const mockJsonFiles = [
    "part2.json",
    "part19.json",
    "part20.json",
];

const typePathMap: any = {
    CsvHDFSSourceSettings: '/dataset/csv/',
    JsonHDFSSourceSettings: '/dataset/json/',
    XmlHDFSSourceSettings: '/dataset/xml/'
}

export const EtlInit = () => {

    const [browseStoreTrigger] = useLazyBrowseStoreQuery()

    const navigate = useNavigate()

    const isEtlMode = useAppSelector((state) => state.modeSelectSlice.isEtlMode)
    const sourceSettings = useAppSelector((s) => s.etlInitSlice.sourceSettings);

    const { addItem, reset } = useEtlInitActions()

    const [type, setType] = useState<"CsvHDFSSourceSettings" | "JsonHDFSSourceSettings" | "XmlHDFSSourceSettings" | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [param, setParam] = useState("");
    const [s3Data, setS3Data] = useState<any[]>([])
    const [s3Path, setS3Path] = useState('/')
    const [isSuccess, setSuccess] = useState(false)


    const handleToggleFile = (file: string) => {
        setSelectedFiles((prev) =>
            prev.includes(file) ? prev.filter((f) => f !== file) : [...prev, file]
        );
    };

    useEffect(() => {
        if (!type) return
        browseStoreTrigger(typePathMap[type])
            .unwrap()
            .then((res) => {
                setS3Path(typePathMap[type])
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
        if (!type || selectedFiles.length === 0) return;

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

    return (
        <Box className='flex gap-2 justify-center items-center w-full'>
            <Box className="flex flex-col gap-6 p-6 w-full ">
                {!type && (
                    <Box className="flex gap-4 justify-center items-center w-full">
                        <Button variant="outlined" onClick={() => setType("CsvHDFSSourceSettings")}>CSV</Button>
                        <Button variant="outlined" onClick={() => setType("JsonHDFSSourceSettings")}>JSON</Button>
                        <Button variant="outlined" onClick={() => setType("XmlHDFSSourceSettings")}>XML</Button>
                    </Box>
                )}


                {sourceSettings.length > 0 && (
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleAnalyze}
                    >
                        Начать анализ
                    </Button>
                )}


                {type && isSuccess && (
                    <Box className="bg-[#181818] rounded-xl p-4 text-white   overflow-y-auto max-h-[40vh] ">
                        <h3 className="font-semibold mb-2">Выбери файлы</h3>
                        <Box className='flex flex-col scroll-auto'>

                            {s3Data.map((file) => (
                                <>
                                    {
                                        file.directory
                                            ? <button onClick={() => handleChangeDir(file.name)}>{file.name}</button>
                                            : <FormControlLabel
                                                key={s3Path + file.name}
                                                control={
                                                    <Checkbox
                                                        checked={selectedFiles.includes(s3Path + file.name)}
                                                        onChange={() => handleToggleFile(s3Path + file.name)}
                                                    />
                                                }
                                                label={file.name}
                                            />
                                    }

                                </>

                            ))}
                        </Box>

                    </Box>
                )}

                {type === "CsvHDFSSourceSettings" && isSuccess && (
                    <TextField
                        label="Delimiter"
                        value={param}
                        onChange={(e) => setParam(e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                bgcolor: "#1e293b",
                                borderRadius: "0.75rem",
                                color: "white",
                            },
                            "& .MuiInputLabel-root": { color: "#94a3b8" },
                        }}
                    />
                )}
                {type === "XmlHDFSSourceSettings" && isSuccess && (
                    <TextField
                        label="Root tag"
                        value={param}
                        onChange={(e) => setParam(e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                bgcolor: "#1e293b",
                                borderRadius: "0.75rem",
                                color: "white",
                            },
                            "& .MuiInputLabel-root": { color: "#94a3b8" },
                        }}
                    />
                )}

                {/* Сохранить */}

                {
                    type && isSuccess && <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => { setType(null); setSuccess(false) }}
                    >
                        Назад
                    </Button>
                }

                {type && isSuccess && (
                    <Button
                        variant="contained"
                        color="success"
                        disabled={selectedFiles.length === 0}
                        onClick={handleSave}
                    >
                        Сохранить
                    </Button>
                )}
            </Box>
        </Box>
    )
}
