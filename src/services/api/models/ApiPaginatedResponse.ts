export interface ApiPaginatedResponse<Type> {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    data: Type[];
}
