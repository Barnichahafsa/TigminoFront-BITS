import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'appFilter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return (item.nom && item.nom.toLowerCase().includes(searchText)) ||
        (item.prenom && item.prenom.toLowerCase().includes(searchText)) ||
        (item.tel && item.tel.includes(searchText)) ||
        (item.appartement.residence && item.appartement.residence.nom && item.appartement.residence.nom.toLowerCase().includes(searchText)) ||
        (item.appartement && item.appartement.number && item.appartement.number.toString().includes(searchText)) ||
        (item.sexe && item.sexe.toLowerCase().includes(searchText));
    });
  }
}
