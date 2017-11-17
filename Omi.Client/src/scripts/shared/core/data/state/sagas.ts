import { put, takeEvery } from 'redux-saga/effects'

import { openNotificationWithIcon, NotificationType } from '../../utilities'

import { REQUEST_SEND, REQUEST_FAILED } from './keys'
import { RequestResponse, RequestSendAction, RequestFailedAction, RequestFailed } from './actions'

function* onFetchFailed(action: RequestFailedAction) {
    openNotificationWithIcon(NotificationType.error, {title: 'System', description: action.error})
}

function* onRequestSend(action: RequestSendAction) {
    try {
        const response = yield fetch(action.url, action.requestInit)
        const requestResponseAction = RequestResponse(action.dataKey, yield response.json())
        yield put(requestResponseAction)
    } catch (error) {
        yield put(RequestFailed(action.dataKey, error.message))
    }
}

export function* dataSagas() {
    yield takeEvery(REQUEST_SEND, onRequestSend)
    yield takeEvery(REQUEST_FAILED, onFetchFailed)
}