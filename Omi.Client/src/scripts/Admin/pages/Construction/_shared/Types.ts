import { TaxonomyViewModel } from '../../../../shared/modules/Modulebase'
import { FileEntityInfo } from './../../../../shared/modules/FileAndMedia'

export interface ConstructionViewModel {
    id?: number
    title?: string
    sortText?: string
    price?: number
    area?: number
    houseTypeId?: number
    houseTypeLabel?: string
    designThemeId?: number
    designThemeLabel?: string
    avatar?: FileEntityInfo
    pictures?: Array<FileEntityInfo>
    constructionIncludedItemIds?: Array<number>
    constructionIncludedItems?: Array<TaxonomyViewModel>
    language?: string

    valiablePackageIncludedItems?: Array<TaxonomyViewModel>
    valiableDesignThemes?: Array<TaxonomyViewModel>
    valiableHouseStyles?: Array<TaxonomyViewModel>
}