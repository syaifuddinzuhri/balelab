import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpStatus,
} from '@nestjs/common';
import { format } from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
    statusCode: number;
    message: string;
    data: T;
}

@Injectable()
export class SuccessInterceptor<T> implements NestInterceptor<T, Response<T>> {
    constructor(private readonly defaultMessage: string = 'Success') { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        const message = context.getArgByIndex(2)?.message || this.defaultMessage; // Extract message from context if available

        return next.handle().pipe(
            map(data => ({
                statusCode: HttpStatus.OK,
                status: true,
                timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                message,
                data,
            })),
        );
    }
}
