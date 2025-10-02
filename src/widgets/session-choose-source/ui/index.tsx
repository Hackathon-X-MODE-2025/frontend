import { useNavigate, useParams } from "react-router-dom";
import { useChooseDataBaseMutation, useGetSessionQuery } from "../../../entities/session/session-api";
import { clickhouseSourceForm, clickhouseSourceSchema, hdfsSourceForm, hdfsSourceSchema, postgreSourceForm, postgreSourceSchema, RECOMENDATION_COLOR_TEMPERATURE, STATIC_DB_ARRAY } from "../model/constants";
import { SessionSourceItem } from "../../../features/session-source-item/ui";
import { useEffect, useState } from "react";
import { SessionSourceItemParamsForm } from "../../../features/session-source-item-params-form/ui";
import { toast } from "react-toastify";


export const SessionsChooseSource = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { data: sessionData, isSuccess, isFetching } = useGetSessionQuery(id, {
        pollingInterval: 1000,
        refetchOnMountOrArgChange: true,
    });

    const [chooseTrigger] = useChooseDataBaseMutation()

    const [sortedData, setSortedData] = useState<any[]>([])
    const [choosedSource, setChoosedSource] = useState<string | null>(null)

    const [clickHouseModal, setClickHouseModal] = useState(false)
    const [postgreModal, setPostgreModal] = useState(false)
    const [hdfsModal, setHdfsModal] = useState(false)

    useEffect(() => {
        if (!isSuccess) return
        if (sessionData.status !== 'USER_CHOOSE_DATABASE') return

        const tmp = STATIC_DB_ARRAY.map((el) => {
            const target = sessionData.dataBasePrediction.recommendations.find((item: any) => item.dataSource === el.dataSource)

            if (target) {
                return {
                    ...el,
                    reason: target.reason,
                    cons: target?.cons,
                    pros: target?.pros,
                    suitabilityScore: target.suitabilityScore
                }
            }
            return {
                ...el,
            }
        })
            .sort((a, b) => b.suitabilityScore - a.suitabilityScore)
            .map((item, index) => {

                if (item.suitabilityScore === 0) {
                    return {
                        ...item,
                        background: '#343447'
                    }
                }

                if (index > 3) {
                    return {
                        ...item,
                        background: RECOMENDATION_COLOR_TEMPERATURE[3]
                    }
                }

                return {
                    ...item,
                    background: RECOMENDATION_COLOR_TEMPERATURE[index]
                }
            })

        setSortedData(tmp)

    }, [isFetching])

    const handleChooseSource = (name: string) => {
        setChoosedSource(name)
        if (name === 'POSTGRES') {
            setPostgreModal(true)
        }

        if (name === 'HDFS') {
            setHdfsModal(true)
        }

        if (name === 'CLICK_HOUSE') {
            setClickHouseModal(true)
        }
    }

    const handleChooseRecomendation = (result: any) => {
        chooseTrigger({ id: id, body: { dataSourceSettings: result } })
            .unwrap()
            .then(() => {
                if (result.type === 'POSTGRES') {
                    setPostgreModal(false)
                }

                if (result.type === 'HDFS') {
                    setHdfsModal(false)
                }

                if (result.type === 'CLICK_HOUSE') {
                    setClickHouseModal(false)
                }
                setChoosedSource(null)
                navigate(`/s/${id}/c`)
            })
            .catch(() => toast.error('Ошибка сервера'))
    }

    const handleCloseClickHouseModal = () => {
        setClickHouseModal(false)
    }

    const handleClosePostgreModal = () => {
        setPostgreModal(false)
    }

    const handleCloseHdfsModal = () => {
        setHdfsModal(false)
    }

    if (!isSuccess) return
    if (sessionData.status !== 'USER_CHOOSE_DATABASE') return
    if (sortedData.length === 0) return

    const half = Math.ceil(sortedData.length / 2);
    const left = sortedData.slice(0, half);
    const right = sortedData.slice(half);

    return (
        <div className="py-[80px] 2xl:py-[115px] px-[94px]">
            <span>Рекомендации</span>
            <div className=" mt-[25px] grid grid-cols-2 gap-x-[30px] ">
                {/* Левая колонка */}
                <div className="flex flex-col gap-y-[20px]">
                    {left.map((el, i) => (
                        <SessionSourceItem
                            key={el.dataSource}
                            pros={el.pros}
                            cons={el.cons}
                            title={`${el.dataSource}`}
                            background={el.background}
                            isDisabled={el.disabled}
                            icon={el.icon}
                            content={el.reason}
                            confirm={handleChooseSource}
                            index={i + 1}
                        />
                    ))}
                </div>

                {/* Правая колонка */}
                <div className="flex flex-col gap-y-[20px]">
                    {right.map((el, i) => (
                        <SessionSourceItem
                            key={el.dataSource}
                            pros={el.pros}
                            cons={el.cons}
                            title={`${el.dataSource}`}
                            background={el.background}
                            isDisabled={el.disabled}
                            icon={el.icon}
                            content={el.reason}
                            confirm={handleChooseSource}
                            index={i + 1 + half}
                        />
                    ))}
                </div>
            </div>

            <SessionSourceItemParamsForm
                formName={choosedSource as string}
                title="CLICK_HOUSE"
                open={clickHouseModal}
                handleClose={handleCloseClickHouseModal}
                formSchema={clickhouseSourceSchema}
                formValues={clickhouseSourceForm}
                complete={handleChooseRecomendation}
            />

            <SessionSourceItemParamsForm
                formName={choosedSource as string}
                title="POSTGRES"
                open={postgreModal}
                handleClose={handleClosePostgreModal}
                formSchema={postgreSourceSchema}
                formValues={postgreSourceForm}
                complete={handleChooseRecomendation}
            />

            <SessionSourceItemParamsForm
                formName={choosedSource as string}
                title="HDFS"
                open={hdfsModal}
                handleClose={handleCloseHdfsModal}
                formSchema={hdfsSourceSchema}
                formValues={hdfsSourceForm}
                complete={handleChooseRecomendation}
            />

        </div>
    )
}