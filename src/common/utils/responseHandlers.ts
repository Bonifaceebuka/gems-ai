 export const successResponse =(message: string, data?: any, status_code?: number, code?: string) =>{
    return {
        status_code: status_code ? status_code : 200,
        message,
        data
    }
}

export const errorResponse =(message: string, data?: any, status_code?: number) =>{
    return {
        status_code: status_code ? status_code : 400,
        message,
        data
    }
}

export const serverErrorResponse = (message: string, data?: any, status_code?: number) => {
    return {
        status_code: status_code ? status_code : 500,
        message,
        data
    }
}

/**
 * Response Formatting Helpers
 */
export const formatSuccessResponse = (data: any) => {
    return {
        success: true,
        data,
        timestamp: new Date().toISOString()
    }
}

export const formatErrorResponse = (error: any) => {
    return {
        success: false,
        error: {
            message: error.message,
            code: error.code || 'UNKNOWN_ERROR'
        },
        timestamp: new Date().toISOString()
    }
}