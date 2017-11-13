import * as React from 'react'
import { connect } from 'react-redux'

import { ExtractImmutableHOC, RequestSend } from '../../../../../shared/core'
import { TaxonomyViewModel } from '../../../../../shared/modules/Modulebase'
import { WebsiteRootState } from '../../../../Types'

interface DispatchProps {
    getConstructionStatus: () => void
}

interface StateProps {
    allConstructionStatus: Array<TaxonomyViewModel>
}

@(ExtractImmutableHOC as any)
class ConstructionStatusList extends React.Component<StateProps & DispatchProps> {

}

const mapStateToProps = (state: WebsiteRootState): StateProps => {
    return {
        allConstructionStatus: state.data.getIn(['ALL_CONSTRUCTION_STATUS', 'response', 'result'])
    }
}

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        getConstructionStatus: () => {
            const action = RequestSend('ALL_CONSTRUCTION_STATUS', {
                url: '/construction/getAllConstructionStatus'
            })
            dispatch(action)
        },
    }
}

export const ConnectedConstructionStatusList = connect(mapStateToProps, mapDispatchToProps)(ConstructionStatusList)