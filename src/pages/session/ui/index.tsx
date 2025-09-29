import { Box } from "@mui/material"
import { SessionsChooseSource } from "../../../widgets/session-choose-source/ui"
import { useGetSessionQuery } from "../../../entities/session/session-api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Loading } from "../../../shared/components/loading";


export const Session = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: sessionData, isSuccess, isFetching, isLoading } = useGetSessionQuery(id, {
        pollingInterval: 1000,
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        if (!isSuccess) return
        if (sessionData.status !== 'USER_WAITING') return
        navigate(`/s/${id}/c`)
    }, [isFetching])


    if (isLoading) {
        return <Loading />
    }

    return (
        <Box className='h-full relative'>
            {
                isSuccess && sessionData.status === 'USER_CHOOSE_DATABASE' && <SessionsChooseSource />
            }
            {
                isSuccess && (sessionData.status === 'AI_DATABASE_ANALYZING' || sessionData.status === 'ANALYZING') && <Loading />
            }
        </Box>
    )
}