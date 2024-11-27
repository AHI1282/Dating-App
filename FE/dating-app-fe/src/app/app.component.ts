import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountService } from './services/account.service';
import { IUserModel } from './models/user.model';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavComponent, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  accountService = inject(AccountService);
  users: Array<IUserModel> = [];

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser = () => {
    const localUser = localStorage.getItem('user');
    if(!localUser) return;

    this.accountService.currentUser.set(JSON.parse(localUser) as IUserModel);
  }
}
