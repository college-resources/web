import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import authReducer from './authSlice'
import courseReducer from './courseSlice'
import departmentReducer from './departmentSlice'
import envReducer from './envSlice'
import feedingReducer from './feedingSlice'
import institutesSlice from './instituteSlice'
import preferencesReducer from './preferencesSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    department: departmentReducer,
    env: envReducer,
    feeding: feedingReducer,
    institute: institutesSlice,
    preferences: preferencesReducer
  }
})

export default store
export const wrapper = createWrapper(() => store)
