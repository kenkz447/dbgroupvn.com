import { connect } from 'react-redux'

import { ExtractImmutableHOC } from '../../../core'

import { FileType, ModuleRootState } from '../Types'
import { openModal, setCheckedFiles } from '../state'
import { AvatarSelectComponent, AvatarSelectDispathProps, AvatarSelectStateProps, AvatarSelectProps } from '../components'


const mapStateToProps = (state: ModuleRootState, ownProps: AvatarSelectProps): AvatarSelectStateProps => {
    return {
        selectedValue: state.fileAndMedia.getIn(['selected', ownProps.inputName])
    }
}

const mapDispatchToProps = (dispatch, ownProps): AvatarSelectDispathProps => {
    return {
        onClick: (handleKey: string) => {
            const openModalAction = openModal({
                handleKey: handleKey,
                acceptType: FileType.Image
            })
            dispatch(openModalAction)

            const setModalSelectedFilesAction = setCheckedFiles({ files: ownProps.value })
            dispatch(setModalSelectedFilesAction)
        }
    }
}

const AvatarSelectWithPureData = ExtractImmutableHOC(AvatarSelectComponent)
export const AvatarSelect = connect(mapStateToProps, mapDispatchToProps)(AvatarSelectWithPureData)