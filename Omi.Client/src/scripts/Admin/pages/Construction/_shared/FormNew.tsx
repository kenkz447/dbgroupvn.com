import * as React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Form } from 'antd'

import { AvatarSelect, FileSelectModal, PictureWall } from '../../../../shared/modules/FileAndMedia'
import { AdminRootState } from '../../../Types'
import { RequestSend, ExtractImmutableHOC, ShowNotification, NotificationType } from '../../../../shared/core'

import { ConstructionFormStateProps, ConstructionFormDispatchProps, ConstructionForm } from './components'

const mapStateToProps = (state: AdminRootState, ownProps): ConstructionFormStateProps => {
  return {
    initConstructionViewModel: state.data.getIn(['initConstructionViewModel', 'response', 'result']) || {},
    formPostResultConstructionId: state.data.getIn(['formPostResultConstructionId', 'response', 'result'])
  }
}

const mapDispatchToProps = (dispatch, ownProps): ConstructionFormDispatchProps => {
  return {
    getInitialViewModel: () => {
      const requestSendAction = RequestSend(
        'initConstructionViewModel', {
          url: `/construction/GetEmptyConstructionViewModel`,
          requestInit: {
            method: 'Get',
            credentials: 'include'
          }
        })
      dispatch(requestSendAction)
    },
    post(FormValues) {
      const requestSendAction = RequestSend(
        'formPostResultConstructionId', {
          url: `/construction/createNewConstruction`,
          requestInit: {
            method: 'POST',
            headers: new Headers({
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify(FormValues),
            credentials: 'include'
          }
        })
      dispatch(requestSendAction)
    },

    redirectToEdit(newConstructionId) {
      const showNotificationAction = ShowNotification({
        notifyType: NotificationType.success,
        display: {
          title: 'Created!',
          description: 'Create a new Construction Successfuly.'
        }
      })
      dispatch(showNotificationAction)
      dispatch(push(`/website/admin/construction/update?constructionId=${newConstructionId}`))
    }
  }
}

const ConstructionFormComponentWithPureData = ExtractImmutableHOC(ConstructionForm)

export const ConstructionFormNew = connect(mapStateToProps, mapDispatchToProps)(ConstructionFormComponentWithPureData)

