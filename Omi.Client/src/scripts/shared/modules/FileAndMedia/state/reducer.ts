import { Map, fromJS, List } from 'immutable'

import { statePipe, statePipeWithAction } from '../../../core'
import { FileEntityInfo } from './../Types'

import {
    MODAL_OPEN, MODAL_CLOSE, MODAL_OK, FILES_ITEM_CLICK,
    OpenModalAction, OkModalAction, FileItemClickAction
} from './actions'

const openModal = (action: OpenModalAction) => (state: Map<any, any>) => state.set('visible', true)
const closeModal = (action: OpenModalAction) => (state: Map<any, any>) => state.set('visible', false)
const setAllowSelectMulti = (action: OpenModalAction) => (state: Map<any, any>) => state.set('allowSelectMulti', action.allowSelectMulti)
const setAcceptType = (action: OpenModalAction) => (state: Map<any, any>) => state.set('acceptType', action.acceptType)
const setSelectedResult = (action: OkModalAction) => (state: Map<any, any>) => {
    const allowSelectMulti = state.get('allowSelectMulti') as boolean
    const checkedFiles = state.get('checkedFiles') as List<Map<any, any>>

    return state.setIn(['selected', state.get('handleKey')], allowSelectMulti ?  checkedFiles : checkedFiles.first())
}
const setActiveHandleKey = (action: OpenModalAction) => (state: Map<any, any>) => state.set('handleKey', action.handleKey)
const checkOrUncheckFile = (action: FileItemClickAction) => (state: Map<any, any>) => {
    const allowSelectMulti = state.get('allowSelectMulti') as boolean
    const checkedFiles = state.get('checkedFiles') as List<Map<any, any>>

    const existFileInfo = checkedFiles.find((o) => o.get('fileId') == action.fileInfo.fileId)

    const fileInfoImmu = fromJS(action.fileInfo)
    const newCheckedFiles =
        (!existFileInfo) ?
            (allowSelectMulti ? checkedFiles.push(fileInfoImmu) : List([fileInfoImmu]))
            : checkedFiles.remove(checkedFiles.indexOf(existFileInfo))

    state.set('checkedFiles', newCheckedFiles)
    return state
}
const clearCheckedFiles = (action: OpenModalAction) => (state: Map<any, any>) => state.set('checkedFiles', List())

const initState = Map({
    checkedFiles: List()
})

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case MODAL_OPEN:
            return statePipeWithAction([
                openModal,
                setActiveHandleKey,
                setAcceptType,
                setAllowSelectMulti],
                state, action)
        case MODAL_CLOSE:
            return statePipeWithAction([closeModal, clearCheckedFiles], state, action)
        case MODAL_OK:
            return statePipeWithAction([
                setSelectedResult,
                closeModal,
                clearCheckedFiles],
                state, action)
        case FILES_ITEM_CLICK:
            return statePipe([checkOrUncheckFile(action)], state)
    }
    return state
}