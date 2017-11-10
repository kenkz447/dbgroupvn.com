export const breakpointChange = (breakPoint) => (state: Map<string, number>) => state.set('currentBreakPoint', breakPoint)

export const layoutTypeChange = (layoutType = 1) => (state: Map<string, number>) => state.set('type', layoutType)