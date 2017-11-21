import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as classNames from 'classnames'
import * as $ from 'jquery-slim'

import { ExtractImmutableHOC, RequestSend, SetTempValue } from '../../../../shared/core'
import { HomeFormValue } from '../../../../Admin'
import { WebsiteRootState } from '../../../Types'
import { ConnectedHomeSlider } from './HomeSlider'
import { ConnectedHomeContactForm } from './HomeContactForm'

require('lightgallery.js')
const lightGallery = window['lightGallery']

interface StateProps {
    homeContent: HomeFormValue
    howDoesItWorkTabActive?: string
}

interface DispatchProps {
    getHomeContent: () => void
    bindHomeSliderData: (slideImages) => void
    setHowDoesItWorkTabActive: (tabName) => void
}

function onElementHeightChange(elm, callback) {
    var lastHeight = elm.clientHeight, newHeight
    (function run() {
        newHeight = elm.clientHeight
        if (lastHeight != newHeight)
            callback()
        lastHeight = newHeight

        if (elm.onElementHeightChangeTimer)
            clearTimeout(elm.onElementHeightChangeTimer)

        elm.onElementHeightChangeTimer = setTimeout(run, 200)
    })()
}

@(ExtractImmutableHOC as any)
class HomePageContent extends React.Component<StateProps & DispatchProps> {
    componentDidMount() {
        this.props.getHomeContent()
    }

    componentWillReceiveProps(nextProps: StateProps) {
        if (this.props.homeContent != nextProps.homeContent) {
            if(nextProps.homeContent && nextProps.homeContent.slideImages)
                this.props.bindHomeSliderData(nextProps.homeContent.slideImages.value)
        }
    }

    componentDidUpdate() {
        const a = document.getElementById('whatDoIWillReceiveDesign')
        if (a)
            lightGallery(a)
        const b = document.getElementById('whatDoIWillReceiveBuild')
        if (b)
            lightGallery(b)
        
        const howDoesItWordElm = document.getElementById('howDoesItWork')
        const homeProcedureBlock = document.getElementsByClassName('home-procedure-block')
        if (howDoesItWordElm && homeProcedureBlock) {
            onElementHeightChange(howDoesItWordElm, function () {
                window['AOS'].refresh()
            })

            window['AOS'].init()
            setTimeout(() => {
                howDoesItWordElm.classList.remove('d-none')
            },300)
        }
    }

    render() {
        if (!this.props.homeContent)
            return null

        return (
            <div>
                <div className="home-slider-wrapper mb-3 mb-lg-5">
                    <ConnectedHomeSlider />
                    <div className="home-slider-banner brand-container">
                        <div className="home-slider-banner-content">
                            <div dangerouslySetInnerHTML={{ __html: this.props.homeContent.slideInfoHtml.value }}/>
                            <Link className="btn btn-link" to="/contact">Contact us</Link>
                        </div>
                    </div>
                </div>
                <div className="brand-container">
                    <div className="home-section mb-3 mb-lg-5">
                        <div className="home-section-title">
                            <div className="home-section-title-text">
                                DB group story
                            </div>
                        </div>
                        <div className="home-section-content" dangerouslySetInnerHTML={{ __html: this.props.homeContent.storyHtml.value }} />
                    </div>
                </div>
                {this.renderHowDoesItWork()}

                <div className="brand-container">
                    {this.renderContactForm()}
                    <hr className="mb-3 mb-lg-5" />
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
            <div id="howDoesItWork" className="home-section mb-3 mb-lg-5 d-none">
                <div className="brand-container">
                    <div className="home-section-title">
                        <div className="home-section-title-text">
                            HOW DOES IT WORK?
                </div>
                    </div>
                </div>
                <div className="home-section-content">
                    {this.renderHowDoesItWorkTabs()}
                    <div className="mt-4">
                        <div className={classNames({ 'd-none': this.props.howDoesItWorkTabActive != 'DESIGN' })}>
                            <div className="home-procedure">
                                <div className="brand-container" dangerouslySetInnerHTML={{ __html: this.props.homeContent.howItWorkDesignHtml.value }} />
                            </div>
                            {this.renderWhatDoIReceive()}
                        </div>
                        <div className={classNames({ 'd-none': this.props.howDoesItWorkTabActive != 'BUILD' })}>
                            <div className="home-procedure">
                                <div className="brand-container" dangerouslySetInnerHTML={{ __html: this.props.homeContent.howItWorkBuildHtml.value }} />
                            </div>
                            {this.renderWhatDoIReceiveBuild()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderWhatDoIReceive() {
        return (
            <div className="home-section-area home-section-dark-area">
                <div className="brand-container">
                    <div className="home-section home-section-dark">
                        <div className="home-section-title home-section-dark-title">
                            <div className="home-section-title-text home-section-dark-title-text">
                                What do I Receive
                            </div>
                        </div>
                        <div className="home-section-content home-section-dark-content" dangerouslySetInnerHTML={{ __html: this.props.homeContent.whatDoIWillReceive.value }} />
                    </div>
                </div>
            </div>
        )
    }

    renderWhatDoIReceiveBuild() {
        return (
            <div className="home-section-area home-section-gray-area">
                <div className="brand-container">
                    <div className="home-section home-section-gray">
                        <div className="home-section-title home-section-gray-title">
                            <div className="home-section-title-text home-section-gray-title-text">
                                What do I Receive
                            </div>
                        </div>
                        <div className="home-section-content home-section-gray-content" dangerouslySetInnerHTML={{ __html: this.props.homeContent.whatDoIWillReceiveBuild.value }} />
                    </div>
                </div>
            </div>
        )
    }
    renderContactForm() {
        return (
            <div className="home-section mt-5 mb-3 mb-lg-5">
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

