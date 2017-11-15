import * as React from 'React'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as classNames from 'classnames'

import { ExtractImmutableHOC, RequestSend, SetTempValue } from '../../../../shared/core'
import { HomeFormValue } from '../../../../Admin'
import { WebsiteRootState } from '../../../Types'
import { ConnectedHomeSlider } from './HomeSlider'
import { ConnectedHomeContactForm } from './HomeContactForm'

interface StateProps {
    homeContent: HomeFormValue
    howDoesItWorkTabActive?: string 
}

interface DispatchProps {
    getHomeContent: () => void
    bindHomeSliderData: (slideImages) => void
    setHowDoesItWorkTabActive: (tabName) => void
}

@(ExtractImmutableHOC as any)
class HomePageContent extends React.Component<StateProps & DispatchProps> {
    componentDidMount() {
        this.props.getHomeContent()
    }

    componentWillReceiveProps(nextProps: StateProps) {
        if (this.props.homeContent != nextProps.homeContent) {
            nextProps.homeContent.slideImages != null &&
                this.props.bindHomeSliderData(nextProps.homeContent.slideImages.value)
        }
    }

    render() {
        if (!this.props.homeContent)
            return null

        return (
            <div>
                <div className="home-slider-wrapper mb-5">
                    <ConnectedHomeSlider />
                    <div className="home-slider-banner brand-container">
                        <div className="home-slider-banner-content">
                            <h1 className="home-slider-banner-heading">
                                INTERIOR DESIGN SERVICE<br />
                            </h1>
                            <p className="home-slider-banner-heading-sub">WE DESIGN AND BUILD FOR YOU</p>
                            <p className="home-slider-banner-text">Let us your space, with your input, our professional interior designers will</p>
                            <Link className="btn btn-link" to="/contact">Contact us</Link>
                        </div>
                    </div>
                </div>
                <div className="brand-container">
                    <div className="home-section mb-5">
                        <div className="home-section-title">
                            <div className="home-section-title-text">
                                DB group story
                            </div>
                        </div>
                        <div className="home-section-content" dangerouslySetInnerHTML={{ __html: this.props.homeContent.storyHtml.value }} />
                    </div>
                    {this.renderHowDoesItWork()}
                </div>
                {this.renderWhatDoIReceive()}
                <div className="brand-container">
                    {this.renderContactForm()}
                    <hr className="mb-5"/>
                    {this.renderHowDoesItWorkTabs()}
                </div>
            </div>
        )
    }
    renderHowDoesItWorkTabs() {
        return (
            <div className="home-how-does-it-work-tabs">
                <button className={classNames("btn home-how-does-it-work-tab", { 'active': this.props.howDoesItWorkTabActive == 'DESIGN' })} onClick={this.howDoesItWorkTabClick('DESIGN')}>DESIGN</button>
                <span className="and">&</span>
                <button className={classNames("btn home-how-does-it-work-tab", { 'active': this.props.howDoesItWorkTabActive == 'BUILD' })} onClick={this.howDoesItWorkTabClick('BUILD')}>BUILD</button>
            </div>
        )
    }
    renderHowDoesItWork() {
        return (
            <div className="home-section mb-5">
                <div className="home-section-title">
                    <div className="home-section-title-text">
                        HOW DOES IT WORK?
                </div>
                </div>
                <div className="home-section-content">
                    {this.renderHowDoesItWorkTabs()}
                    <div className="home-procedure">
                        <div className={classNames({ 'd-none': this.props.howDoesItWorkTabActive != 'DESIGN' })}>
                            <div dangerouslySetInnerHTML={{ __html: this.props.homeContent.howItWorkDesignHtml.value }} />
                        </div>
                        <div className={classNames({ 'd-none': this.props.howDoesItWorkTabActive != 'BUILD' })}>
                            <div dangerouslySetInnerHTML={{ __html: this.props.homeContent.howItWorkBuildHtml.value }} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderWhatDoIReceive() {
        return (
            <div className="home-section-dark-area">
                <div className="brand-container">
                    <div className="home-section-dark">
                        <div className="home-section-dark-title">
                            <div className="home-section-dark-title-text">
                                What do I Receive
                            </div>
                        </div>
                        <div className="home-section-dark-content" dangerouslySetInnerHTML={{ __html: this.props.homeContent.whatDoIWillReceive.value }} />
                    </div>
                </div>
            </div>
        )
    }

    renderContactForm() {
        return (
            <div className="home-section mt-5 mb-5">
                <div className="home-section-title">
                    <div className="home-section-title-text">
                        get in touch
                    </div>
                </div>
                <div className="home-section-content">
                    <ConnectedHomeContactForm />
                </div>
            </div>
        )
    }

    howDoesItWorkTabClick = (tabName) => () => {
        this.props.setHowDoesItWorkTabActive(tabName)
    }
}

const mapStateToProps = (state: WebsiteRootState, ownProps): StateProps => {
    return {
        homeContent: state.data.getIn(['GET_HOME_CONTENT', 'response', 'result']),
        howDoesItWorkTabActive: state.temp.get('HOW_DOES_IT_WORD_TAB_ACTIVE') || 'DESIGN'
    }
}

const mapDispatchToProps = (dispatch, ownProps): DispatchProps => {
    return {
        getHomeContent: () => {
            const requestAction = RequestSend('GET_HOME_CONTENT', {
                url: '/home/getSetting'
            })
            dispatch(requestAction)
        },
        bindHomeSliderData: (slideImages) => {
            const setTempValueAction = SetTempValue('HOME_SLIDE_IMAGES', slideImages)
            dispatch(setTempValueAction)
        },
        setHowDoesItWorkTabActive: (tabName) => {
            const setTempValueAction = SetTempValue('HOW_DOES_IT_WORD_TAB_ACTIVE', tabName)
            dispatch(setTempValueAction)
        }
    }
}
export const ConnectedHomePageContent = connect(mapStateToProps, mapDispatchToProps)(HomePageContent)

