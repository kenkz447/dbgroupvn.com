import * as React from 'react'
import * as Lightbox from 'react-image-lightbox'
import { Row, Col } from 'antd'

import { Image, FileEntityInfo } from '../../../../../shared/modules/FileAndMedia'

interface OwnProps {
    images: Array<FileEntityInfo>
}

export class ConstructionLightBox extends React.Component<OwnProps, any> {
    constructor(props) {
        super(props)

        this.state = {
            photoIndex: 0,
            isOpen: false
        }
    }

    render() {
        const { photoIndex, isOpen } = this.state

        return (
            <div>
                <div>
                    <Row gutter={15}>
                        {
                            this.props.images.map((o) => {
                                return (
                                    <Col span={3} key={o.fileId}>
                                        <div className="lightbox-thumb mb-3" onClick={() => { this.setState({ isOpen: true }) }}>
                                            <Image classNames="mw-100 w-100" fileEntityInfo={o} displayThumb={true} />
                                        </div>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
                {isOpen &&
                    <Lightbox
                        mainSrc={`${window.baseUrl}${this.props.images[photoIndex].src}`}
                        nextSrc={`${window.baseUrl}${this.props.images[(photoIndex + 1) % this.props.images.length].src}`}
                        prevSrc={`${window.baseUrl}${this.props.images[(photoIndex + this.props.images.length - 1) % this.props.images.length].src}`}

                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() => this.setState({
                            photoIndex: (photoIndex + this.props.images.length - 1) % this.props.images.length,
                        })}
                        onMoveNextRequest={() => this.setState({
                            photoIndex: (photoIndex + 1) % this.props.images.length,
                        })}
                    />
                }
            </div>
        )
    }
}