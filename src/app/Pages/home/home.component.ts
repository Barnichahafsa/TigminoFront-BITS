import {Component, OnInit} from '@angular/core';
import {ReclamationService} from "../../service/reclamation.service";
import {Reclamation} from "../../_models/Reclamation";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  reclamations: Reclamation[] | undefined;

  constructor(private reclamationService: ReclamationService) {
  }

  ngOnInit(): void {
    this.getReclamations();
  }

  getReclamations(): void {
    this.reclamationService.getReclamationsWithUserNames()
      .subscribe((reclamations: Reclamation[]) => {
        this.reclamations = reclamations;
      });
  }


}
