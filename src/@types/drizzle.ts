export interface DrizzleErrorResponse {
    code: string,
    errno: number,
    sql: string,
    sqlState: string,
    sqlMessage: string
}