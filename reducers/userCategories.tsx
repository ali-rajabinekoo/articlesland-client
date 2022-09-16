import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {CategoryDto} from "../utils/types";

class InitialState {
    list!: CategoryDto[]
}

export const userCategories = createSlice({
    name: 'userCategories',
    initialState: {
        list: []
    } as InitialState,
    reducers: {
        setUserCategories: (state, action: PayloadAction<CategoryDto[]>) => {
            state.list = action.payload as CategoryDto[]
        },
    }
})

// Action creators are generated for each case reducer function
export const {setUserCategories} = userCategories.actions

export default userCategories.reducer
