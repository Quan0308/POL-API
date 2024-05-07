import { ArgumentMetadata, Injectable, ParseBoolPipe } from '@nestjs/common';

@Injectable()
export class OptionalParseBoolPipe extends ParseBoolPipe {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value === undefined) {
      return value;
    }
    return super.transform(value, metadata);
  }
}
