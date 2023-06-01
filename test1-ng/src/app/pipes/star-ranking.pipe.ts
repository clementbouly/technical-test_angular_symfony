import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRanking'
})
export class StarRankingPipe implements PipeTransform {

  transform(value: number): unknown {
    // '☆☆☆☆☆' '★★★★★'
    return '★'.repeat(value).padEnd(10, '☆');
  }

}
