import { useEffect, useRef, useState } from "react"
import { useGetSessionsQuery } from "../../../entities/session/session-api"
import { Logo } from "../../../shared/svg_components/logo"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { formatCreatedDate } from "../../../shared/utils/format"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { setEtlMode } from "../../mode-select/model/slice"
import { useCheckAuth } from "../../../shared/hooks/user-hooks"
import { HomeIco } from "../../../shared/svg_components/home-ico"
import { EtlChatIco } from "../../../shared/svg_components/elt-chat-ico"
import { ContinueIco } from "../../../shared/svg_components/continue-ico"
import { UserIco } from "../../../shared/svg_components/user-ico"
import { IconButton } from "@mui/material"
import { ExitIco } from "../../../shared/svg_components/exit-ico"
import { Tooltip } from "react-tooltip";


export const Sidebar = () => {
    const { id } = useParams()
    const location = useLocation();

    const { userInfo } = useCheckAuth()
    const dispatch = useAppDispatch()
    const isEtlMode = useAppSelector((state) => state.modeSelectSlice.isEtlMode)

    const navigate = useNavigate()

    const [page, setPage] = useState(0)

    const [sessionsArray, setSessionsArray] = useState<any[]>([])
    const scrollRef = useRef<HTMLDivElement | null>(null)

    const { data: sessionsData, isLoading: sessionsLoading, isSuccess: sessionsSuccess, isFetching, refetch } = useGetSessionsQuery({
        page: page,
        pageSize: 10
    }, {
        skip: !Boolean(userInfo?.userId)
    })

    useEffect(() => {
        if (!userInfo?.userId) {
            setSessionsArray([])
        }
    }, [userInfo])

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

    const handleEtlPage = () => {
        dispatch(setEtlMode(true))
        navigate('/')
    }

    const onLogout = () => {
        localStorage.clear()
        navigate('/')
    }

    const isMainPage = !isEtlMode && location.pathname === '/'
    const isEtl = isEtlMode && location.pathname === '/'



    return (
        <aside className="w-72 2xl:w-84 bg-secondary text-white flex flex-col ">
            <button className="mt-[45px] px-[25px]">
                <Logo />
            </button>
            <div className="flex flex-col mt-[50px] font-raleway text-default ml-[10px] mr-[10px] font-[700]">
                <button
                    onClick={handleStartPage}
                    className={` flex items-center  gap-[10px] text-start h-[53px] w-full text-default rounded-[10px] px-[15px] 
                       hover:bg-[#343447] cursor-pointer ${isMainPage && 'bg-[#343447]'}`}>
                    <HomeIco />
                    <span>ГЛАВНАЯ</span>
                </button>
                {/* <div className="h-[1px] bg-white opacity-20 rounded-full" /> */}
                {userInfo?.userId && <button
                    onClick={handleEtlPage}
                    className={` flex items-center  gap-[10px] text-start h-[53px] w-full text-default rounded-[10px] px-[15px] 
                       hover:bg-[#343447] cursor-pointer ${isEtl && 'bg-[#343447]'}`}>
                    <EtlChatIco width={14} height={14} />
                    <span>ETL-РЕЖИМ</span>
                </button>}

            </div>

            <div className=" mt-[60px] px-[25px] text-small opacity-50">
                Активные сессии
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto scroll-none  mt-[10px] px-[10px] mb-[15px]">
                {sessionsArray.map((session, i) => {
                    const isActive = id === session.id;

                    return (
                        <button
                            key={i}
                            onClick={() => handleSession(session.id)}
                            className={`
                            flex justify-between items-center text-start h-[53px] w-full text-default rounded-[10px] px-[15px]
                            hover:bg-[#343447] cursor-pointer transition-colors duration-200 font-[300]
                            group
                            ${isActive && "bg-[#343447]"}
                        `}
                        >
                            <span>{formatCreatedDate(session.createdDate)}</span>

                            <ContinueIco
                                opacity={isActive ? 0 : 1}
                                className={`
                                    transition-opacity duration-200
                                    opacity-15 group-hover:opacity-100
                                    ${isActive ? "opacity-0" : ""}
                                    `}
                            />
                        </button>
                    );
                })}
                {isFetching && (
                    <div className="py-4 text-center opacity-50">Загрузка...</div>
                )}
            </div>
            {
                userInfo?.userId && (
                    <div className="flex items-center justify-between mb-[15px] mx-[10px] px-[15px]">
                        <div className="flex items-center gap-[15px]">
                            <UserIco />
                            <span>{userInfo?.userName}</span>
                        </div>
                        <IconButton
                            onClick={onLogout}
                            className="group"
                            data-tooltip-id="logout-tip"
                            data-tooltip-content="Выйти"
                        >
                            <ExitIco className="opacity-50 group-hover:opacity-100 transition-all duration-200" />
                        </IconButton>

                        <Tooltip
                            id="logout-tip"
                            place="top"
                            className="!bg-gray-800 !text-white !text-sm !rounded-lg !px-3 !py-1 z-40"
                        />
                    </div>
                )
            }
        </aside>
    )
}