import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing-component',
  templateUrl: './landing-component.component.html',
  styleUrls: ['./landing-component.component.css']
})
export class LandingComponentComponent {

  constructor(private router: Router) {
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
