import { notification } from 'antd'

export interface NotificationDisplay {
    title: string
    description: string
}

export enum NotificationType {
    success = "success",
    info = "info",
    warning = "warning",
    error = "error"
}

export const openNotificationWithIcon = (type: NotificationType, display: NotificationDisplay) => {
    notification[type]({
        message: display.title,
        description: display.description
    })
}