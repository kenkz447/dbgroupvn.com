import { Action } from 'redux'

import { FileType, FileEntityInfo } from '../Types'
export const MODAL_OPEN = 'FILE_AND_MEDIA@MODAL_OPEN'
export const MODAL_CLOSE = 'FILE_AND_MEDIA@MODAL_CLOSE'
export const MODAL_OK = 'FILE_AND_MEDIA@MODAL_OK'
export const FILES_ITEM_CLICK = 'FILE_AND_MEDIA@FILES_ITEM_CHECK'

export interface OpenModalAction extends Action {
    handleKey: string
    acceptType: FileType
    allowSelectMulti?: boolean
}

export interface OkModalAction extends Action {

}

export interface FileItemClickAction extends Action {
    fileInfo: FileEntityInfo
}

export const openModal = (handleKey: string, acceptType: FileType, allowSelectMulti?: boolean): OpenModalAction => ({
    type: MODAL_OPEN,
    handleKey,
    acceptType,
    allowSelectMulti
})

export const closeModal = () => ({
    type: MODAL_CLOSE
})

export const okModal = (): OkModalAction => ({
    type: MODAL_OK
})

export const fileItemClick = (fileInfo: FileEntityInfo): FileItemClickAction => ({
    type: FILES_ITEM_CLICK, fileInfo
})