import { TaxonomyViewModel } from '../../../../shared/modules/Modulebase'
import { FileEntityInfo } from './../../../../shared/modules/FileAndMedia'

export interface ConstructionViewModel {
    id?: number
    title?: string
    description?: string
    customer?: string
    finishDate?: string
    area?: number
    constructionTypeId?: number
    constructionTypeLabel?: string
    statusId?: number
    constructionStatusLabel?: string
    avatar?: FileEntityInfo
    pictures?: Array<FileEntityInfo>
    language?: string

    avaliableConstructionType?: Array<TaxonomyViewModel>
    avaliableConstructionStatus?: Array<TaxonomyViewModel>
}