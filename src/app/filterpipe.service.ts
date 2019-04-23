// material copied from https://stackoverflow.com/questions/41901643/search-for-a-string-in-all-properties-of-an-object-in-angular-2

import { Pipe, PipeTransform, Injectable } from "@angular/core";

@Pipe({
  name: 'filter',
  pure: false
})

@Injectable()
export class Ng2SearchPipe implements PipeTransform {

  transform(items: any, term: any): any {
    if (term === undefined) {
      return items;
    }

    return items.filter(item =>
      Object.keys(item).some(k => item[k] != null &&
        item[k].toString().toLowerCase()
          .includes(term.toLowerCase()))
    );

  }
}

