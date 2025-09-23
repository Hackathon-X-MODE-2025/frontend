import type React from "react";
import type { IBrowseStoreRes } from "../../../entities/hdfs/hdfs-api"
import { FolderIco } from "../../../shared/svg_components/folder-ico"
import { icoHelper } from "../../../shared/utils/etl-setup"
import { formatDate, formatSize } from "../../../shared/utils/format";

interface IEtlExplorer {
    s3Data: [] | IBrowseStoreRes[],
    selectedFiles: any;
    handleToggleFile: (path: string) => void;
    handleChangeDir: (path: string, isBack?: boolean) => void;
    s3Path: string;
}

export const EtlExplorer: React.FC<IEtlExplorer> = ({ s3Data, selectedFiles, handleToggleFile, handleChangeDir, s3Path }) => {
    return (
        <div className="flex-1 overflow-y-auto border border-b-0 border-secondary">

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
                    {s3Data.map((file) => (
                        <tr key={file.name} className="relative hover:bg-[#65658C1A] border-b border-[#65658C80]">
                            <td className="px-4 py-3 ">
                                {
                                    !file.directory && <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded "
                                        checked={selectedFiles.includes(s3Path + file.name)}
                                        onChange={() => handleToggleFile(s3Path + file.name)}
                                    />
                                }
                            </td>
                            <td className="px-4 py-3 flex items-center gap-2 ">
                                {
                                    file.directory && (
                                        <button onClick={() => handleChangeDir(file.name)} className="flex items-center gap-1 cursor-pointer">
                                            <FolderIco />
                                            {file.name}
                                        </button>
                                    )
                                }
                                {!file.directory && (<>
                                    {
                                        icoHelper(file.name?.split('.').slice(-1)[0])
                                    }
                                    {file.name}
                                </>)}

                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                                {formatSize(Number(file.size))}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                                {formatDate(file.lastModified)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}