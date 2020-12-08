import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixHtmlSymbols'
})
export class FixHtmlSymbolsPipe implements PipeTransform {

  transform(text: string): string {

    return text.split('&quot;').join('"').split('&#039;').join(`'`);
  }

}
