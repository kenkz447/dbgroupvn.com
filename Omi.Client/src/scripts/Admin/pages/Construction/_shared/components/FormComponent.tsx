import * as React from 'react'
import { connect } from 'react-redux'
import { Button, Tabs, Form, Input, Row, Col, Select } from 'antd'

import { ExtractImmutableHOC } from '../../../../../shared/core'
import { AvatarSelect, FileSelectModal, PictureWall } from '../../../../../shared/modules/FileAndMedia'
import { ConstructionViewModel } from '../Types'
import { ConnectedSelectInputLanguage } from '../../../../../shared/modules/Modulebase/index'

export interface ConstructionFormDispatchProps {
    getInitialViewModel?: () => void
    post?: (FormValues: ConstructionViewModel) => void
    redirectToEdit?: (entityId: number) => void
}

export interface ConstructionFormStateProps {
    initConstructionViewModel?: ConstructionViewModel
    formPostResultConstructionId?: number
    search?: string
}

export interface ConstructionFormProps extends ConstructionFormStateProps, ConstructionFormDispatchProps {
    form: any
}

const FormItem = Form.Item
const { TabPane } = Tabs
const { Option } = Select
const { TextArea } = Input

const operations = [
    <Button type="primary" htmlType="submit">Submit</Button>
]
@(ExtractImmutableHOC as any)
class ConstructionFormComponent extends React.Component<ConstructionFormProps> {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps: ConstructionFormProps) {
        if (nextProps.formPostResultConstructionId && (this.props.formPostResultConstructionId != nextProps.formPostResultConstructionId))
            this.props.redirectToEdit(nextProps.formPostResultConstructionId)
        if (nextProps.search != this.props.search)
            this.props.getInitialViewModel()
    }

    componentWillMount() {
        this.props.getInitialViewModel()
    }

    render() {
        return (
            <div>
                {!this.props.initConstructionViewModel.id || <ConnectedSelectInputLanguage />}
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                    {
                        this.renderHidden.bind(this)()
                    }
                    <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
                        <TabPane tab="Construction info" key="1">
                            <Row gutter={30}>
                                <Col span={8}>
                                    {this.renderBasicInfomation.bind(this)()}
                                </Col>
                                <Col span={8}>
                                    {this.renderDesciption.bind(this)()}
                                </Col>
                                <Col span={8}>
                                    {this.renderPictures.bind(this)()}
                                </Col>
                            </Row>
                        </TabPane>
                    </Tabs>
                </Form>
                <FileSelectModal />
            </div>
        )
    }

    renderHidden() {
        return (
            <div>
                {
                    this.props.form.getFieldDecorator(nameof<ConstructionViewModel>((o) => o.id), {
                        initialValue: this.props.initConstructionViewModel.id
                    })(<Input type="hidden" />)
                }
                {
                    this.props.form.getFieldDecorator(nameof<ConstructionViewModel>((o) => o.language), {
                        initialValue: this.props.initConstructionViewModel.language
                    })(<Input type="hidden" />)
                }
            </div>
        )
    }
    renderBasicInfomation() {
        return (
            <fieldset>
                <h2 className="form-legend mb-4">Basic infomation</h2>
                <FormItem>
                    {this.props.form.getFieldDecorator(nameof<ConstructionViewModel>((o) => o.avatar), {
                        rules: [{ required: true, message: 'Please select avatar!' }],
                        initialValue: this.props.initConstructionViewModel.avatar
                    })(<AvatarSelect />)}
                </FormItem>
                <FormItem label="Title">
                    {this.props.form.getFieldDecorator(nameof<ConstructionViewModel>((o) => o.title), {
                        rules: [{ required: true, message: 'Title is required!' }],
                        initialValue: this.props.initConstructionViewModel.title
                    })(<Input placeholder="Title" />)}
                </FormItem>
            </fieldset>
        )
    }

    renderDesciption() {
        return (
            <fieldset>
                <h2 className="form-legend mb-4">Description</h2>
                <FormItem label="Construction status">
                    {this.props.form.getFieldDecorator(nameof<ConstructionViewModel>((o) => o.statusId), {
                        rules: [{ required: true, message: 'Please select status!' }],
                        initialValue: this.props.initConstructionViewModel.statusId && this.props.initConstructionViewModel.statusId
                    })(
                        <Select placeholder="Select one...">
                            {
                                this.props.initConstructionViewModel.avaliableConstructionStatus && this.props.initConstructionViewModel.avaliableConstructionStatus.map((e) => (
                                    <Option key={e.id} value={e.id}>{e.label}</Option>
                                ))
                            }
                        </Select>
                        )}
                </FormItem>
                <FormItem label="Construction type">
                    {this.props.form.getFieldDecorator(nameof<ConstructionViewModel>((o) => o.constructionTypeId), {
                        rules: [{ required: true, message: 'Please select type!' }],
                        initialValue: this.props.initConstructionViewModel.constructionTypeId && this.props.initConstructionViewModel.constructionTypeId
                    })(
                        <Select placeholder="Select one...">
                            {
                                this.props.initConstructionViewModel.avaliableConstructionType && this.props.initConstructionViewModel.avaliableConstructionType.map((e) => (
                                    <Option key={e.id} value={e.id}>{e.label}</Option>
                                ))
                            }
                        </Select>
                        )}
                </FormItem>
                <FormItem label="Area">
                    {this.props.form.getFieldDecorator('area', {
                        rules: [{ required: true, message: 'Area is required!' }],
                        initialValue: this.props.initConstructionViewModel.area
                    })(<Input type="number" placeholder="Area" addonAfter="m2" />)}
                </FormItem>
                <FormItem label="Customer">
                    {this.props.form.getFieldDecorator(nameof<ConstructionViewModel>((o) => o.customer), {
                        initialValue: this.props.initConstructionViewModel.customer
                    })(<Input placeholder="Customer's name" />)}
                </FormItem>
                <FormItem label="Finished date">
                    {this.props.form.getFieldDecorator(nameof<ConstructionViewModel>((o) => o.finishDate), {
                        initialValue: this.props.initConstructionViewModel.finishDate
                    })(<Input placeholder="Finished date" />)}
                </FormItem>
                <FormItem label="Description">
                    {this.props.form.getFieldDecorator(nameof<ConstructionViewModel>((o) => o.description), {
                        initialValue: this.props.initConstructionViewModel.description
                    })(<TextArea placeholder="Sort text" />)}
                </FormItem>
            </fieldset>
        )
    }

    renderPictures() {
        const a = this.props.form.getFieldValue(nameof<ConstructionViewModel>((o) => o.pictures))
        return (
            <fieldset>
                <h2 className="form-legend mb-4">Pictures</h2>
                <FormItem label="Gallery">
                    {this.props.form.getFieldDecorator(nameof<ConstructionViewModel>((o) => o.pictures), {
                        initialValue: this.props.initConstructionViewModel.pictures
                    })(<PictureWall />)}
                </FormItem>
            </fieldset>
        )
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err)
                this.props.post(values)
        })
    }
}

export const ConstructionForm = Form.create()(ConstructionFormComponent)