import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'appFilterDepense'
})
export class FilterDepensePipe implements PipeTransform {
  transform(items: any[], searchText: string, selectedSearchCriteria: string): any[] {
    if (!items || !searchText || !selectedSearchCriteria) {
      return items;
    }

    searchText = searchText.toLowerCase().trim();

    return items.filter(item => {
      const lowerCasedSearchText = searchText.toLowerCase();

      switch (selectedSearchCriteria) {
        case 'objectif':
          return item.objectif?.toLowerCase().includes(lowerCasedSearchText);
        case 'description':
          return item.description?.toLowerCase().includes(lowerCasedSearchText);
        case 'montantTotal':
          return (item.montantTotal ? item.montantTotal.toString().includes(searchText) : false);
        case 'bloc':
          return item.blocDepenses.some((blocDepense: any) =>
            blocDepense?.bloc?.nom?.toLowerCase().includes(lowerCasedSearchText)
          );
        default:
          return false;
      }
    });
  }
}
