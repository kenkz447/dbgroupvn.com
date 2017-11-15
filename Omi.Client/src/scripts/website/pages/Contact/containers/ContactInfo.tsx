import * as React from 'react'
import { Row, Col } from 'antd'
import { connect } from 'react-redux'
import { ConnectedContactForm } from './ContactForm'

class ContactInfo extends React.Component {
    render() {
        return (
            <div className="contact-info" style={{ background: `url(${window.baseUrl}Upload/bb311320-6c27-4653-aa5c-eae8a980b9ec/2017/11/lien-he-2017.jpg)` }}>
                <div className="brand-container">
                    <div className="text-center mb-5">
                        <h1 className="contact-info-heading">WE ARE HERE WHEN YOU NEED US</h1>
                        <p className="sub-heading">STOP BY OR JUST GIVE US A CALL</p>
                    </div>
                    <Row>
                        <Col span={12}>
                            <div className="mb-2 mb-lg-0">
                                <p className="contact-info-label h5 mb-4">
                                    <strong>COME IN FOR A DRINK</strong>
                                </p>
                                <dl className="mb-4 pt-2">
                                    <dd>DB group Co.ltd Vietnam</dd>
                                    <dd><address className="m-0">68 Nguyễn Huệ, Phường Bến Nghé<br />Quận 1, Ho Chi Minh</address></dd>
                                </dl>
                                <p className="h5 mb-4 pt-2">
                                    <strong>CALL US</strong>
                                </p>
                                <div className="pt-2">
                                    <p className="call-us">
                                        <a href="tel:+84911907717" title="Click here to call...">
                                            <span className="icon">M</span>(+84) 911 907 717</a>
                                    </p>
                                    <p className="call-us">
                                        <a href="tel:+84922922988" title="Click here to call...">
                                            <span className="icon">T</span>(+84) 922 922 988
                                            </a>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <p className="contact-info-label h5 mb-4">
                                <strong>LEAVE US A NOTE</strong>
                            </p>
                            <ConnectedContactForm />
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export const ConnectedContactInfo = connect()(ContactInfo)