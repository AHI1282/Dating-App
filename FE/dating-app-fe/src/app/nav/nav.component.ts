import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ILoginModel } from '../models/login.model';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountsService = inject(AccountService);
  model: ILoginModel = { userName: '', password: ''};

  login = () => {
    this.accountsService
      .login(this.model)
      .subscribe();
  }

  logout = () => this.accountsService.logout();
}
