import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from 'antd'

import { toCurrency } from '../../../../../../shared/modules/website'
import { ConstructionViewModel } from '../../../../../../Admin'
import { Image } from '../../../../../../shared/modules/FileAndMedia'

interface OwnProps {
    construction: ConstructionViewModel
}
export const ConstructionItem = (props: OwnProps) => {
    return (
        <div className="construction-item mb-4">
            <NavLink className="construction-link" to={`/construction/${props.construction.name}`}>
                <div className="effect">
                    <figure className="effect-hover">
                        <Image classNames="mw-100 d-block" fileEntityInfo={props.construction.avatar} />
                        <figcaption className="d-flex justify-content-center align-items-center">
                            <div className="construction-item-view-btn"> view details</div>
                        </figcaption>
                    </figure>
                    <div className="construction-item-title">
                        <span className="construction-item-text">{props.construction.title}</span>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}