import * as React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { RequestSend, ExtractImmutableHOC } from '../../../../../shared/core/index'
import { ConstructionViewModel } from '../../../../../Admin'
import { WebsiteRootState } from '../../../../Types'
import { Icon } from 'antd'

interface DispatchProps {
    getNextAndPrev?: (constructionId: number) => void
}
interface StateProps {
    nextAndPrev: { next: ConstructionViewModel, prev: ConstructionViewModel }
}
interface OwnProps {
    constructionId: number
}
@(ExtractImmutableHOC as any)
export class ConstructionNextAndPrev extends React.Component<OwnProps & StateProps & DispatchProps> {
    componentWillMount() {
        this.props.getNextAndPrev(this.props.constructionId)
    }

    componentWillReceiveProps(nextProps: OwnProps) {
        if (this.props.constructionId != nextProps.constructionId)
            this.props.getNextAndPrev(nextProps.constructionId)
    }

    render() {
        if (!this.props.nextAndPrev)
            return null

        return (
            <div className="clearfix">
                {
                    this.props.nextAndPrev.prev && (
                        <div className="float-right ml-3">
                            <NavLink to={`/construction/${this.props.nextAndPrev.prev.name}`}>
                                <div className="construction-prev">
                                    <span className="construction-prev-icon"><Icon type="right" /></span>
                                </div>
                            </NavLink>
                        </div>
                    )
                }
                {
                    this.props.nextAndPrev.next && (
                        <div className="float-right">
                            <NavLink to={`/construction/${this.props.nextAndPrev.next.name}`}>
                                <div className="construction-next">
                                    <span className="construction-next-icon"><Icon type="left" /></span>
                                </div>
                            </NavLink>
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state: WebsiteRootState, ownProps): StateProps => {
    return {
        nextAndPrev: state.data.getIn(['WEBSITE_NEXT_PREV_CONSTRUCTION', 'response', 'result'])
    }
}

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        getNextAndPrev: (constructionId) => {
            const getNextAndPrevConstructionAction = RequestSend('WEBSITE_NEXT_PREV_CONSTRUCTION', {
                url: `/construction/getNextAndPrevConstruction?constructionId=${constructionId}`
            })
            dispatch(getNextAndPrevConstructionAction)
        }
    }
}

export const ConnectedConstructionNextAndPrev = connect(mapStateToProps, mapDispatchToProps)(ConstructionNextAndPrev)