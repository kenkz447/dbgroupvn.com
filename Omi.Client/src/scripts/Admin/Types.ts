import { RootState } from "../shared/core"
import { SettingValueViewModel } from "../shared/modules/website"

export interface HomeFormValue {
    slideImages?: SettingValueViewModel
    slideInfoHtml?: SettingValueViewModel
    storyHtml?: SettingValueViewModel
    howItWorkDesignHtml?: SettingValueViewModel
    whatDoIWillReceive?: SettingValueViewModel
    howItWorkBuildHtml?: SettingValueViewModel
    whatDoIWillReceiveBuild?: SettingValueViewModel
}

export interface WebsiteSettingFormValue {
    siteTitle?: SettingValueViewModel
    siteDescription?: SettingValueViewModel
    companyName?: SettingValueViewModel
    companyLogo?: SettingValueViewModel
    companyAddress?: SettingValueViewModel
    socialNetworks?: SettingValueViewModel
    constructionBannerImage?: SettingValueViewModel
    contactBannerImage?: SettingValueViewModel
    contactWelcomeHtml?: SettingValueViewModel
    contactInfoHtml?: SettingValueViewModel
    contactSendToEmail?: SettingValueViewModel
    contactSendFromEmail?: SettingValueViewModel
    contactSendFromEmailPassword?: SettingValueViewModel
    contactMapLatitude?: SettingValueViewModel
    contactMapLongitude?: SettingValueViewModel
}


export interface AdminRootState extends RootState {
    
}