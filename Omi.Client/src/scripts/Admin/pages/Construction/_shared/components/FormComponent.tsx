import * as React from 'react'
import { connect } from 'react-redux'
import { Button, Tabs, Form, Input, Row, Col, Select } from 'antd'

import { ExtractImmutableHOC } from '../../../../../shared/core'
import { AvatarSelect, FileSelectModal, PictureWall } from '../../../../../shared/modules/FileAndMedia'
import { ConstructionViewModel } from '../Types'

export interface ConstructionFormDispatchProps {
    getInitialViewModel?: () => void
    post?: (FormValues: ConstructionViewModel) => void
    redirectToEdit?: (entityId: number) => void
}

export interface ConstructionFormStateProps {
    initConstructionViewModel?: ConstructionViewModel
    formPostResultConstructionId?: number
    searchParams?: string
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
    }

    componentWillMount() {
        this.props.getInitialViewModel()
    } 
 
    render() {
        return (
            <div>
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
                        <TabPane tab="SEO" key="2">Content of Tab Pane 2</TabPane>
                    </Tabs>
                </Form>
                <FileSelectModal />
            </div>
        )
    }

    renderHidden() {
        return [
            this.props.form.getFieldDecorator('id', {
                initialValue: this.props.initConstructionViewModel.id
            })(<Input type="hidden" />),
            this.props.form.getFieldDecorator('language', {
                initialValue: this.props.initConstructionViewModel.language
            })(<Input type="hidden"/>),
        ]
    }

    renderBasicInfomation() {
        return (
            <fieldset>
                <h2 className="form-legend mb-4">Basic infomation</h2>
                <FormItem>
                    {this.props.form.getFieldDecorator('avatar', {
                        rules: [{ required: true, message: 'Please select avatar!' }],
                        initialValue: this.props.initConstructionViewModel.avatar
                    })(<AvatarSelect inputName="avatar" />)}
                </FormItem>
                <FormItem label="Title">
                    {this.props.form.getFieldDecorator('title', {
                        rules: [{ required: true, message: 'Title is required!' }],
                        initialValue: this.props.initConstructionViewModel.title
                    })(<Input placeholder="Title" />)}
                </FormItem>
                <FormItem label="Price">
                    {this.props.form.getFieldDecorator('price', {
                        rules: [{ required: true, message: 'Price is required!' }],
                        initialValue: this.props.initConstructionViewModel.price
                    })(<Input type="number" placeholder="Price" addonAfter="vnđ" />)}
                </FormItem>
            </fieldset>
        )
    }

    renderDesciption() {
        return (
            <fieldset>
                <h2 className="form-legend mb-4">Description</h2>
                <FormItem label="Design theme">
                    {this.props.form.getFieldDecorator('designThemeId', {
                        rules: [{ required: true, message: 'Please select design theme!' }],
                        initialValue: this.props.initConstructionViewModel.designThemeId
                    })(
                        <Select placeholder="Design theme">
                            {
                                this.props.initConstructionViewModel.valiableDesignThemes && this.props.initConstructionViewModel.valiableDesignThemes.map((e) => (
                                    <Option key={e.id} value={e.id}>{e.label}</Option>
                                ))
                            }
                        </Select>
                        )}
                </FormItem>
                <FormItem label="House type"> 
                    {this.props.form.getFieldDecorator('houseTypeId', {
                        rules: [{ required: true, message: 'Please select house type!' }],
                        initialValue: this.props.initConstructionViewModel.houseTypeId
                    })(
                        <Select placeholder="House type">
                            {
                                this.props.initConstructionViewModel.valiableHouseStyles && this.props.initConstructionViewModel.valiableHouseStyles.map((e) => (
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
                <FormItem>
                    {this.props.form.getFieldDecorator('sortText', {
                        initialValue: this.props.initConstructionViewModel.sortText
                    })(<TextArea placeholder="Sort text" />)}
                </FormItem>
                <FormItem label="Included">
                    {this.props.form.getFieldDecorator('constructionIncludedItemIds', {
                        initialValue: this.props.initConstructionViewModel.constructionIncludedItemIds
                    })(
                        <Select placeholder="Include items" mode="multiple">
                            {
                                this.props.initConstructionViewModel.valiableConstructionIncludedItems && this.props.initConstructionViewModel.valiableConstructionIncludedItems.map((e) => (
                                    <Option key={e.id} value={e.id}>{e.label}</Option>
                                ))
                            }
                        </Select>
                    )}
                </FormItem>
            </fieldset>
        )
    }

    renderPictures() {
        return (
            <fieldset>
                <h2 className="form-legend mb-4">Pictures</h2>
                <FormItem label="Gallery">
                    {this.props.form.getFieldDecorator('pictures', {
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