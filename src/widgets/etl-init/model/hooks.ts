import { useAppDispatch } from "../../../app/hooks"
import { addEtlSource, remooveEtlSource, resetEtlSources, type SourceSetting } from "./slice"


export const useEtlInitActions = () => {
    const dispatch = useAppDispatch()
    return {
        addItem: (data: SourceSetting) => dispatch(addEtlSource(data)),
        reset: () => dispatch(resetEtlSources()),
        remove: (id: string) => dispatch(remooveEtlSource(id))
    }
}