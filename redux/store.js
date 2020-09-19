import authReducer from './authSlice'
import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import feedingReducer from './feedingSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    feeding: feedingReducer
  }
})

export default store
export const wrapper = createWrapper(() => store)
