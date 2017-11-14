import * as React from 'react'
import { connect } from 'react-redux'

import { ExtractImmutableHOC, RequestSend } from '../../../../shared/core'
import { TaxonomyViewModel } from '../../../../shared/modules/Modulebase'
import { WebsiteRootState } from '../../../Types'
import { Link } from 'react-router-dom';
import { Radio } from 'antd';

interface DispatchProps {
    getConstructionStatus: () => void
}

interface StateProps {
    allConstructionStatus: Array<TaxonomyViewModel>
    location?: any
}

@(ExtractImmutableHOC as any)
class ConstructionStatusList extends React.Component<StateProps & DispatchProps> {
    componentWillMount() {
        this.props.getConstructionStatus()
    }
    render() {
        if (!this.props.allConstructionStatus)
            return null

        const currentUrl = new URL(location.href)
        const currentStatus = currentUrl.searchParams.get('status')
        const currentType = currentUrl.searchParams.get('type')

        const searchParams = new URLSearchParams(currentUrl.search)
        searchParams.delete('status')

        return (
            <div className="construction-status-list">
                <span className="construction-status-title">
                    <b className="construction-status-list-item">Status</b>
                </span>
                <div>
                    <Link to={`/construction${searchParams.toString()}`}>
                        <Radio checked={!currentUrl.searchParams.get('status')} className="construction-status-list-item">All</Radio>
                    </Link>
                </div>
                {
                    this.props.allConstructionStatus.map((o) => {

                        if (o.name)
                            currentUrl.searchParams.set('status', o.name)
                        else
                            currentUrl.searchParams.delete('status')

                        const search = currentUrl.search
                        return (
                            <div>
                                <Link to={`/construction${search.toString()}`}>
                                    <Radio checked={o.name === currentStatus} className="construction-status-list-item">{o.label}</Radio>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state: WebsiteRootState): StateProps => {
    return {
        allConstructionStatus: state.data.getIn(['ALL_CONSTRUCTION_STATUS', 'response', 'result']),
        location: state.router.location
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