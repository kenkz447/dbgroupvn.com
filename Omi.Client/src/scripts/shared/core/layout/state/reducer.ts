import { Action } from 'redux'
import { Map } from 'immutable'

import { statePipe as pipe } from '../../utilities'

import { BREAKPOINT_CHANGE, LAYOUT_TYPE_CHANGE } from './keys'
import { breakpointChange, layoutTypeChange } from './mutators'
import { IBreakPointChangeAction, ILayoutTypeChangeAction } from './actions'

const initialState: Map<string, Object> = Map({
    type: 1
})

export const reducer = (state: Map<string, object> = initialState, action: Action): Map<string, object> => {
    switch (action.type) {
        case BREAKPOINT_CHANGE: {
            const breakpointChangeAction = action as IBreakPointChangeAction
            return pipe([breakpointChange(breakpointChangeAction.breakPoint)], state)
        }
        case LAYOUT_TYPE_CHANGE: {
            const layoutTypeChangeAction = action as ILayoutTypeChangeAction
            return pipe([layoutTypeChange(layoutTypeChangeAction.layoutType)], state)
        }
        default:
            return state
    }
}