import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, match } from 'react-router'
import { Row, Col } from 'antd'

import { RequestSend, ExtractImmutableHOC } from '../../../../../shared/core'
import { WebsiteRootState } from '../../../../Types'
import { ConstructionCarousel } from './ConstructionCarousel'
import { ConstructionViewModel } from '../../../../../Admin'
import { PageEntityViewModel, toCurrency } from '../../../../../shared/modules/website'

import { ConnectedConstructionNextAndPrev } from './ConstructionNextAndPrev'
import { ConstructionLightBox } from './ConstructionLightBox'

interface DispatchProps {
    getConstruction: (constructionName) => void
}

interface StateProps {
    construction: ConstructionViewModel
    constructionPage: PageEntityViewModel<ConstructionViewModel>
}

interface OwnProps {
    match?: match<{ constructionName: string }>
}

class ConstructionDetail extends React.Component<StateProps & DispatchProps & OwnProps> {

    componentWillReceiveProps(nextProps: OwnProps) {
        if (this.props.match.url != nextProps.match.url)
            this.props.getConstruction(nextProps.match.params.constructionName)
    }

    componentWillMount() {
        this.props.getConstruction(this.props.match.params.constructionName)
    }

    render() {
        const constructionToRender = this.props.construction || this.getFetchedConstruction()

        if (!constructionToRender)
            return null

        return (
            <div className="construction-detail">
                <div className="construction-detail-header mb-5">
                    <ConstructionCarousel pictures={constructionToRender.pictures} />
                </div>
                <Row className="mb-4">
                    <Col span={16}>
                        {this.renderProjectDescription(constructionToRender)}
                    </Col>
                    <Col span={24}>
                        <ConstructionLightBox images={constructionToRender.pictures} />
                    </Col>
                </Row>
                <ConnectedConstructionNextAndPrev constructionId={constructionToRender.id} />
            </div>
        )
    }

    renderProjectDescription(renderConstruction: ConstructionViewModel) {
        return (
            <section className="construction-detail-section mb-5">
                <h1 className="construction-detail-section-label">{renderConstruction.title}</h1>
                <div className="construction-detail-section-details">
                    {renderConstruction.finishDate && <p><span>Finished date: </span> <span>{renderConstruction.finishDate}</span></p>}
                    {renderConstruction.customer && <p><span>Customer: </span> <span>{renderConstruction.customer}</span></p>}
                    {renderConstruction.area && <p><span>Area: </span><span>{renderConstruction.area} m<sup>2</sup></span></p>}
                    {renderConstruction.constructionTypeLabel && <p><span>Type: </span><span>{renderConstruction.constructionTypeLabel}</span></p>}
                    {renderConstruction.constructionStatusLabel && <p><span>Status: </span><span>{renderConstruction.constructionStatusLabel}</span></p>}
                    {renderConstruction.description && <p className="mt-3">{renderConstruction.description}</p>}
                </div>
            </section>
        )
    }

    getFetchedConstruction() {
        if (!this.props.constructionPage)
            return

        const constructionId = +this.props.match.params.constructionName
        return this.props.constructionPage.entities.find((o) => o.id == constructionId)
    }
}

const mapStateToProps = (state: WebsiteRootState): StateProps => {
    return {
        construction: state.data.getIn(['WEBSITE_VIEW_CONSTRUCTION', 'response', 'result']),
        constructionPage: state.data.getIn(['WEBSITE_CONSTRUCTIONS', 'response', 'result']),
    }
}

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        getConstruction: (constructionName) => {
            const requestSendAction = RequestSend('WEBSITE_VIEW_CONSTRUCTION', {
                url: `/construction/GetConstruction?constructionName=${constructionName}`
            })
            dispatch(requestSendAction)
        }
    }
}

const ConstructionComponentWithPureData = ExtractImmutableHOC(ConstructionDetail)
export const ConnectedConstructionDetail = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConstructionComponentWithPureData))