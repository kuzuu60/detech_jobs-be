import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { sanitizeInput } from '../utils/sanitize.util';

@Injectable()
export class SanitizePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return this.clean(value);
  }

  private clean(value: any): any {
    if (typeof value === 'string') {
      return sanitizeInput(value);
    }

    if (Array.isArray(value)) {
      return value.map((v) => this.clean(v));
    }

    if (typeof value === 'object' && value !== null) {
      const cleanedObj = {};
      for (const key in value) {
        cleanedObj[key] = this.clean(value[key]);
      }
      return cleanedObj;
    }

    return value;
  }
}