import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'withSpaces'
})
export class WithSpacesPipe implements PipeTransform {

  transform(text: string): string {
      return text.split('_').join(' ');
  }

}