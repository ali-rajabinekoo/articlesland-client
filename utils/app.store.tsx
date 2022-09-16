import {configureStore} from '@reduxjs/toolkit'
import categoriesReducer from '../reducers/categories'
import userCategoriesReducer from '../reducers/userCategories'

const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        userCategories: userCategoriesReducer,
    }
})
export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
