import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  getUsers():Observable<any> {
    return this.http.get(BASE_URL + 'api/admin/users', {
      headers: this.createAuthorizationHeader()
    });
  }

  postTask(taskDTO:any):Observable<any> {
    return this.http.post(BASE_URL + 'api/admin/task',taskDTO, {
      headers: this.createAuthorizationHeader()
    });
  }

  getTasks():Observable<any> {
    return this.http.get(BASE_URL + 'api/admin/tasks', {
      headers: this.createAuthorizationHeader()
    });
  }

  searchTasks(title: string):Observable<any> {
    return this.http.get(BASE_URL + 'api/admin/tasks/search/${title}', {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteTask(id: number):Observable<any> {
    return this.http.delete(BASE_URL + 'api/admin/task/${id}', {
      headers: this.createAuthorizationHeader()
    });
  }

  updateTask(id: number, taskDTO: any):Observable<any> {
    return this.http.put(BASE_URL + 'api/admin/task/${id}', taskDTO, {
      headers: this.createAuthorizationHeader()
    });
  }

  getTaskbyId(id: number):Observable<any> {
    return this.http.get(BASE_URL + 'api/admin/task/${id}', {
      headers: this.createAuthorizationHeader()
    });
  }

  getCommentsByTaskId(id: number):Observable<any> {
    return this.http.get(BASE_URL + 'api/admin/task/${id}/comments', {
      headers: this.createAuthorizationHeader()
    });
  }

  createComment(taskId: number, content: string): Observable<any> {
    const params = {
      taskId: taskId,
      postedBy: StorageService.getUserId()
    };
  
    return this.http.post(BASE_URL + '/api/admin/task/comment', content, {
      params: params,
      headers: this.createAuthorizationHeader()
    });
  }
  

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set('Authorization', 'Bearer ' + StorageService.getToken())
  }
}
