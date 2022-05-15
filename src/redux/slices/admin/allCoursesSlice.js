// redux toolkit user slice
// Language: javascript
import { createSlice } from '@reduxjs/toolkit'

const allCoursesSlice = createSlice({
    name: 'allCourses',
    initialState: {
        data: [],
        loading: true,
    },
    reducers: {
        setAllCoursesData: (state, action) => {
            state.data = action.payload
        },
        setAllCoursesLoading: (state, action) => {
            state.loading = action.payload
        },

    },
})

export const { setAllCoursesData, setAllCoursesLoading } = allCoursesSlice.actions
export default allCoursesSlice.reducer
