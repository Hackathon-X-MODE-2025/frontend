import { CassandraIco } from "../../../shared/svg_components/cassandra-ico";
import { ClickhouseDbIco } from "../../../shared/svg_components/clickhouse-db-ico";
import { ElasticsearchIco } from "../../../shared/svg_components/elasticsearch-ico";
import { HadoopIco } from "../../../shared/svg_components/hadoop-ico";
import { MongoIco } from "../../../shared/svg_components/mongo-ico";
import { PostgreSQLIco } from "../../../shared/svg_components/postgeSQL-ico";
import { ScyllaIco } from "../../../shared/svg_components/scylla-ico";
import { TimescaleIco } from "../../../shared/svg_components/timescale-ico";

export const RECOMENDATION_COLOR_TEMPERATURE: any = {
  0: '#44A37A',
  1: '#E4BB48',
  2: '#F98136',
  3: '#C33434'
}

export const STATIC_DB_ARRAY = [
  {
    dataSource: "HDFS",
    reason: "Нет рекомендаций",
    suitabilityScore: 0,
    icon: <HadoopIco />,
    disabled: false
  },
  {
    dataSource: "CLICK_HOUSE",
    reason: "Нет рекомендаций",
    suitabilityScore: 0,
    icon: <ClickhouseDbIco />,
    disabled: false
  },
  {
    dataSource: "POSTGRES",
    reason: "Нет рекомендаций",
    suitabilityScore: 0,
    icon: <PostgreSQLIco />,
    disabled: false
  },
  {
    dataSource: "MONGO_DB",
    reason: "Нет рекомендаций",
    suitabilityScore: 0,
    icon: <MongoIco />,
    disabled: true
  },
  {
    dataSource: "CASSANDRA",
    reason: "Нет рекомендаций",
    suitabilityScore: 0,
    icon: <CassandraIco />,
    disabled: true
  },
  {
    dataSource: "ELASTICSEARCH",
    reason: "Нет рекомендаций",
    suitabilityScore: 0,
    icon: <ElasticsearchIco />,
    disabled: true
  },
  {
    dataSource: "TIMESCALE_DB",
    reason: "Нет рекомендаций",
    suitabilityScore: 0,
    icon: <TimescaleIco />,
    disabled: true
  },
  {
    dataSource: "SCYLLA_DB",
    reason: "Нет рекомендаций",
    suitabilityScore: 0,
    icon: <ScyllaIco />,
    disabled: true
  },
];
