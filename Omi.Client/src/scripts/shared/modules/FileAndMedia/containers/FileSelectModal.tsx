import { connect } from 'react-redux'

import { ExtractImmutableHOC, SetTempValue } from '../../../core'
import { FileSelectModalComponent, FileSelectModalDispatchProps, FileSelectModalStateProps } from '../components'
import { closeModal, okModal } from '../state'
import { ModuleRootState } from '../Types'

const mapStateToProps = (state: ModuleRootState): FileSelectModalStateProps => {
    return {
        visible: state.fileAndMedia.get('visible'),
        allowSelectMulti: state.fileAndMedia.get('allowSelectMulti')
    }
}

const mapDispatchToProps = (dispatch): FileSelectModalDispatchProps => {
    return {
        handleOk: () => {
            const okModalAction = okModal()
            dispatch(okModalAction)
        },
        handleCancel: () => {
            const closeModalAction = closeModal()
            dispatch(closeModalAction)
        },
        setRecentUploadFiles: (files) => {
            const setTempValueAction = SetTempValue('recentUploadFiles', files)
            return dispatch(setTempValueAction)
        }
    }
}

const ComponentWithPureData = ExtractImmutableHOC(FileSelectModalComponent)

export const FileSelectModal = connect(mapStateToProps, mapDispatchToProps)(ComponentWithPureData)