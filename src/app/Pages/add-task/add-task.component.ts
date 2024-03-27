import {Component, Inject} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {TacheService} from "../../service/tache.service";
import {Tache} from "../../_models/Tache";
import {DatePipe, DOCUMENT} from "@angular/common";
import {ActivatedRoute} from '@angular/router';
import {MobUserService} from "../../service/mob-user.service";
import {ResidenceService} from "../../service/residence.service";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  successMessage: string = '';
  errorMessage: string = '';
  public showSuccessMessage!: boolean;
  public showErrorMessage!: boolean;
  newTask: Tache = new Tache();
  id!: number;
  mobUser: any;
  userDescription: string = '';
  residences: any[] = [];

  constructor(@Inject(DOCUMENT) private document: Document,
              private service: TacheService,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private route: ActivatedRoute,
              private userService: MobUserService,
              private residenceService: ResidenceService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.userService.getUserById(this.id).subscribe(
        (user: any) => {
          this.mobUser = user;
          this.userDescription = `${user.nom} ${user.prenom} - ${user.service}`;
          this.newTask.Description = this.userDescription;
        },
        (error: any) => {
          console.error("Error fetching user information:", error);
        }
      );
    });

    this.residenceService.getAllResidences().subscribe(
      (residences: any[]) => {
        this.residences = residences;
      },
      (error: any) => {
        console.error("Error fetching residences:", error);
      }
    );
  }


  addTask() {
    const formattedStartTime = this.datePipe.transform(this.newTask.StartTime, 'yyyy-MM-ddTHH:mm:ss') + 'Z';
    const formattedEndTime = this.datePipe.transform(this.newTask.EndTime, 'yyyy-MM-ddTHH:mm:ss') + 'Z';
    this.newTask.StartTime = formattedStartTime;
    this.newTask.EndTime = formattedEndTime;
    this.service.addTask(this.id, this.newTask).subscribe(
      response => {
        this.document.documentElement.scrollTop = 0;
        this.successMessage = 'Tache créée avec succès';
        this.resetForm();
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 2000);
      },
      error => {
        this.document.documentElement.scrollTop = 0;
        this.errorMessage = 'Il y a eu une erreur lors de la création. Veuillez réessayer.';
        this.showErrorMessage = true;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 2000);
      }
    );
  }

  resetForm() {
  }
}
