import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetter'
})
export class FirstLetterPipe implements PipeTransform {

  transform(word: string): string {
    if (!word) return word;
     return word[0].toUpperCase();
  }

}
