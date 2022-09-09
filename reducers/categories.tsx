import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {CategoryDto} from "../utils/types";

class InitialState {
    list!: CategoryDto[]
}

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        list: []
    } as InitialState,
    reducers: {
        setCategories: (state, action: PayloadAction<CategoryDto[]>) => {
            const payload: CategoryDto[] = action.payload as CategoryDto[]
            state.list = [...payload]
        },
    }
})

// Action creators are generated for each case reducer function
export const {setCategories} = categorySlice.actions

export default categorySlice.reducer
