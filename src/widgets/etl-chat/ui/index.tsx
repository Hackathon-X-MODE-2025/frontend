import { Box } from "@mui/material"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useGetSessionQuery } from "../../../entities/session/session-api";
import { useParams } from "react-router-dom";

export const EtlChat = () => {
    const { id } = useParams()
    const { data: sessionData, isLoading, isError } = useGetSessionQuery(id, {
        pollingInterval: 1000,
        refetchOnMountOrArgChange: true,
    });

    return (
        <Box className="bottom-0 absolute w-full flex items-center justify-center gap-2 p-4">
            {
                sessionData?.status === 'ANALYZING' && 'ANALYZING'
            }
            <textarea
                className="w-10/12 min-h-[80px] bg-[#303030] text-white placeholder-slate-400
      rounded-xl p-4 text-base outline-none resize-none
      border border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition"
                placeholder="Напиши свой запрос сюда..."
            />

            <button
                className="bg-white  text-white p-3 rounded-full shadow-lg
      flex items-center justify-center transition cursor-pointer"
            >
                <ArrowUpwardIcon htmlColor="black" />
            </button>
        </Box>

    )
}