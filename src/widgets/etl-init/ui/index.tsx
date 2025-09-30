import { useAppSelector } from "../../../app/hooks"
import { useEtlInitActions } from "../model/hooks"
import { useEffect, useState } from "react"
import type { SourceSetting, SourceSettingReq } from "../model/slice"
import { useCreateSessionMutation } from "../../../entities/session/session-api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useLazyBrowseStoreQuery, type IBrowseStoreRes } from "../../../entities/hdfs/hdfs-api"
import { FileUploader } from "../../../features/file-uploader/ui"
import { v4 as uuidv4 } from "uuid";
import { EtlTabs } from "../../../features/etl-tabs/ui"
import type { IEtlType } from "../model/types"
import { EtlExplorer } from "../../../features/etl-explorer/ui"
import { EtlPostgreSourceForm } from "../../../features/etl-postgre-source-form/ui"
import { EtlClickHouseSourceForm } from "../../../features/etl-clickhouse-source-form/ui"
import { EtlParamForm } from "../../../features/etl-param-form/ui"
import { soruceMap } from "../../../shared/constants/etl-setup"
import { EtlSourcestable } from "../../../features/etl-sources-table/ui"
import { getParentPath } from "../../../shared/utils/etl-setup"
import { EtlSetupContinue } from "../../../features/etl-setup-continue/ui"
import { PreAnalyzeModal } from "../../../features/etl-preanalyze-modal/ui"

export const EtlInit = () => {

    const [browseStoreTrigger] = useLazyBrowseStoreQuery()

    const navigate = useNavigate()

    const isEtlMode = useAppSelector((state) => state.modeSelectSlice.isEtlMode)
    const sourceSettings = useAppSelector((s) => s.etlInitSlice.sourceSettings);

    const { addItem, reset, remove } = useEtlInitActions()

    const [type, setType] = useState<IEtlType | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

    const [param, setParam] = useState("");

    const [s3Data, setS3Data] = useState<IBrowseStoreRes[] | []>([])
    const [s3Path, setS3Path] = useState('/')

    const [isSuccess, setSuccess] = useState(false)
    const [validateionError, setValidationError] = useState(false)

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

    const [preanalyzeForm, setPreAnalazyForm] = useState({
        expectedSizeInGB: null,
        updateRate: '',
        schedulerRate: '',
    })

    const [isPreAnalyzeModal, setPreAnalyzeModal] = useState(false)

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

    const handleChangePreAnalyzeForm = (name: string, value: string) => {
        setPreAnalazyForm({
            ...preanalyzeForm,
            [name]: value
        })
    }

    useEffect(() => {
        if (!type) return
        browseStoreTrigger('/')
            .unwrap()
            .then((res) => {
                setS3Path('/')
                const filtrationData = res.filter((el) => {
                    return el.directory || soruceMap[type] === el.name?.split('.').slice(-1)[0]
                })
                setS3Data(filtrationData)
                setSuccess(true)
            })
            .catch(() => {
                setSuccess(false)
                setType(null)
                toast.error('Системная ошибка')
            })
    }, [type])

    const handleRefetch = () => {
        browseStoreTrigger(s3Path)
            .unwrap()
            .then((res) => {
                if (type === null) return
                const filtrationData = res.filter((el) => {
                    return el.directory || soruceMap[type] === el.name?.split('.').slice(-1)[0]
                })
                setS3Data(filtrationData)
            })
            .catch(() => {
                toast.error('Системная ошибка')
            })
    }


    useEffect(() => {
        setType('CsvHDFSSourceSettings')
    }, [])


    const handleSave = () => {
        // if (sourceSettings.length > 0) {
        //     toast.warning('Можно выбрать только 1 источник')
        //     return
        // }
        if (!type) return;
        if ((type === "CsvHDFSSourceSettings" || type === "XmlHDFSSourceSettings") && !param) {
            setValidationError(true);
            return;
        }

        const selectedFilesLentghPass = selectedFiles.length > 0

        let payload: SourceSetting | null;

        const id = uuidv4();

        if (type === "CsvHDFSSourceSettings" && selectedFilesLentghPass) {
            payload = {
                type,
                delimiter: param,
                paths: selectedFiles,
                id: id
            };
        } else if (type === "XmlHDFSSourceSettings" && selectedFilesLentghPass) {
            payload = {
                type,
                rootTag: param,
                paths: selectedFiles,
                id: id
            };
        } else if (type === 'PostgreSQLSourceSettings') {
            payload = {
                type,
                host: postgreForm.host,
                port: postgreForm.port,
                username: postgreForm.username,
                password: postgreForm.password,
                schema: postgreForm.schema,
                database: postgreForm.database,
                id: id
            };
        } else if (type === 'ClickHouseSourceSettings') {
            payload = {
                type,
                host: clickhouseForm.host,
                port: clickhouseForm.port,
                username: clickhouseForm.username,
                password: clickhouseForm.password,
                database: clickhouseForm.database,
                id: id
            };
        } else if (type === 'JsonHDFSSourceSettings' && selectedFilesLentghPass) {
            payload = {
                type: 'JsonHDFSSourceSettings',
                paths: selectedFiles,
                id: id
            };
        } else {
            payload = null
        }


        if (payload === null) return

        addItem(payload)
        setSelectedFiles([]);
        setParam("");
    };

    const [createSessionTrigger] = useCreateSessionMutation()

    const handleAnalyze = () => {

        const resultSources: SourceSettingReq[] = sourceSettings.map((el) => {
            const { id, ...rest } = el
            return {
                ...rest
            }
        })
        createSessionTrigger({
            sourceSettings: resultSources,
            expectedSizeInGB: Number(preanalyzeForm.expectedSizeInGB),
            updateRate: preanalyzeForm.updateRate,
            schedulerRate: preanalyzeForm.schedulerRate
        })
            .unwrap()
            .then((res) => {
                setPreAnalyzeModal(false)
                setPreAnalazyForm({
                    expectedSizeInGB: null,
                    updateRate: '',
                    schedulerRate: '',
                })
                reset()
                navigate(`/s/${res.id}`);
            })
            .catch(() => {
                toast.error('Ошибка')
            })
    };

    const handleChangeDir = (name: string, isBack?: boolean) => {
        if (isBack) {
            browseStoreTrigger(getParentPath(s3Path))
                .unwrap()
                .then((res) => {
                    if (type === null) return
                    setS3Path(getParentPath(s3Path))
                    const filtrationData = res.filter((el) => {
                        return el.directory || soruceMap[type] === el.name?.split('.').slice(-1)[0]
                    })
                    setS3Data(filtrationData)
                })
                .catch(() => {
                    toast.error('Системная ошибка')
                })
            return
        }
        browseStoreTrigger(s3Path + name + '/')
            .unwrap()
            .then((res) => {
                if (type === null) return
                setS3Path(s3Path + name + '/')
                const filtrationData = res.filter((el) => {
                    return el.directory || soruceMap[type] === el.name?.split('.').slice(-1)[0]
                })
                setS3Data(filtrationData)
            })
            .catch(() => {
                toast.error('Системная ошибка')
            })
    }

    const handleEtlType = (name: IEtlType) => {
        setType(name)
    }

    const handleParam = (param: string) => {
        setParam(param)
    }

    const handleContinue = () => {
        setPreAnalyzeModal(true)
    }

    const handleClosePreanalyzed = () => {
        setPreAnalyzeModal(false)
    }



    if (!isEtlMode) return null

    const isTable = type === 'CsvHDFSSourceSettings' || type === 'JsonHDFSSourceSettings' || type === 'XmlHDFSSourceSettings'

    return (
        <div className="flex gap-[30px] w-full h-full">
            <div className="w-7/12 bg-primary flex flex-col h-full">
                <span className="text-subtitle">Проводник</span>

                {/*  Загрузка файлов */}
                <FileUploader s3Path={s3Path} handleRefetch={handleRefetch} />

                {/*  Таблица и табы */}
                <EtlTabs type={type} handleType={handleEtlType} />


                {/* Проводник */}
                {
                    isTable && (
                        <EtlExplorer
                            handleToggleFile={handleToggleFile}
                            handleChangeDir={handleChangeDir}
                            selectedFiles={selectedFiles}
                            s3Path={s3Path}
                            s3Data={s3Data}

                        />
                    )
                }

                {/* Кликхаус */}
                {
                    !isTable && type === 'ClickHouseSourceSettings' && (
                        <EtlClickHouseSourceForm handleChangeClickHouseForm={handleChangeClickHouseForm} clickhouseForm={clickhouseForm} handleSave={handleSave} />
                    )
                }

                {/* Постгре */}
                {
                    !isTable && type === 'PostgreSQLSourceSettings' && (
                        <EtlPostgreSourceForm handleChangePostgreForm={handleChangePostgreForm} postgreForm={postgreForm} handleSave={handleSave} />
                    )
                }

                {/* Параметр */}
                <EtlParamForm
                    param={param}
                    handleParam={handleParam}
                    handleSave={handleSave}
                    isSuccess={isSuccess}
                    isTable={isTable}
                    type={type}
                    validateionError={validateionError}
                />

            </div>

            <div className="w-5/12 h-full flex flex-col ">
                <span className="text-subtitle">Источники</span>
                {/* Таблица источников */}
                <EtlSourcestable remove={remove} sourceSettings={sourceSettings} />

                {/* Продолжить */}
                <EtlSetupContinue handleContinue={handleContinue} />
                {/* Анализ */}
                {/* {sourceSettings.length > 0 && (
                    <EtlSetupAnalyze handleAnalyze={handleAnalyze} />
                )} */}
            </div>

            <PreAnalyzeModal
                open={isPreAnalyzeModal}
                handleClose={handleClosePreanalyzed}
                handleChangePreAnalyzeForm={handleChangePreAnalyzeForm}
                formValue={preanalyzeForm}
                complete={handleAnalyze}
            />

        </div>
    )
}