import {createSlice, current, PayloadAction} from '@reduxjs/toolkit'
import {CommentDto} from "../utils/types";

class InitialState {
    list!: CommentDto[]
}

const setListSelector = (comments: CommentDto[]): CommentDto[] => {
    return comments.map(el => {
        const newEl = {...el}
        if (!!el.parent?.id) {
            newEl.children = comments?.filter(el2 => el2.parent?.id === newEl.id)
        }
        return newEl
    }) as CommentDto[]
}

export const commentsReducer = createSlice({
    name: 'comments',
    initialState: {
        list: []
    } as InitialState,
    reducers: {
        initComments: (state, action: PayloadAction<CommentDto[]>) => {
            const comments = [...action.payload]
            state.list = setListSelector(comments)
        },
        addNewComment: (state, action: PayloadAction<CommentDto>) => {
            let comments = current(state.list);
            const newComment = {...action.payload}
            comments = [...comments, newComment].map((el: CommentDto) => {
                if (el.id === action.payload.parent?.id) {
                    const newEl: CommentDto = {...el}
                    newEl.children = [...(newEl.children || []), action.payload]
                    newEl.childNumber = (newEl.childNumber || 0) + 1
                    return newEl
                }
                return el
            })
            state.list = setListSelector(comments)
        }
    }
})

// Action creators are generated for each case reducer function
export const {initComments, addNewComment} = commentsReducer.actions

export default commentsReducer.reducer
