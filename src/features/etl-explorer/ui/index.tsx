import type React from "react";
import { useLazyPreviewFileQuery, type IBrowseStoreRes } from "../../../entities/hdfs/hdfs-api"
import { FolderIco } from "../../../shared/svg_components/folder-ico"
import { icoHelper } from "../../../shared/utils/etl-setup"
import { formatDate, formatSize } from "../../../shared/utils/format";
import { soruceMap } from "../../../shared/constants/etl-setup";
import { Tooltip } from "react-tooltip";
import { IconButton } from "@mui/material";
import { EyeIco } from "../../../shared/svg_components/eye-ico";
import { useState } from "react";
import { toast } from "react-toastify";
import Papa from "papaparse";
import { XMLParser } from "fast-xml-parser";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CrossIco } from "../../../shared/svg_components/cross-ico";
import { motion, AnimatePresence } from "framer-motion";


interface IEtlExplorer {
    s3Data: [] | IBrowseStoreRes[],
    selectedFiles: any;
    handleToggleFile: (path: string) => void;
    handleChangeDir: (path: string, isBack?: boolean) => void;
    s3Path: string;
    type: string;
}

export const EtlExplorer: React.FC<IEtlExplorer> = ({ s3Data, selectedFiles, handleToggleFile, handleChangeDir, s3Path, type }) => {

    const [openModal, setOpen] = useState(false)
    const [modalData, setModalData] = useState<string>('')
    const [tag, setTag] = useState<any>(null)
    const [fileName, setFileName] = useState('')
    const [previewFileTrigger] = useLazyPreviewFileQuery()

    const handlePreview = (type: string, path: string, fileName: string) => {
        setOpen(true)
        previewFileTrigger(path)
            .unwrap()
            .then((res) => {
                setTag(type)
                setFileName(fileName)
                setModalData(res)
            })
            .catch(() => {
                setOpen(false)
                toast.error('Ошибка показа структуры')
            })
    }

    const handleClose = () => {
        setOpen(false)
        setTag(null)
        setFileName('')
        setModalData('')
    }

    return (
        <>
            <EtlFilePreview isOpen={openModal} onClose={handleClose} data={modalData} tag={tag} fileName={fileName} />
            <div className="flex-1 overflow-y-auto border border-b-0 border-secondary mt-2">

                <table className="min-w-full text-sm text-left ">
                    <thead className=" text-gray-300 uppercase text-xs font-semibold">
                        <tr>
                            <th className="px-4 py-3 w-10">
                                {/* <input type="checkbox" className="h-4 w-4 rounded border-gray-500 bg-gray-700" /> */}
                            </th>
                            <th className="px-4 py-3">Имя</th>
                            <th className="px-4 py-3">Размер</th>
                            <th className="px-4 py-3">Дата загрузки</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            s3Path !== '/' && (
                                <tr className="relative hover:bg-[#65658C1A] border-b border-[#65658C80]">
                                    <td className="px-4 py-3 ">

                                    </td>
                                    <td className="px-4 py-3 flex items-center gap-2 ">
                                        {
                                            <button onClick={() => handleChangeDir(s3Path, true)} className="flex items-center gap-1 cursor-pointer">
                                                <FolderIco />
                                                ..
                                            </button>
                                        }


                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        -
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        -
                                    </td>
                                </tr>
                            )
                        }
                        {s3Data.map((file) => {
                            const fullName: string = file.name;
                            const shortName = fullName.length > 10 ? fullName.slice(0, 10) + "…" : fullName;
                            const srcType = file.name?.split('.').slice(-1)[0]
                            const isCurrentType = !file.directory && file.name?.split('.').slice(-1)[0] !== soruceMap[type]
                            return (
                                <tr onClick={(e) => {
                                    e.stopPropagation()
                                    if ((e.target as HTMLElement).closest('input')) return;
                                    if (isCurrentType) return;
                                    if (!file.directory) {
                                        handleToggleFile(s3Path + file.name)
                                    }
                                }} key={file.name} className={`${isCurrentType && 'opacity-30'} ${isCurrentType ? '' : 'cursor-pointer'} relative hover:bg-[#65658C1A] border-b border-[#65658C80]`}>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center">
                                            {
                                                !file.directory && <input
                                                    type="checkbox"
                                                    disabled={file.name?.split('.').slice(-1)[0] !== soruceMap[type]}
                                                    className={`h-4 w-4 rounded ${isCurrentType ? '' : 'cursor-pointer'}`}
                                                    checked={selectedFiles.includes(s3Path + file.name)}
                                                    onChange={(e) => {
                                                        e.stopPropagation()
                                                        handleToggleFile(s3Path + file.name)
                                                    }}
                                                />
                                            }
                                            {
                                                !file.directory &&
                                                <>
                                                    <IconButton

                                                        data-tooltip-id="preview-tip"
                                                        data-tooltip-content="Посмотреть структуру"
                                                        disabled={file.name?.split('.').slice(-1)[0] !== soruceMap[type]}
                                                        sx={{ marginLeft: "10px" }}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handlePreview(srcType, s3Path + file.name, file.name)
                                                        }}
                                                    >
                                                        <EyeIco />
                                                    </IconButton>
                                                    {
                                                        !isCurrentType && <Tooltip id="preview-tip" place="top" />
                                                    }

                                                </>
                                            }
                                        </div>

                                    </td>
                                    <td className="px-4 py-3 flex items-center gap-2 ">
                                        {
                                            file.directory && (
                                                <button onClick={() => handleChangeDir(file.name)} className={`flex items-center gap-1 ${isCurrentType ? '' : 'cursor-pointer'}`}>
                                                    <FolderIco />
                                                    {file.name}
                                                </button>
                                            )
                                        }
                                        {!file.directory && (
                                            <>
                                                {icoHelper(fullName?.split(".")?.pop() as string)}

                                                <span
                                                    data-tooltip-id={`file-${fullName}`}
                                                    data-tooltip-content={fullName}
                                                    className={`${isCurrentType ? 'cursor-default' : 'cursor-pointer'}`}
                                                >
                                                    {shortName}
                                                </span>

                                                {
                                                    !isCurrentType && <Tooltip id={`file-${fullName}`} place="top" />
                                                }

                                            </>
                                        )}

                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        {
                                            file.directory && '-'
                                        }
                                        {
                                            !file.directory && formatSize(Number(file.size))
                                        }
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        {formatDate(file.lastModified)}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}


interface EtlFilePreviewProps {
    isOpen: boolean;
    onClose: () => void;
    data: string;
    tag: string;
    delimiter?: string;
    rootTag?: string;
    fileName: string
}

export const EtlFilePreview: React.FC<EtlFilePreviewProps> = ({
    isOpen,
    onClose,
    data,
    tag,
    delimiter,
    rootTag,
    fileName,
}) => {
    const lowerTag = tag?.toLowerCase();
    let parsed: any = null;
    let delimiterUsed = delimiter;
    let rootTagUsed = rootTag;

    try {
        switch (lowerTag) {
            case "json":
                parsed = JSON.parse(data);
                break;
            case "csv":
                const parsedCsv = Papa.parse(data, {
                    header: true,
                    skipEmptyLines: true,
                });
                parsed = parsedCsv.data;
                delimiterUsed = parsedCsv.meta.delimiter;
                break;
            case "xml":
                const parser = new XMLParser();
                parsed = parser.parse(data);
                rootTagUsed = Object.keys(parsed)?.[0];
                break;
            default:
                parsed = data;
        }
    } catch (err) {
        parsed =
            lowerTag === "json"
                ? data
                : {
                    error: "Ошибка парсинга файла",
                    message: (err as Error).message,
                };
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* фон */}
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                    />

                    {/* сама модалка */}
                    <motion.div
                        className="fixed top-1/2 left-1/2 z-50 w-[70%] h-[70%] -translate-x-1/2 -translate-y-1/2 bg-[#65658C] rounded-lg p-6 shadow-xl overflow-hidden flex flex-col"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 260, damping: 25 }}
                    >
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-lg font-mono text-white">
                                Предпросмотр файла ({fileName?.toUpperCase()})
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-white hover:text-gray-200 transition text-xl cursor-pointer p-2 
             transform hover:rotate-180 duration-300 ease-in-out"
                            >
                                <CrossIco />
                            </button>
                        </div>

                        {(delimiterUsed || rootTagUsed) && (
                            <div className="text-default text-white mb-3 space-y-1 font-mono">
                                {delimiterUsed && (
                                    <p>
                                        Разделитель: <b>{JSON.stringify(delimiterUsed)}</b>
                                    </p>
                                )}
                            </div>
                        )}

                        <motion.div
                            key={lowerTag}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className={`flex-1 rounded p-3 ${lowerTag === "csv" ? "overflow-auto" : "overflow-hidden"
                                }`}
                        >
                            {lowerTag === "csv" &&
                                Array.isArray(parsed) &&
                                parsed.length > 0 && (
                                    <table className="min-w-full text-text-small text-left font-font-sans text-white">
                                        <thead className="uppercase bg-[#65658C] text-gray-300 text-xs font-semibold sticky -top-4 z-10 border-t-2 border-black">
                                            <tr>
                                                {Object.keys(parsed[0]).map((header) => (
                                                    <th
                                                        key={header}
                                                        className="px-4 py-3 border border-black max-w-[250px] truncate font-raleway"
                                                    >
                                                        {header}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {parsed.map((row, i) => (
                                                <tr
                                                    key={i}
                                                    className="relative hover:bg-[#65658C1A] transition-colors duration-150 border border-black font-mono"
                                                >
                                                    {Object.values(row).map((val, j) => {
                                                        const text = String(val ?? "");
                                                        const displayText =
                                                            text.length > 70
                                                                ? text.slice(0, 70) + "…"
                                                                : text;

                                                        return (
                                                            <td
                                                                key={j}
                                                                data-tooltip-id={`cell-${i}-${j}`}
                                                                data-tooltip-content={text}
                                                                className="px-4 py-3 whitespace-pre-wrap align-top text-text-small border border-black max-w-[250px] overflow-hidden text-ellipsis"
                                                            >
                                                                {displayText}
                                                                <Tooltip
                                                                    id={`cell-${i}-${j}`}
                                                                    place="top"
                                                                    className="!bg-gray-800 !text-white !text-sm !rounded-lg !px-3 !py-1 z-40"
                                                                />
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}

                            {["json", "xml"].includes(lowerTag || "") && (
                                <SyntaxHighlighter
                                    wrapLongLines
                                    customStyle={{
                                        backgroundColor: "#1b1920",
                                        fontSize: "12px",
                                        fontFamily: "sans-serif",
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word",
                                        maxHeight: "100%",
                                        overflowY: "auto",
                                        borderRadius: "10px",
                                        margin: 0,
                                        padding: "8px 10px",
                                    }}
                                    codeTagProps={{
                                        style: {
                                            color: "white",
                                            textShadow: "none",
                                        },
                                    }}
                                >
                                    {data}
                                </SyntaxHighlighter>
                            )}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
