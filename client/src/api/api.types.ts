export interface ApiResponse<T> {
    timestamp: string,
    status: number,
    success: boolean,
    error: string,
    message: string,
    path: string,
    data: T,
    fieldErrors: any
}