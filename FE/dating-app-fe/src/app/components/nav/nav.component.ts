import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccountService } from '../../services/account.service';
import { ILoginModel } from '../../models/login.model';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountsService = inject(AccountService);
  router = inject(Router);
  toastr = inject(ToastrService);

  model: ILoginModel = { id: 0, password: '', userName: '' };

  login = () => {
    this.accountsService
      .login(this.model)
      .subscribe({
        next: () => this.router.navigateByUrl('/members'),
      });
  }

  onLogout = () => {
    this.accountsService.logout();
    this.router.navigateByUrl('/');
  }
}
