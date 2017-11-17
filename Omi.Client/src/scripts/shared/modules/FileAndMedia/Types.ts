import { Map } from 'immutable'
import { RootState } from '../../core'

export enum FileType {
    Orther = 1,
    Image = 2
}

export interface FileEntityInfo {
    fileId?: number
    src?: string
    srcThumb?: string
}

export interface ModuleRootState extends RootState {
    fileAndMedia : Map<any, any>
}