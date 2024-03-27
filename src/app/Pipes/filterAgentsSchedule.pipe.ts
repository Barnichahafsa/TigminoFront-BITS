import {Pipe, PipeTransform} from '@angular/core';
import {MobUser} from "../_models/MobUser";

@Pipe({
  name: 'appFilterAgentSchedule'
})
export class filterAgentsSchedule implements PipeTransform {
  transform(items: MobUser[], searchText: string, selectedSearchCriteria: string): MobUser[] {
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
        case 'service':
          return item.service.toLowerCase().includes(searchText);
        default:
          return false;
      }
    });
  }
}
