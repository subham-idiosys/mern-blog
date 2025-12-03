import axios from "axios"
import { setLoading, setError, setPosts, addPost, updatePostInState, removePost } from "../slice/postsSlice.ts"
import type { AdminPost, CreatePostData } from "../lib/types";
import type { AppDispatch } from "@/store/index.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
})


apiClient.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

apiClient.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        const errorMessage = error.response?.data?.error || error.message || "An unexpected error occurred"
        console.log("API Error:", errorMessage)
        return new Error(errorMessage)
    },
)

// Admin Posts API Functions
export async function fetchAdminPosts(dispatch: AppDispatch) {
    dispatch(setLoading(true))
    dispatch(setError(null))

    try {
        const { data } = await apiClient.get("/admin/posts");
        const res = data?.data;
        dispatch(setPosts(res))
        return res
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch posts"
        dispatch(setError(errorMessage))
        throw error
    } finally {
        dispatch(setLoading(false))
    }
}

export async function createAdminPost(postData: CreatePostData, dispatch: AppDispatch) {
    dispatch(setLoading(true))
    dispatch(setError(null))

    try {
        const { data } = await apiClient.post("/admin/posts", postData)
        dispatch(addPost(data.data))
        return data.data
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to create post"
        dispatch(setError(errorMessage))
        throw error
    } finally {
        dispatch(setLoading(false))
    }
}

export async function updateAdminPost(id: string, postData: Partial<AdminPost>, dispatch: AppDispatch) {
    dispatch(setLoading(true))
    dispatch(setError(null))

    try {
        const { data } = await apiClient.put(`/admin/posts/${id}`, postData)
        dispatch(updatePostInState(data.data))
        return data.data
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to update post"
        dispatch(setError(errorMessage))
        throw error
    } finally {
        dispatch(setLoading(false))
    }
}

export async function deleteAdminPost(id: string, dispatch: AppDispatch) {
    dispatch(setLoading(true))
    dispatch(setError(null))

    try {
        await apiClient.delete(`/admin/posts/${id}`)
        dispatch(removePost(id))
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to delete post"
        dispatch(setError(errorMessage))
        throw error
    } finally {
        dispatch(setLoading(false))
    }
}
