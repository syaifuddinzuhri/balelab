import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { format } from 'date-fns';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const errorResponse = {
            statusCode: status,
            status: false,
            timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            message: status !== HttpStatus.INTERNAL_SERVER_ERROR ? (exception as any).response.message || null : 'Internal server error',
        };

        response.status(status).json(errorResponse);
    }
}
