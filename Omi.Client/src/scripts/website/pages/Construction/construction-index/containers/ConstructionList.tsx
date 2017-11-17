import * as React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

import { ExtractImmutableHOC, RequestSend, SetTempValue } from '../../../../../shared/core'
import { PageEntityViewModel, Pager, Transition } from '../../../../../shared/modules/website'
import { ConstructionViewModel } from '../../../../../Admin'

import { WebsiteRootState } from '../../../../Types'

import { ConstructionItem } from './construction-list/ConstructionItem'

interface DispatchProps {
    getConstructions: () => void
}
interface StateProps {
    constructionPage: PageEntityViewModel<ConstructionViewModel>
    search: string
}

const ConstructionListPager = Pager('pager')

class ConstructionListComponent extends React.Component<StateProps & DispatchProps> {
    componentWillReceiveProps(nextProps: StateProps) {
        if (this.props.search != nextProps.search)
            this.props.getConstructions()
    }

    componentWillMount() {
        this.props.getConstructions()
    }

    render() {
        if (!this.props.constructionPage)
            return null

        return (
            <Transition>
                <Row className="construction-list" gutter={30} >
                    {
                        this.props.constructionPage && this.props.constructionPage.entities.map((item) => (
                            <Col key={item.id} span={6}>
                                <ConstructionItem construction={item} />
                            </Col>)
                        )
                    }
                    {
                        this.props.constructionPage.entities.length &&
                        <Col span={24}>
                            <div className="clearfix">
                                <div className="float-right">
                                    <ConstructionListPager baseURL={new URL(location.href)}  {...this.props.constructionPage.pager} />
                                </div>
                            </div>
                        </Col>
                    }

                </Row>
            </Transition>
        )
    }
}

const mapStateToProps = (state: WebsiteRootState): StateProps => {
    return {
        constructionPage: state.data.getIn(['WEBSITE_PROJECT', 'response', 'result']),
        search: state.router.location.search
    }
}

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        getConstructions: () => {
            const requestSendAction = RequestSend('WEBSITE_PROJECT', {
                url: `/construction/getConstructions${location.search}`
            })
            dispatch(requestSendAction)
        }
    }
}

const ConstructionListWithPureData = ExtractImmutableHOC(ConstructionListComponent)
export const ConstructionList = connect(mapStateToProps, mapDispatchToProps)(ConstructionListWithPureData)