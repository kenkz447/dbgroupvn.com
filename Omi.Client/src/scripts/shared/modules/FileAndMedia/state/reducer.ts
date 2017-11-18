import { fromJS, List, Map } from 'immutable'

import { statePipe, statePipeWithAction } from '../../../core'
import {
    FileItemClickAction,
    FILES_ITEM_CLICK,
    MODAL_CLOSE,
    MODAL_OK,
    MODAL_OPEN,
    SET_CHECKED_FILES,
    OkModalAction,
    OpenModalAction,
    SetCheckedFilesAction,
    SET_RECENT_UPLOAD_FILES,
    SetRecentUploadFilesAction
} from './actions'

const openModal = (action: OpenModalAction) => (state: Map<any, any>) => state.set('visible', true)
const closeModal = (action: OpenModalAction) => (state: Map<any, any>) => state.set('visible', false)
const setAllowSelectMulti = (action: OpenModalAction) => (state: Map<any, any>) => state.set('allowSelectMulti', action.allowSelectMulti)
const setAcceptType = (action: OpenModalAction) => (state: Map<any, any>) => state.set('acceptType', action.acceptType)
const setSelectedResult = (action: OkModalAction) => (state: Map<any, any>) => {
    const allowSelectMulti = state.get('allowSelectMulti') as boolean
    const CHECKED_FILE = state.get('CHECKED_FILES') as List<Map<any, any>>

    return state.setIn(['selected', state.get('handleKey')], allowSelectMulti ? CHECKED_FILE : CHECKED_FILE.first())
}
const setActiveHandleKey = (action: OpenModalAction) => (state: Map<any, any>) => state.set('handleKey', action.handleKey)
const checkOrUncheckFile = (action: FileItemClickAction) => (state: Map<any, any>) => {
    const allowSelectMulti = state.get('allowSelectMulti') as boolean
    const CHECKED_FILE = state.get('CHECKED_FILES') as List<Map<any, any>>

    const existFileInfo = CHECKED_FILE.find((o) => o.get('fileId') == action.fileInfo.fileId)

    const fileInfoImmu = fromJS(action.fileInfo)
    const newCheckedFiles =
        (!existFileInfo) ?
            (allowSelectMulti ? CHECKED_FILE.push(fileInfoImmu) : List([fileInfoImmu]))
            : CHECKED_FILE.remove(CHECKED_FILE.indexOf(existFileInfo))

    state.set('CHECKED_FILES', newCheckedFiles)
    return state
}

const clearCheckedFiles = (action: OpenModalAction) => (state: Map<any, any>) => state.set('CHECKED_FILES', List())
const setCheckedFiles = ({ files }: SetCheckedFilesAction) => (state: Map<any, any>) => state.set('CHECKED_FILES', fromJS(files))

const setRecentUploadFiles = ({ files }: SetRecentUploadFilesAction) => (state: Map<any, any>) => state.set('RECENT_UPLOAD_FILES', fromJS(files))
const clearRecentUploadFiles = ({ files }: SetRecentUploadFilesAction) => (state: Map<any, any>) => state.set('RECENT_UPLOAD_FILES', List())

const initState = Map({
    CHECKED_FILE: List()
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
            return statePipeWithAction([closeModal, clearCheckedFiles, clearRecentUploadFiles], state, action)
        case MODAL_OK:
            return statePipeWithAction([
                setSelectedResult,
                closeModal,
                clearCheckedFiles],
                state, action)
        case FILES_ITEM_CLICK:
            return statePipeWithAction([checkOrUncheckFile], state, action)
        case SET_CHECKED_FILES:
            return statePipeWithAction([setCheckedFiles], state, action)
        case SET_RECENT_UPLOAD_FILES:
            return statePipeWithAction([setRecentUploadFiles], state, action)
    }
    return state
}