import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getTimerClass'
})
export class GetTimerClassPipe implements PipeTransform {

  transform(time): string {

    if (time <= 8) {
      return "badge badge-success ml-3 mr-3 mb-3 font-16";
    }

    if (time <= 15) {
      return "badge badge-primary ml-3 mr-3 mb-3 font-16";
    }

    if (time >= 15) {
      return "badge badge-danger ml-3 mr-3 mb-3 font-16";
    }
  }

}