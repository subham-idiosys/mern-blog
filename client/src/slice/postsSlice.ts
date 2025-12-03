import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AdminPost } from "../lib/types"

interface AdminPostsState {
    posts: AdminPost[]
    loading: boolean
    error: string | null
}

const initialState: AdminPostsState = {
    posts: [],
    loading: false,
    error: null,
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
        setPosts: (state, action: PayloadAction<AdminPost[]>) => {
            state.posts = action.payload
        },
        addPost: (state, action: PayloadAction<AdminPost>) => {
            state.posts.unshift(action.payload);
        },
        updatePostInState: (state, action: PayloadAction<AdminPost>) => {
            const index = state.posts.findIndex((post) => post._id === action.payload._id)
            if (index !== -1) {
                state.posts[index] = action.payload
            }
        },
        removePost: (state, action: PayloadAction<string>) => {
            state.posts = state.posts.filter((post) => post._id !== action.payload)
        },
    },
})

export const { setLoading, setError, setPosts, addPost, updatePostInState, removePost } = postsSlice.actions

export default postsSlice.reducer