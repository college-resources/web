import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import authReducer from './authSlice'
import feedingReducer from './feedingSlice'
import institutesSlice from './institutesSlice'
import preferencesReducer from './preferencesSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    feeding: feedingReducer,
    institutes: institutesSlice,
    preferences: preferencesReducer
  }
})

export default store
export const wrapper = createWrapper(() => store)
