import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss'] 
})
export class UpdateTaskComponent {
  id!: number; 
  updateTaskForm!: FormGroup;
  listOfEmployees: any = [];
  listOfPriorities: any = ["LOW", "MEDIUM", "HIGH"];
  listOfTaskStatus: any = ["PENDING", "INPROGRESS", "COMPLETED", "DEFERRED", "CANCELLED"];

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    
    this.updateTaskForm = this.fb.group({
      employeeId: [null, [Validators.required]], 
      title: [null, [Validators.required]], 
      dueDate: [null, [Validators.required]],
      description: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      taskStatus: [null, [Validators.required]]
    });
    this.getTaskById(); 
  }

  getTaskById() {
    this.service.getTaskbyId(this.id).subscribe((res) => {
      console.log(res);
      this.getUsers();
      this.updateTaskForm.patchValue(res);
    });
  }

  getUsers() {
    this.service.getUsers().subscribe((res) => {
      console.log(res);
      this.listOfEmployees = res;
    });
  }

  updateTask() {
    this.service.updateTask(this.id, this.updateTaskForm.value).subscribe((res) => {
      console.log(res);
      if (res.id != null) {
        this.router.navigateByUrl("/admin/dashboard");
        this.snackbar.open('Task updated successfully', 'Close', { duration: 5000 });
      } else {
        this.snackbar.open('Something went wrong', 'Error', { duration: 5000 });
      }
    });
  }
}
