import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {UserDto} from "../utils/types";

class InitialState {
    data!: UserDto | null
}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        data: null
    } as InitialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserDto>) => {
            state.data = action.payload as UserDto
        },
    }
})

// Action creators are generated for each case reducer function
export const {setUserInfo} = userInfoSlice.actions

export default userInfoSlice.reducer
