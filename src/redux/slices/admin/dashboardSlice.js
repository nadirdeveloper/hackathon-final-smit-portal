// redux toolkit user slice
// Language: javascript
import { createSlice } from '@reduxjs/toolkit'

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        data: {},
        loading: true,
    },
    reducers: {
        setDashboardData: (state, action) => {
            state.data = action.payload
        },
        setDashboardLoading: (state, action) => {
            state.loading = action.payload
        },

    },
})

export const { setDashboardData, setDashboardLoading } = dashboardSlice.actions
export default dashboardSlice.reducer
