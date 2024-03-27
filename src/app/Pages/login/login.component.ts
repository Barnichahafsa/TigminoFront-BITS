import {Component, OnInit} from '@angular/core';
import {AdminWeb} from '../../_models/AdminWeb'
import {AuthService} from '../../service/auth.service'
import {Router} from '@angular/router';
import {PasswordRecoveryService} from "../../service/password-recovery.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showErrorMessage = false;
  AdminWeb: AdminWeb = new AdminWeb();
  private contact!: string;

  constructor(private authservice: AuthService, private router: Router,
              private passwordRecoveryService: PasswordRecoveryService) {
  }

  ngOnInit(): void {
  }

  initiatePasswordRecovery() {
    this.passwordRecoveryService.initiatePasswordRecovery(this.contact)
      .subscribe(
        () => {
          console.log('Password recovery initiated successfully');
        },
        error => {
          console.error('Error initiating password recovery:', error);
        }
      );
  }

  adminLogin(): void {
    console.log(this.AdminWeb);
    this.authservice.adminLogin(this.AdminWeb).subscribe(
      (data: any) => {
        const token = data.token;
        if (token) {
          localStorage.setItem('authToken', token);
          this.authservice.setLoggedInAdmin(data.admin);
          this.router.navigateByUrl('/home');
        } else {
          this.showErrorMessage = true;
        }
      },
      error => {
        this.showErrorMessage = true;
      }
    );
  }


}
