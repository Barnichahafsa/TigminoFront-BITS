import {ChangeDetectorRef, Component} from '@angular/core';
import {MobUser, UserType} from "../../_models/MobUser";
import {MobUserService} from "../../service/mob-user.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-agents-list',
  templateUrl: './agents-list.component.html',
  styleUrls: ['./agents-list.component.css']
})
export class AgentsListComponent {
  users: MobUser[] = [];
  agents: MobUser[] = [];

  constructor(private service: MobUserService,
              private router: Router,
              private dialog: MatDialog,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getAgents();
  }

  getAgents(): void {
    this.service.getAllAgentsWithDetails().subscribe(
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
    this.agents = this.users.filter(user => user.type === UserType.AGENT);
  }


  calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    const dob = new Date(dateOfBirth);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  }

  deleteUser(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {message: 'Êtes vous sûr(e) de vouloir supprimer cet utilisateur?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteUser(id).subscribe(() => {
          this.agents = this.agents.filter(user => user.id !== id);
        });
      }
    });

  }
}

