import { responseHandler } from './response-handler.util';
import { HttpStatus } from '@nestjs/common';

describe('responseHandler', () => {

    // Success case
    it('should return a successful response with data', () => {
        const result = responseHandler({
            data: { id: 1, fullName: 'Jane Doe' },
            message: 'Successfully created resume',
            statusCode: HttpStatus.CREATED,
        });

        expect(result.statusCode).toBe(HttpStatus.CREATED);
        expect(result.message).toBe('Successfully created resume');
        expect(result.data).toEqual({ id: 1, fullName: 'Jane Doe' });
        expect(result.error).toBeUndefined();
        expect(result.stack).toBeUndefined();
    });

    // Error case
    it('should return an error response with error details', () => {
        const error = new Error('Something went wrong');
        const result = responseHandler({
            error,
            message: 'Failed to create resume',
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        });

        expect(result.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(result.message).toBe('Failed to create resume');
        expect(result.error).toEqual(error);
        expect(result.stack).toBeDefined();
    });

    // Default status code and message
    it('should return default success message when no message is provided', () => {
        const result = responseHandler({
            data: { id: 2, fullName: 'John Smith' },
        });

        expect(result.statusCode).toBe(HttpStatus.OK);
        expect(result.message).toBe('Request successful');
        expect(result.data).toEqual({ id: 2, fullName: 'John Smith' });
        expect(result.error).toBeUndefined();
    });

    // Ensure stack is not shown in production
    it('should not return stack in production', () => {
        process.env.NODE_ENV = 'production';

        const error = new Error('An unexpected error occurred');
        const result = responseHandler({
            error,
            message: 'Error occurred',
            statusCode: HttpStatus.BAD_REQUEST,
        });

        expect(result.stack).toBeNull();
    });

    // Custom status code
    it('should handle a custom status code', () => {
        const result = responseHandler({
            data: { id: 3, fullName: 'Alice Johnson' },
            statusCode: HttpStatus.CREATED,
        });

        expect(result.statusCode).toBe(HttpStatus.CREATED);
    });

});
