import { ClickhouseIco } from "../svg_components/clickhouse-ico"
import { CsvGroupIco } from "../svg_components/csv-group-ico"
import { CsvIco } from "../svg_components/csv-ico"
import { JsonGroupIco } from "../svg_components/json-group-ico"
import { JsonIco } from "../svg_components/json-ico"
import { PostgreIco } from "../svg_components/postgre-ico"
import { XmlGropIco } from "../svg_components/xml-group-ico"
import { XmlIco } from "../svg_components/xml-ico"

export const icoHelper = (type: string) => {
    if (type === 'json') {
        return <JsonIco />
    }
    if (type === 'xml') {
        return <XmlIco />
    }
    if (type === 'csv') {
        return <CsvIco />
    }
    if (type === 'CsvHDFSSourceSettings') {
        return <CsvGroupIco />
    }
    if (type === 'XmlHDFSSourceSettings') {
        return <XmlGropIco />
    }
    if (type === 'JsonHDFSSourceSettings') {
        return <JsonGroupIco />
    }
    if (type === 'PostgreSQLSourceSettings') {
        return <PostgreIco />
    }
    if (type === 'ClickHouseSourceSettings') {
        return <ClickhouseIco />
    }
}

export function getParentPath(path: string) {
    // убираем последний `/`
    const trimmed = path.endsWith('/') ? path.slice(0, -1) : path;

    // разбиваем по `/`, убираем последний элемент и собираем обратно
    const parts = trimmed.split('/');
    parts.pop();

    // собираем обратно с `/` и гарантируем слэш в конце
    return parts.join('/') + '/';
}
