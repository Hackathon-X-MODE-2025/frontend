import { useEffect, useRef, useState } from "react"
import { useGetSessionsQuery } from "../../../entities/session/session-api"
import { Logo } from "../../../shared/svg_components/logo"
import { useNavigate, useParams } from "react-router-dom"
import { formatCreatedDate } from "../../../shared/utils/format"
import { useAppDispatch } from "../../../app/hooks"
import { setEtlMode } from "../../mode-select/model/slice"
import { useCheckAuth } from "../../../shared/hooks/user-hooks"


export const Sidebar = () => {
    const { id } = useParams()

    const { userInfo } = useCheckAuth()
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [page, setPage] = useState(0)

    const [sessionsArray, setSessionsArray] = useState<any[]>([])
    const scrollRef = useRef<HTMLDivElement | null>(null)

    const { data: sessionsData, isLoading: sessionsLoading, isSuccess: sessionsSuccess, isFetching } = useGetSessionsQuery({
        page: page,
        pageSize: 10
    }, {
        skip: !Boolean(userInfo?.userId)
    })

    useEffect(() => {
        if (sessionsSuccess && sessionsData?.content) {
            setSessionsArray((prev) => {
                const existingIds = new Set(prev.map((s) => s.id))
                const uniqueNew = sessionsData.content.filter(
                    (s: any) => !existingIds.has(s.id)
                )
                return [...prev, ...uniqueNew]
            })
        }
    }, [sessionsSuccess, sessionsData])


    useEffect(() => {
        const el = scrollRef.current
        if (!el) return

        const handleScroll = () => {
            if (
                el.scrollTop + el.clientHeight >= el.scrollHeight - 50 &&
                !isFetching &&
                !sessionsLoading &&
                page < (sessionsData?.totalPages ?? 0) - 1
            ) {
                setPage((prev) => prev + 1)
            }
        }

        el.addEventListener("scroll", handleScroll)
        return () => el.removeEventListener("scroll", handleScroll)
    }, [isFetching, sessionsLoading, page, sessionsData])

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return

        const hasMore = page < (sessionsData?.page?.totalPages ?? 0) - 1

        if (
            el.scrollHeight <= el.clientHeight &&
            !isFetching &&
            !sessionsLoading &&
            hasMore
        ) {
            setPage((prev) => prev + 1)
        }
    }, [sessionsArray, isFetching, sessionsLoading, page, sessionsData])

    const handleSession = (id: string) => {
        navigate(`/s/${id}`)
    }

    const handleStartPage = () => {
        dispatch(setEtlMode(false))
        navigate('/')
    }


    return (
        <aside className="w-72 2xl:w-84 bg-secondary text-white flex flex-col ">
            <button onClick={() => navigate('/')} className="mt-[45px] px-[25px] cursor-pointer">
                <Logo />
            </button>
            <button onClick={handleStartPage} className="mt-[20px] border-dashed border-b w-fit self-center cursor-pointer">ETL-РЕЖИМ</button>
            <div className=" mt-[60px] px-[25px] text-small opacity-50">
                Активные сессии
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto scroll-none  mt-[10px] px-[10px]">
                {sessionsArray.map((session, i) => (
                    <button
                        key={i}
                        onClick={() => handleSession(session.id)}
                        className={`text-start h-[53px] w-full text-default rounded-[10px] px-[15px] 
                       hover:bg-[#343447] cursor-pointer ${id === session.id && 'bg-[#343447]'}`}
                    >
                        {formatCreatedDate(session.createdDate)}
                    </button>
                ))}

                {isFetching && (
                    <div className="py-4 text-center opacity-50">Загрузка...</div>
                )}

            </div>
        </aside>
    )
}