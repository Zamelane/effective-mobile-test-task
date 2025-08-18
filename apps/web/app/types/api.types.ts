export type ValidationErrorResponse<FieldNames extends string> = {
    error: {
        status: 400;
        code: "BAD_REQUEST";
        message: "Validation error";
        details: {
            fieldErrors: {
                formErrors: [];
                fieldErrors: {
                    [K in FieldNames]?: string[];
                };
            };
        };
    };
};

export type ErrorResponse = {
    error: {
        status: number;
        code: string;
        message: string;
        details?: any;
        stack?: string;
    }
};