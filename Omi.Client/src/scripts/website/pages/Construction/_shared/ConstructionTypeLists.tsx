import * as React from 'react'
import { connect } from 'react-redux'
import { Collapse } from 'antd'

import { ExtractImmutableHOC, RequestSend } from '../../../../shared/core'
import { TaxonomyViewModel } from '../../../../shared/modules/Modulebase'
import { WebsiteRootState } from '../../../Types'
import { Link, NavLink } from 'react-router-dom'
import * as classNames from 'classnames'

interface DispatchProps {
    getConstructionTypes: () => void
}

interface StateProps {
    allConstructionType: Array<TaxonomyViewModel>
    location: any
}

@(ExtractImmutableHOC as any)
class ConstructionTypeList extends React.Component<StateProps & DispatchProps> {
    componentWillMount() {
        this.props.getConstructionTypes()
    }
    render() {
        if (!this.props.allConstructionType)
            return null

        return (
            <div className="construction-type-list">
                <Collapse bordered={false} defaultActiveKey={['1']} accordion>
                    <Collapse.Panel header={this.renderLink({ id: 0, label: 'All'} as any)} key="0" disabled />
                    {
                        this.props.allConstructionType.map((o) => {

                            if (o.children && o.children.length) {
                                return (
                                    <Collapse.Panel header={o.label} key={String(o.id)}>
                                        {
                                            o.children.map((child) => {
                                                return (
                                                    <div className="ml-4 mb-2">
                                                        {this.renderLink(child)}
                                                    </div>
                                                )
                                            })
                                        }
                                    </Collapse.Panel>
                                )
                            }

                            return (
                                <Collapse.Panel header={this.renderLink(o)} key={String(o.id)} disabled />
                            )
                        })
                    }
                </Collapse>
            </div>
        )
    }

    renderLink(type: TaxonomyViewModel) {
        const currentUrl = new URL(location.href)
        const currentType = currentUrl.searchParams.get('type')

        if (type.name)
            currentUrl.searchParams.set('type', type.name)
        else
            currentUrl.searchParams.delete('type')
        
        const search = currentUrl.search

        return (
            <Link className={classNames({ 'active': currentType == type.name })} to={`/construction${search}`}>{type.label}</Link>
        )
    }
}

const mapStateToProps = (state: WebsiteRootState): StateProps => {
    return {
        allConstructionType: state.data.getIn(['ALL_CONSTRUCTION_TYPE', 'response', 'result']),
        location: state.router.location
    }
}

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        getConstructionTypes: () => {
            const action = RequestSend('ALL_CONSTRUCTION_TYPE', {
                url: '/construction/getAllConstructionType'
            })
            dispatch(action)
        }
    }
}

export const ConnectedConstructionTypeLists = connect(mapStateToProps, mapDispatchToProps)(ConstructionTypeList)