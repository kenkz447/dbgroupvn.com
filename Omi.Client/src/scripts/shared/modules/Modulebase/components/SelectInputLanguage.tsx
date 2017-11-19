import * as React from 'react'
import { Link, NavLink } from 'react-router-dom'
import * as classNames from 'classnames'

import { RootState } from '../../../core'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'

interface Language {
    code: string
    label: string
}

const languages: Array<Language> = [
    {
        code: 'vi',
        label: 'Vietnamese'
    },
    {
        code: 'en',
        label: 'English'
    }
]

interface OwnProps {
    callback: () => void
}

class SelectInputLanguage extends React.Component<any> {
    render() {
        return (
            <ul className="language-input-list">
                <li className="language-input-list-item">Input language: </li>
                {languages.map(this.renderLink)}
            </ul>
        )
    }

    @autobind
    renderLink(language: Language) {
        const currentUrl = new URL(location.href)

        const currentInputLang = currentUrl.searchParams.get('input-language')

        currentUrl.searchParams.set('input-language', language.code)

        const linkUrl = `${currentUrl.pathname}${currentUrl.search}`

        return (
            <li key={language.code} className="language-input-list-item">
                <NavLink className={classNames({ 'active': currentInputLang === language.code })} to={linkUrl}>
                    {language.label}
                </NavLink>
            </li>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        search: state.router.location.search
    }
}

export const ConnectedSelectInputLanguage = connect<any, any, OwnProps>(mapStateToProps)(SelectInputLanguage)