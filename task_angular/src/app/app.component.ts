import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared/shared.module';
import { StorageService } from './auth/services/storage/storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task_angular';

  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();
  isEmployeeLoggedIn: boolean = StorageService.isEmployeeLoggedIn();

  constructor (private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
      this.isEmployeeLoggedIn = StorageService.isEmployeeLoggedIn();
    })
  }

  logout(){
    StorageService.signout();
    this.router.navigateByUrl("/login");
  }
  
}
