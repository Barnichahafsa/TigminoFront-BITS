import {Component, OnInit} from '@angular/core';
import {L10n, loadCldr} from '@syncfusion/ej2-base';
import {DataManager, JsonAdaptor} from '@syncfusion/ej2-data';

import * as numberingSystems from 'cldr-data/supplemental/numberingSystems.json';
import * as gregorian from 'cldr-data/main/fr/ca-gregorian.json';
import * as numbers from 'cldr-data/main/fr/numbers.json';
import * as timeZoneNames from 'cldr-data/main/fr/timeZoneNames.json';

import {EventSettingsModel} from "@syncfusion/ej2-angular-schedule";
import {HttpClient} from "@angular/common/http";
import {TacheService} from "../../service/tache.service";
import {Router} from "@angular/router";
import {MobUser, UserType} from "../../_models/MobUser";
import {MobUserService} from "../../service/mob-user.service";


loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);

L10n.load({
  'fr': {
    'schedule': {
      'day': 'Jour',
      'week': 'Semaine',
      'workWeek': 'Semaine de travail',
      'month': 'Mois',
      'year': 'Année',
      'agenda': 'Agenda',
      'weekAgenda': 'Agenda de la semaine',
      'workWeekAgenda': 'Agenda de la semaine de travail',
      'monthAgenda': 'Agenda du mois',
      'today': "Aujourd'hui",
      'noEvents': "Pas d'événements",
      'emptyContainer': "Il n'y a aucun événement prévu ce jour-là.",
      'allDay': 'Toute la journée',
      'start': 'Début',
      'end': 'Fin',
      'more': 'plus',
      'close': 'Fermer',
      'cancel': 'Annuler',
      'noTitle': '(Pas de titre)',
      'delete': 'Supprimer',
      'deleteEvent': 'Cet événement',
      'deleteMultipleEvent': 'Supprimer plusieurs événements',
      'selectedItems': 'Éléments sélectionnés',
      'deleteSeries': 'Série entière',
      'edit': 'Modifier',
      'editSeries': 'Série entière',
      'editEvent': 'Cet événement',
      'createEvent': 'Créer',
      'subject': 'Sujet',
      'addTitle': 'Ajouter un titre',
      'moreDetails': 'Plus de détails',
      'save': 'Enregistrer',
      'editContent': 'Comment souhaitez-vous modifier le rendez-vous dans la série ?',
      'deleteContent': 'Êtes-vous sûr de vouloir supprimer cet événement ?',
      'deleteMultipleContent': 'Êtes-vous sûr de vouloir supprimer les événements sélectionnés ?',
      'newEvent': 'Nouvel événement',
      'title': 'Titre',
      'location': 'Lieu',
      'description': 'Description',
      'timezone': 'Fuseau horaire',
      'startTimezone': 'Fuseau horaire de début',
      'endTimezone': 'Fuseau horaire de fin',
      'repeat': 'Répéter',
      'saveButton': 'Enregistrer',
      'cancelButton': 'Annuler',
      'deleteButton': 'Supprimer',
      'recurrence': 'Récurrence',
      'wrongPattern': "Le motif de récurrence n'est pas valide.",
      'seriesChangeAlert': "Voulez-vous annuler les modifications apportées à des instances spécifiques de cette série et les faire correspondre à toute la série à nouveau ?",
      'createError': "La durée de l'événement doit être plus courte que sa fréquence. Réduisez la durée ou modifiez le motif de récurrence dans l'éditeur d'événements de récurrence.",
      'sameDayAlert': "Deux occurrences du même événement ne peuvent pas se produire le même jour.",
      'editRecurrence': 'Modifier la récurrence',
      'repeats': 'Répétitions',
      'alert': 'Alerte',
      'startEndError': 'La date de fin sélectionnée survient avant la date de début.',
      'invalidDateError': "La valeur de date saisie n'est pas valide.",
      'blockAlert': 'Les événements ne peuvent pas être planifiés dans la plage horaire bloquée.',
      'ok': 'Ok',
      'yes': 'Oui',
      'no': 'Non',
      'occurrence': 'Occurrence',
      'series': 'Série',
      'previous': 'Précédent',
      'next': 'Suivant',
      'timelineDay': 'Jour de la chronologie',
      'timelineWeek': 'Semaine de la chronologie',
      'timelineWorkWeek': 'Semaine de travail de la chronologie',
      'timelineMonth': 'Mois de la chronologie',
      'timelineYear': 'Année de la chronologie',
      'editFollowingEvent': 'Événements suivants',
      'deleteTitle': "Supprimer l'événement",
      'editTitle': "Modifier l'événement",
      'beginFrom': 'Commencer à partir de',
      'endAt': 'Se terminer à',
      'expandAllDaySection': 'Développer la section toute la journée',
      'collapseAllDaySection': 'Réduire la section toute la journée'
    },
    'recurrenceeditor': {
      'none': 'Aucun',
      'daily': 'Quotidien',
      'weekly': 'Hebdomadaire',
      'monthly': 'Mensuel',
      'month': 'Mois',
      'yearly': 'Annuel',
      'never': 'Jamais',
      'until': "Jusqu'à",
      'count': 'Compte',
      'first': 'Premier',
      'second': 'Deuxième',
      'third': 'Troisième',
      'fourth': 'Quatrième',
      'last': 'Dernier',
      'repeat': 'Répéter',
      'repeatEvery': 'Répéter chaque',
      'on': 'Répéter le',
      'end': 'Fin',
      'onDay': 'Jour',
      'days': 'Jour(s)',
      'weeks': 'Semaine(s)',
      'months': 'Mois',
      'years': 'Année(s)',
      'every': 'tous les',
      'summaryTimes': 'fois',
      'summaryOn': 'le',
      'summaryUntil': "jusqu'à",
      'summaryRepeat': 'Répétitions',
      'summaryDay': 'jour(s)',
      'summaryWeek': 'semaine(s)',
      'summaryMonth': 'mois',
      'summaryYear': 'année(s)',
      'monthWeek': 'Semaine du mois',
      'monthPosition': 'Position dans le mois',
      'monthExpander': 'Développeur de mois',
      'yearExpander': "Développeur d'année",
      'repeatInterval': 'Intervalle de répétition'
    }
  }
});

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  public data!: DataManager;
  public eventSettings!: EventSettingsModel;
  agents: MobUser[] = [];
  users: MobUser[] = [];
  searchText = '';
  selectedSearchCriteria = 'nom';


  constructor(private http: HttpClient, private userservice: MobUserService, private service: TacheService, private router: Router,) {
  }

  ngOnInit(): void {
    this.fetchTasks();
    this.getAgents();
  }

  fetchTasks() {
    this.http.get<any[]>('http://localhost:8080/getAllTasks')
      .subscribe(
        (response) => {
          this.data = new DataManager({
            json: response,
            adaptor: new JsonAdaptor()
          });
          this.eventSettings = {dataSource: this.data};
        },
        (error) => {
          console.error('Error fetching tasks:', error);
        }
      );
  }

  goToCreatePage(userId: number): void {
    this.router.navigate(['/addTask', userId]);
  }

  getAgents(): void {
    this.userservice.getAllAgentsWithDetails().subscribe(
      (data: MobUser[]) => {
        this.users = data;
        this.filterAgents();
      },
      (error) => {
        console.log('Error fetching agents:', error);
      }
    );
  }


  filterAgents(): void {
    this.agents = this.users.filter(user => user.type === UserType.AGENT && this.filterByCriteria(user));
    console.log('Filtered Agents:', this.agents);
  }


  filterByCriteria(user: MobUser): boolean {
    const searchTerm = this.searchText.toLowerCase().trim();
    console.log('Search Term:', searchTerm);
    const selectedField = this.selectedSearchCriteria;
    if (selectedField === 'nom') {
      return user.nom.toLowerCase().includes(searchTerm);
    } else if (selectedField === 'prenom') {
      return user.prenom.toLowerCase().includes(searchTerm);
    } else if (selectedField === 'service') {
      console.log('User Service:', user.service);
      return user.service.toLowerCase().includes(searchTerm);
    }
    return false;
  }


  onSearch(): void {
    console.log('Search Text:', this.searchText);
    console.log('Selected Criteria:', this.selectedSearchCriteria);
    this.filterAgents();
  }

}

