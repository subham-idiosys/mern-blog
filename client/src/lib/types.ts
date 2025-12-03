export interface AdminPost {
    _id: string
    title: string
    body: string
    createdAt?: string
    updatedAt?: string
}

export interface CreatePostData {
    title: string
    body: string
}