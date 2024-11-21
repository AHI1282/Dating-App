import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ILoginModel } from '../models/login.model';
import { IUserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl: string = 'http://localhost:5118/api';
  private http = inject(HttpClient);
  currentUser = signal<IUserModel | null>(null);

  login = (input: ILoginModel) :Observable<IUserModel> => {
    return this.http.post<IUserModel>(`${this.baseUrl}/accounts/login`, input)
      .pipe(
        map(user => {
          this.currentUser.set(user);
          localStorage.setItem('user', JSON.stringify(user));
          return user;
        })
      );
  }

  logout = () => {
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }
}
