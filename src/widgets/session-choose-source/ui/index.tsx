import { useParams } from "react-router-dom";
import { useChooseDataBaseMutation, useGetSessionQuery } from "../../../entities/session/session-api";
import { RECOMENDATION_COLOR_TEMPERATURE, STATIC_DB_ARRAY } from "../model/constants";
import { SessionSourceItem } from "../../../features/session-source-item/ui";
import { useEffect, useState } from "react";


export const SessionsChooseSource = () => {
    const { id } = useParams()

    const { data: sessionData, isSuccess, isLoading } = useGetSessionQuery(id, {
        pollingInterval: 1000,
        refetchOnMountOrArgChange: true,
    });

    const [chooseTrigger] = useChooseDataBaseMutation()

    const [sortedData, setSortedData] = useState<any[]>([])

    useEffect(() => {
        if (!isSuccess) return
        if (sessionData.status !== 'USER_CHOOSE_DATABASE') return

        const tmp = STATIC_DB_ARRAY.map((el) => {
            const target = sessionData.dataBasePrediction.recommendations.find((item: any) => item.dataSource === el.dataSource)

            if (target) {
                return {
                    ...el,
                    reason: target.reason,
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

    }, [isLoading])


    const handleChooseRecomendation = (name: string) => {
        chooseTrigger({ id: id, body: { dataSource: name } })
    }

    if (!isSuccess) return
    if (sessionData.status !== 'USER_CHOOSE_DATABASE') return
    if (sortedData.length === 0) return

    const half = Math.ceil(sortedData.length / 2);
    const left = sortedData.slice(0, half);
    const right = sortedData.slice(half);

    return (
        <div className="py-[115px] px-[94px]">
            <span>Рекомендации</span>
            <div className=" mt-[25px] grid grid-cols-2 gap-x-[30px] ">
                {/* Левая колонка */}
                <div className="flex flex-col gap-y-[20px]">
                    {left.map((el, i) => (
                        <SessionSourceItem
                            key={el.dataSource}
                            title={`${el.dataSource}`}
                            background={el.background}
                            isDisabled={el.disabled}
                            icon={el.icon}
                            content={el.reason}
                            confirm={handleChooseRecomendation}
                            index={i + 1}
                        />
                    ))}
                </div>

                {/* Правая колонка */}
                <div className="flex flex-col gap-y-[20px]">
                    {right.map((el, i) => (
                        <SessionSourceItem
                            key={el.dataSource}
                            title={`${el.dataSource}`}
                            background={el.background}
                            isDisabled={el.disabled}
                            icon={el.icon}
                            content={el.reason}
                            confirm={handleChooseRecomendation}
                            index={i + 1 + half}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}