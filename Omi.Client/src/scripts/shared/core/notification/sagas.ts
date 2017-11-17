import { takeEvery } from 'redux-saga'
import { openNotificationWithIcon, NotificationType } from '../utilities'
import { SHOW_NOTIFY, ShowNotificationAction } from './actions'

function* onShow(action: ShowNotificationAction) {
    openNotificationWithIcon(NotificationType.success, action.display)
}

export function* notificationSagas() {
    yield takeEvery(SHOW_NOTIFY, onShow)
}