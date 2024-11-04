import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { SharedModule } from '../../../../shared/shared/shared.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.scss'
})
export class EmployeeDashboardComponent {
  listOfTasks: any = [];
  searchTaskForm!: FormGroup;
  constructor(private service: EmployeeService, private fb: FormBuilder, private snackbar: MatSnackBar) {}

  ngOnInit(){
    this.searchTaskForm = this.fb.group({
      title:[null]
    })
  };
}
