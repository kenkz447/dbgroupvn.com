import * as React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Form, notification } from 'antd'

import { AvatarSelect, FileSelectModal, PictureWall } from '../../../../shared/modules/FileAndMedia'
import { AdminRootState } from '../../../Types'
import { RequestSend, ExtractImmutableHOC, ShowNotification, NotificationType } from '../../../../shared/core'

import { ConstructionFormStateProps, ConstructionFormDispatchProps, ConstructionForm, ConstructionFormProps } from './components'

const mapStateToProps = (state: AdminRootState, ownProps): ConstructionFormStateProps => {
  return {
    initConstructionViewModel: state.data.getIn(['initConstructionViewModel', 'response', 'result']) || {},
    formPostResultConstructionId: state.data.getIn(['formPostResultConstructionId', 'response', 'result']),
    search: state.router.location.search
  }
}

const mapDispatchToProps = (dispatch, ownProps: ConstructionFormProps): ConstructionFormDispatchProps => {
  return {
    getInitialViewModel: () => {
      const searchParams = new URL(location.href).searchParams

      const requestSendAction = RequestSend(
        'initConstructionViewModel', {
          url: `/construction/getConstructionViewModel?${searchParams.toString()}`,
          requestInit: {
            credentials: 'include'
          }
        })
      dispatch(requestSendAction)
    },
    post(FormValues) {
      const requestSendAction = RequestSend(
        'formPostResultConstructionId', {
          url: `/construction/updateConstruction`,
          requestInit: {
            method: 'POST',
            headers: new Headers({
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify(FormValues),
            credentials: 'include'
          }
        }
      )
      dispatch(requestSendAction)
    },

    redirectToEdit(newConstructionId) {
      const showNotificationAction = ShowNotification({
        notifyType: NotificationType.success,
        display: {
          title: 'Saved!',
          description: 'Update Successfuly.'
        }
      })
      dispatch(showNotificationAction)
      dispatch(push(`${location.pathname}${location.search}`))
    }
  }
}

export const ConnectedConstructionFormUpdate = connect(mapStateToProps, mapDispatchToProps)(ConstructionForm)

