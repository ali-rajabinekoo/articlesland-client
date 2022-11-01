import {createSlice, PayloadAction} from '@reduxjs/toolkit'

class InitialState {
    value!: string
}

export const categorySlice = createSlice({
    name: 'searchInput',
    initialState: {
        value: ''
    } as InitialState,
    reducers: {
        setSearchInput: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const {setSearchInput} = categorySlice.actions

export default categorySlice.reducer
