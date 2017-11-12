import { RootState } from "../shared/core"
import { SettingValueViewModel } from "../shared/modules/website"

export interface HomeFormValue {
    slideImages?: SettingValueViewModel
    storyHtml?: SettingValueViewModel
    howItWorkBuildHtml?: SettingValueViewModel
    howItWorkDesignHtml?: SettingValueViewModel
    whatDoIWillReceive?: SettingValueViewModel
}

export interface AdminRootState extends RootState {
    
}