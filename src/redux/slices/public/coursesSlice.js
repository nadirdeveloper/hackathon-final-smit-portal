// redux toolkit user slice
// Language: javascript
import { createSlice } from '@reduxjs/toolkit'

const coursesSlice = createSlice({
    name: 'courses',
    initialState: {
        data: [],
        loading: true,
    },
    reducers: {
        setCoursesData: (state, action) => {
            state.data = action.payload
        },
        setCoursesLoading: (state, action) => {
            state.loading = action.payload
        },

    },
})

export const { setCoursesData, setCoursesLoading } = coursesSlice.actions
export default coursesSlice.reducer
