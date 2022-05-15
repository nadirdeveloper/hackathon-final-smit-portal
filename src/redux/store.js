import { configureStore } from '@reduxjs/toolkit'
import allCoursesSlice from './slices/admin/allCoursesSlice'
import dashboardSlice from './slices/admin/dashboardSlice'
import coursesSlice from './slices/public/coursesSlice'
import userSlice from './slices/user/userSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    dashboard: dashboardSlice,
    allCourses: allCoursesSlice,
    courses: coursesSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})  