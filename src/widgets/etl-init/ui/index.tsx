import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material"
import { useAppSelector } from "../../../app/hooks"
import { useEtlInitActions } from "../model/hooks"
import { useState } from "react"
import type { SourceSetting } from "../model/slice"
import { useCreateSessionMutation } from "../../../entities/session/session-api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"


const mockJsonFiles = [
    "part2.json",
    "part19.json",
    "part20.json",
];

export const EtlInit = () => {

    const navigate = useNavigate()

    const isEtlMode = useAppSelector((state) => state.modeSelectSlice.isEtlMode)
    const sourceSettings = useAppSelector((s) => s.etlInitSlice.sourceSettings);

    const { addItem, reset } = useEtlInitActions()

    const [type, setType] = useState<"CsvSourceSettings" | "JsonSourceSettings" | "XmlSourceSettings" | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [param, setParam] = useState("");

    const handleToggleFile = (file: string) => {
        setSelectedFiles((prev) =>
            prev.includes(file) ? prev.filter((f) => f !== file) : [...prev, file]
        );
    };

    const handleSave = () => {
        if (!type || selectedFiles.length === 0) return;

        let payload: SourceSetting;

        if (type === "CsvSourceSettings") {
            payload = {
                type,
                delimiter: param || ",",
                s3Paths: selectedFiles,
            };
        } else if (type === "XmlSourceSettings") {
            payload = {
                type,
                rootTag: param || "root",
                s3Paths: selectedFiles,
            };
        } else {
            payload = {
                type: 'JsonSourceSettings',
                s3Paths: selectedFiles,
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

    if (!isEtlMode) return null

    return (
        <Box className='flex gap-2 justify-center items-center w-full'>
            <Box className="flex flex-col gap-6 p-6 w-full">
                {!type && (
                    <Box className="flex gap-4 justify-center items-center w-full">
                        <Button variant="outlined" onClick={() => setType("CsvSourceSettings")}>CSV</Button>
                        <Button variant="outlined" onClick={() => setType("JsonSourceSettings")}>JSON</Button>
                        <Button variant="outlined" onClick={() => setType("XmlSourceSettings")}>XML</Button>
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


                {type && (
                    <Box className="bg-[#181818] rounded-xl p-4 text-white">
                        <h3 className="font-semibold mb-2">Выбери файлы ({type.toUpperCase()})</h3>
                        <Box className='flex flex-col max-h-[60%] scroll-auto overflow-y-auto'>

                            {mockJsonFiles.map((file) => (
                                <FormControlLabel
                                    key={file}
                                    control={
                                        <Checkbox
                                            checked={selectedFiles.includes(file)}
                                            onChange={() => handleToggleFile(file)}
                                        />
                                    }
                                    label={file}
                                />
                            ))}
                        </Box>

                    </Box>
                )}

                {type === "CsvSourceSettings" && (
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
                {type === "XmlSourceSettings" && (
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
                    type && <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => setType(null)}
                    >
                        Назад
                    </Button>
                }

                {type && (
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