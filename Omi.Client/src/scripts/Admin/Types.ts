import { RootState } from "../shared/core"
import { SettingValueViewModel } from "../shared/modules/website"

export interface HomeFormValue {
    slideImages?: SettingValueViewModel
    storyHtml?: SettingValueViewModel
    howItWorkDesignHtml?: SettingValueViewModel
    whatDoIWillReceive?: SettingValueViewModel

    howItWorkBuildHtml?: SettingValueViewModel
    whatDoIWillReceiveBuild?: SettingValueViewModel
}

export interface AdminRootState extends RootState {
    
}