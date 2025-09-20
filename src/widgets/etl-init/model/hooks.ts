import { useAppDispatch } from "../../../app/hooks"
import { addEtlSource, resetEtlSources, type SourceSetting } from "./slice"


export const useEtlInitActions = () => {
    const dispatch = useAppDispatch()
    return {
        addItem: (data: SourceSetting) => dispatch(addEtlSource(data)),
        reset: () => dispatch(resetEtlSources())
    }
}