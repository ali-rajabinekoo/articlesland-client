import {configureStore} from '@reduxjs/toolkit'
import commentsReducer from '../reducers/comments'
import userInfoReducer from '../reducers/userInfo'
import categoriesReducer from '../reducers/categories'
import searchInputReducer from '../reducers/searchInput'
import userCategoriesReducer from '../reducers/userCategories'

const store = configureStore({
    reducer: {
        userInfo: userInfoReducer,
        comments: commentsReducer,
        categories: categoriesReducer,
        searchInput: searchInputReducer,
        userCategories: userCategoriesReducer,
    }
})
export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
