import * as React from 'react'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'

import { Form, Input, Button, Tabs, Row, Col, Card } from 'antd'

import { ExtractImmutableHOC, RequestSend, ShowNotification, NotificationType } from '../../../../shared/core'
import { PictureWall } from '../../../../shared/modules/FileAndMedia'

import { AdminRootState, HomeFormValue } from '../../../Types'
import { SettingValueViewModel } from '../../../../shared/modules/website'


interface StateProps {
    formValue?: HomeFormValue,
    submitResponseCode?: string
}

interface DispatchProps {
    getFormValue: () => void
    onPost: (formValue) => void
    onSubmitSucceeded: () => void
}

interface OwnProps {
    form?: any
}

const operations = [
    <Button key="sudmitBtn" type="primary" htmlType="submit">Submit</Button>
]

@(Form.create<any>() as any)
class HomeSettingForm extends React.Component<OwnProps & StateProps & DispatchProps> {

    componentWillMount() {
        this.props.getFormValue()
    }

    componentWillReceiveProps(nextProps: StateProps) {
        if (nextProps.submitResponseCode === "POST_SUCCEEDED")
            this.props.onSubmitSucceeded()
    }

    render() {
        if (!this.props.formValue)
            return null

        return (
            <Card noHovering>
                <Form onSubmit={this.handleSubmit}>
                    <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
                        <Tabs.TabPane tab="Slide Images" key="1">
                            <Row gutter={30}>
                                <Col span={8}>
                                    {this.renderSlideImages()}
                                </Col>
                            </Row>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="DB Group Story" key="2">
                            <Row gutter={30}>
                                <Col span={8}>
                                    {this.renderStory()}
                                </Col>
                            </Row>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="How It Work" key="3">
                            {this.renderHowItWork()}
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="What Do I Receive?" key="4">
                            {this.renderWhatDoIWillReceive()}
                        </Tabs.TabPane>
                    </Tabs>
                </Form>
            </Card>
        )
    }

    renderSlideImages() {
        return (
            <div>
                {this.props.form.getFieldDecorator(nameof.full<HomeFormValue>((o) => o.slideImages.id), {
                    initialValue: this.props.formValue.slideImages.id
                })(<Input type="hidden" />)}
                {this.props.form.getFieldDecorator(nameof.full<HomeFormValue>((o) => o.slideImages.name), {
                    initialValue: this.props.formValue.slideImages.name
                })(<Input type="hidden" />)}
                <Form.Item>
                    {this.props.form.getFieldDecorator(nameof.full<HomeFormValue>((o) => o.slideImages.value), {
                        initialValue: this.props.formValue.slideImages.value
                    })(<PictureWall />)}
                </Form.Item>
            </div>
        )
    }

    renderStory() {
        return (
            <div>
                {this.props.form.getFieldDecorator(nameof.full<HomeFormValue>((o) => o.storyHtml.id), {
                    initialValue: this.props.formValue.storyHtml.id
                })(<Input type="hidden" />)}
                {this.props.form.getFieldDecorator(nameof.full<HomeFormValue>((o) => o.storyHtml.name), {
                    initialValue: this.props.formValue.storyHtml.name
                })(<Input type="hidden" />)}
                <Form.Item>
                    {this.props.form.getFieldDecorator(nameof.full<HomeFormValue>((o) => o.storyHtml.value), {
                        initialValue: this.props.formValue.storyHtml.value
                    })(<Input.TextArea rows={6} />)}
                </Form.Item>
            </div>
        )
    }

    renderHowItWork() {
        return (
            <Row gutter={30}>
                <Col span={8}>
                    {this.props.form.getFieldDecorator(nameof.full<HomeFormValue>((o) => o.howItWorkDesignHtml.id), {
                        initialValue: this.props.formValue.howItWorkDesignHtml.id
                    })(<Input type="hidden" />)}
                    {this.props.form.getFieldDecorator(nameof.full<HomeFormValue>((o) => o.howItWorkDesignHtml.name), {
                        initialValue: this.props.formValue.howItWorkDesignHtml.name
                    })(<Input type="hidden" />)}
                    <Form.Item label="Design">
                        {this.props.form.getFieldDecorator(nameof.full<HomeFormValue>((o) => o.howItWorkDesignHtml.value), {
                            initialValue: this.props.formValue.howItWorkDesignHtml.value
                        })(<Input.TextArea rows={12} />)}
                    </Form.Item>
                </Col>
                <Col span={8}>
                    {this.props.form.getFieldDecorator(nameof.full<HomeFormValue>((o) => o.howItWorkBuildHtml.id), {
                        initialValue: this.props.formValue.howItWorkBuildHtml.id
                    })(<Input type="hidden" />)}
                    {this.props.form.getFieldDecorator(nameof.full<HomeFormValue>((o) => o.howItWorkBuildHtml.name), {
                        initialValue: this.props.formValue.howItWorkBuildHtml.name
                    })(<Input type="hidden" />)}
                    <Form.Item label="build">
                        {this.props.form.getFieldDecorator(nameof.full<HomeFormValue>((o) => o.howItWorkBuildHtml.value), {
                            initialValue: this.props.formValue.howItWorkBuildHtml.value
                        })(<Input.TextArea rows={12} />)}
                    </Form.Item>
                </Col>
            </Row>
        )
    }

    renderWhatDoIWillReceive() {
        return (
            <Row gutter={30}>
                <Col span={8}>
                    {this.props.form.getFieldDecorator(nameof.full<HomeFormValue>((o) => o.whatDoIWillReceive.id), {
                        initialValue: this.props.formValue.whatDoIWillReceive.id
                    })(<Input type="hidden" />)}
                    {this.props.form.getFieldDecorator(nameof.full<HomeFormValue>((o) => o.whatDoIWillReceive.name), {
                        initialValue: this.props.formValue.whatDoIWillReceive.name
                    })(<Input type="hidden" />)}
                    <Form.Item>
                        {this.props.form.getFieldDecorator(nameof.full<HomeFormValue>((o) => o.whatDoIWillReceive.value), {
                            initialValue: this.props.formValue.whatDoIWillReceive.value
                        })(<Input.TextArea rows={12} />)}
                    </Form.Item>
                </Col>
            </Row>
        )
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values: HomeFormValue) => {
            if (!err)
                this.props.onPost(values)
        })
    }
}

const mapStateToProps = (state: AdminRootState, ownProps: OwnProps): StateProps => {
    return {
        formValue: state.data.getIn(['HOME_SETTING', 'response', 'result']),
        submitResponseCode: state.data.getIn(['HOME_SETTING_SUBMIT', 'response', 'code'])
    }
}

const mapDispatchToProps = (dispatch, ownProps: OwnProps): DispatchProps => {
    return {
        getFormValue: () => {
            const requestAction = RequestSend('HOME_SETTING', {
                url: '/home/getSetting'
            })
            dispatch(requestAction)
        },
        onPost: (formValue) => {
            const requestAction = RequestSend('HOME_SETTING_SUBMIT', {
                url: '/home/updateSetting',
                requestInit: {
                    method: 'POST',
                    headers: new Headers({
                      'Accept': 'application/json, text/plain, */*',
                      'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify(formValue),
                    credentials: 'include'
                }
            })
            dispatch(requestAction)
        },
        onSubmitSucceeded() {
            const showNotificationAction = ShowNotification({
              notifyType: NotificationType.success,
              display: {
                title: 'Saved!',
                description: 'Update Successfuly.'
              }
            })
            dispatch(showNotificationAction)
          }
    }
}

export const ConnectedHomeSettingForm = connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(ExtractImmutableHOC(HomeSettingForm))