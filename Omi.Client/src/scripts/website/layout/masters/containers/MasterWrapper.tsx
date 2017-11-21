import * as React from 'react'
import { connect } from 'react-redux'
import { WebsiteRootState } from '../../../Types'
import { RequestSend } from '../../../../shared/core'

interface StateProps {
    websiteSetting?: any
    children?: any
    isFetching: boolean
}

interface DispatchProps {
    getWebsiteSetting?: () => void
}

function MasterWrapper(props: StateProps & DispatchProps) {
    if (props.websiteSetting == null)
        props.getWebsiteSetting()

    return (
        <div className="brand-wrapper">
            {React.Children.only(props.children)}
        </div>
    )
}


const mapStateToProps = (state: WebsiteRootState): StateProps => {
    return {
        websiteSetting: state.data.getIn(['WEBSITE_SETTING', 'response', 'result']),
        isFetching: true
    }
}

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        getWebsiteSetting: () => {
            const action = RequestSend('WEBSITE_SETTING', {
                url: '/websiteSetting/getSetting'
            })
            dispatch(action)
        }
    }
}

export const ConnectedMasterWrapper = connect<StateProps, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(MasterWrapper)