import { RequestSend } from "../../shared/core"

export const SendContactAction = (values) => RequestSend(
    'SEND_CONTACT', {
        url: '/contact/send',
        requestInit: {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(values),
        }
    })