export interface ApiResponse<Type> {
    data: Type;
    errors: ErrorResponse;
    message: string;
}

interface ErrorResponse {
    messages: string[];
}
