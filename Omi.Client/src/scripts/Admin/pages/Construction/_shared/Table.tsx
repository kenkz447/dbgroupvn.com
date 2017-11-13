import * as React from 'react'
import { Table, Icon } from 'antd'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { PaginationProps } from 'antd/lib/pagination'

import { RequestSend, ExtractImmutableHOC } from '../../../../shared/core'
import { AdminRootState } from '../../../Types'
import { PageEntityViewModel, pageItemRender } from '../../../../shared/modules/website'


interface StateProps {
    dataSource: PageEntityViewModel<any>
}

interface DispatchProps {
    getDataSource: () => void
}

const columns = [{
    title: 'Title',
    dataIndex: 'title',
    render: (text, entity) => {

        return <NavLink to={`/website/admin/construction/update?constructionId=${entity.id}`}>{text}</NavLink>
    }
}]

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    }
}
@(ExtractImmutableHOC as any)
class TableComponent extends React.Component<StateProps & DispatchProps> {

    componentWillMount() {
        this.props.getDataSource()
    }

    getPagiOptions(): PaginationProps {
        if (!this.props.dataSource)
            return null

        return {
            itemRender: pageItemRender('d-block', new URL(location.href), this.props.dataSource.pager.totalPage),
            total: this.props.dataSource.pager.totalPage * 9,
            defaultPageSize: 9,
            current: this.props.dataSource.pager.pageIndex,
            onChange: ((page, pageSize) => {
                this.props.getDataSource()
            }).bind(this)
        }
    }

    render() {
        const pagination = this.getPagiOptions()
        return (
            <Table
                rowKey="id"
                pagination={pagination}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={this.props.dataSource && this.props.dataSource.entities} />
        )
    }
}

const mapStateToProps = (state: AdminRootState): StateProps => {
    return {
        dataSource: state.data.getIn(['CONSTRUCTIONS', 'response', 'result'])
    }
}

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        getDataSource: () => {
            const requestSendAction = RequestSend('CONSTRUCTIONS', {
                url: `/construction/getConstructions${location.search}`
            })
            dispatch(requestSendAction)
        }
    }
}

export const ConnectedTable = connect(mapStateToProps, mapDispatchToProps)(TableComponent)