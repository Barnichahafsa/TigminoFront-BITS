import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {AdminWeb} from '../../_models/AdminWeb';

@Component({
  selector: 'app-my-admin-account',
  templateUrl: './my-admin-account.component.html',
  styleUrls: ['./my-admin-account.component.css']
})
export class MyAdminAccountComponent implements OnInit {
  loggedInAdmin: AdminWeb | null = null;


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loggedInAdmin = this.authService.getLoggedInAdmin();
  }
}
