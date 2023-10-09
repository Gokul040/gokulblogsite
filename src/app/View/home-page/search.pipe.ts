import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(text: string, searchText: string): string[] {
        return text.split(' ').filter(word => word.match(searchText));
    }
}