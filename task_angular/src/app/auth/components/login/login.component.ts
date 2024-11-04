import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared/shared.module';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;

  hidePassword: boolean = true;

  constructor(private fb: FormBuilder,
    private service: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      password: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.required]],
    })
  }
  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  login(){
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe((res) => {
      console.log(res);
      if (res.userId != null){
        console.log(res);
        const user = {
          id: res.userId,
          role: res.userRole
        }
        StorageService.saveUser(user);
        StorageService.saveToken(res.jwt);
        if (StorageService.isAdminLoggedIn())
          this.router.navigateByUrl("/admin/dashboard");
        else if (StorageService.isEmployeeLoggedIn())
          this.router.navigateByUrl("/employee/dashboard");        
      }
        else{
        this.snackbar.open("Invalid Credentials", "Close", { duration: 5000, panelClass: 'error-snackbar'});
      }
    })
  }

}
