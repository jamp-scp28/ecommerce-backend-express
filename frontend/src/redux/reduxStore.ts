import { configureStore } from '@reduxjs/toolkit'
import ProductSlice from './reducers/product-slice'
import userSlice from './reducers/auth-slice'

export const store = configureStore({
  reducer: {
    products: ProductSlice.reducer,
    user: userSlice.reducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch