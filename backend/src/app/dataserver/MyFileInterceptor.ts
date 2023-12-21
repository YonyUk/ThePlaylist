import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DataserverService } from './dataserver.service';


//this interceptor is to verifie that an upload is validate for its ID value
@Injectable()
export class ValidateIdInterceptor implements NestInterceptor {
 constructor(private readonly dataserverService: DataserverService) {}

 intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
   const request = context.switchToHttp().getRequest();
   const id = request.params.id;

   const isValid = this.dataserverService.ValidatorTokens.some(token => token.ID === id);

   if (!isValid) {
     throw new BadRequestException('ID not found');
   }

   return next.handle();
 }
}
