import * as React from 'react'
import { connect } from 'react-redux'

import { ExtractImmutableHOC } from '../../../../shared/core'
import { GoogleMap } from "../../../../shared/modules/Location"
import { WebsiteRootState } from '../../../Types'

interface StateProps {
    markers: Array<any>
}
@(ExtractImmutableHOC as any)
class ContactMap extends React.Component<StateProps> {
    markers = [{
        id: 1,
        lat: 10.7208841,
        lng: 106.694437
    }]
    render() {
        return (
            <div className="brand-container">
                <div className="contact-map-conatiner">
                    <div className="contact-map">
                        <GoogleMap
                            center={[10.7208841, 106.694437]}
                            zoom={10}
                            markers={this.markers}
                            renderMarkerContent={this.renderMarkerContent}
                        />
                    </div>
                </div>
            </div>
        )
    }

    renderMarkerContent(marker) {
        return (
            <div className="hint__content map-marker-hint noevents" style={{ width: 250, left: -21, marginLeft: 0 }}>
                <div className="b-marker clearfix">
                    <div className="d-inline-block float-left mr-1">
                        <img className="w-100 b-marker-logo" src={`${window.baseUrl}Upload/bb311320-6c27-4653-aa5c-eae8a980b9ec/2017/11/Asset 2.png`} />
                    </div>
                    <div className="d-inline-block">
                        <h4 className="h5" style={{ color: 'rgb(255, 255, 255)' }}>DB GROUP</h4>
                        <span style={{ color: 'rgb(255, 255, 255)', lineHeight: 1.5 }}>
                            No.26, Road 4, Phuoc Kien A residential area, Nha Be, Vietnam
                                </span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: WebsiteRootState): StateProps => {
    return {
        markers: state.temp.get('PROJECT_MARKERS')
    }
}

export const ConnectedContactMap = connect(mapStateToProps)(ContactMap)