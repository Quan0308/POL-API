import { Reflector } from '@nestjs/core';

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseMessageKey } from './response.decorator';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformationInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const responseMessage =
      this.reflector.get<string>(ResponseMessageKey, context.getHandler()) ??
      '';

    return next.handle().pipe(
      map((data) => ({
        success: context.switchToHttp().getResponse().statusCode < 400,
        message: responseMessage,
        data,
      })),
    );
  }
}
