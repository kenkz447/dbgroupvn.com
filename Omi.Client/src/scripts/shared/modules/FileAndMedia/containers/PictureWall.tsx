import { connect } from 'react-redux'
import { ExtractImmutableHOC } from '../../../core'

import { PictureWallComponent, PictureWallSelectStateProps, PictureWallSelectProps, PictureWallSelectDispathProps } from '../components'
import { ModuleRootState, FileType } from '../Types'
import { openModal } from '../state'

const mapStateToProps = (state: ModuleRootState, ownProps: PictureWallSelectProps): PictureWallSelectStateProps => {
    return {
        selectedValues: state.fileAndMedia.getIn(['selected', ownProps.id])
    }
}

const mapDispatchToProps = (dispatch, ownProps: PictureWallSelectProps): PictureWallSelectDispathProps => {
    return {
        onClick: () => {
            const handleKey = ownProps.id
            const openModalAction = openModal(handleKey, FileType.Image, true)
            dispatch(openModalAction)
        }
    }
}

const ComponentWithPureData = ExtractImmutableHOC(PictureWallComponent)
export const PictureWall = connect(mapStateToProps, mapDispatchToProps)(ComponentWithPureData)