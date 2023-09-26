import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'striptags'
})

export class StriptagsPipe implements PipeTransform {

    transform(input: string, args: string[]): string {
      if (!(typeof input === 'string') || input === 'undefined'){
        return input;
      }

      return input.replace(/<\S[^><]*>/g, '');
    }
}
