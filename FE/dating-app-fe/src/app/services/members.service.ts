import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IMemberModel } from '../models/member.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getMembers = () => {
    return this.http.get<IMemberModel[]>(`${this.baseUrl}/users`)
  }

  getMemberById = (memberId?: number) => {
    return this.http.get<IMemberModel>(`${this.baseUrl}/users/${memberId}`)
  }

  updateProfile = (member: IMemberModel) => {
    return this.http.put<Observable<void>>(`${this.baseUrl}/users`, member);
  }

  setMainPhoto = (photoId: number) => {
    return this.http.put<Observable<void>>(`${this.baseUrl}/users/photo/${photoId}/main`, {});
  }

  removePhoto = (photoId: number) => {
    return this.http.delete<Observable<void>>(`${this.baseUrl}/users/photo/${photoId}`);
  }
}
