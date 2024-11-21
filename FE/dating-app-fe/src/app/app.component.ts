import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { IUserModel } from './models/user.model';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  accountService = inject(AccountService);
  users: Array<IUserModel> = [];

  ngOnInit(): void {
    this.getCurrentUser();
    // this.http.get('http://localhost:5118/api/users')
    //   .subscribe({
    //     next: response => this.users = response as IUserModel[],
    //     error: err => console.log(err),
    //     complete: () => console.log("Completed!"),
    //   });
  }

  getCurrentUser = () => {
    const localUser = localStorage.getItem('user');
    if(!localUser) return;

    this.accountService.currentUser.set(JSON.parse(localUser) as IUserModel);
  }
}
