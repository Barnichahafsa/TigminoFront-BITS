import {Pipe, PipeTransform} from '@angular/core';
import {AdminWeb} from '../_models/AdminWeb';

@Pipe({
  name: 'appFilterAdmin'
})
export class FilterAdminPipe implements PipeTransform {
  transform(items: AdminWeb[], searchText: string, selectedSearchCriteria: string): AdminWeb[] {
    if (!items || !searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      switch (selectedSearchCriteria) {
        case 'nom':
          return item.nom.toLowerCase().includes(searchText);
        case 'prenom':
          return item.prenom.toLowerCase().includes(searchText);
        case 'tel':
          return item.contact.toString().includes(searchText);
        case 'role':
          return item.role.toLowerCase().includes(searchText);
        case 'code':
          return item.dept_code.toLowerCase().includes(searchText);
        default:
          return false;
      }
    });
  }
}
