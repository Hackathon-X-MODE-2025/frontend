import type React from "react";
import { sourceGroupMap } from "../../../shared/constants/etl-setup";
import { CrossIco } from "../../../shared/svg_components/cross-ico";
import { icoHelper } from "../../../shared/utils/etl-setup";
import type { SourceSetting } from "../../../widgets/etl-init/model/slice";

interface IEtlSourcestable {
    sourceSettings: SourceSetting[] | [];
    remove: (id: string) => void;
}

export const EtlSourcestable: React.FC<IEtlSourcestable> = ({ sourceSettings, remove }) => {
    return (
        <div className="flex-1 bg-secondary rounded-tr-[10px] rounded-tl-[10px] mt-[25px] p-[20px] relative">
            <table className="min-w-full text-sm text-left border-collapse">
                <thead className="  uppercase text-xs font-semibold border-b border-gray-700">
                    <tr>
                        <th className="px-6 py-3">Имя</th>
                        <th className="px-6 py-3">Параметр</th>
                        <th className="px-6 py-3 w-10"></th>
                    </tr>
                </thead>
                <tbody>
                    {sourceSettings.map((row) => (
                        <tr
                            key={row.id}
                            className="border-b border-gray-800 hover:bg-gray-800/40 transition"
                        >
                            <td className="px-6 py-4 flex items-center gap-2 font-medium text-white">
                                {icoHelper(row.type)}
                                {sourceGroupMap[row.type]}
                            </td>
                            <td className="px-6 py-4 text-gray-200">
                                {(() => {
                                    switch (row.type) {
                                        case "CsvHDFSSourceSettings":
                                            return row.delimiter;
                                        case "XmlHDFSSourceSettings":
                                            return row.rootTag;
                                        case "JsonHDFSSourceSettings":
                                            return row.field ?? "-";
                                        case "ClickHouseSourceSettings":
                                            return row.host;
                                        case "PostgreSQLSourceSettings":
                                            return row.host;
                                        default:
                                            return "-";
                                    }
                                })()}
                            </td>
                            <td className="px-6 py-4 ">
                                <button onClick={() => remove(row.id)} className="cursor-pointer">
                                    <CrossIco />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}