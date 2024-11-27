import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { IUserModel } from '../../models/user.model';
import { ILoginModel } from '../../models/login.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  accountsService = inject(AccountService);
  toastr = inject(ToastrService);

  usersInput = input.required<IUserModel[]>();

  cancelRegister = output<boolean>();
  model!: ILoginModel;

  register = () => {
    this.accountsService.register(this.model)
      .subscribe({
        next: () => this.onCancel(),
      })
  }

  onCancel = () => {
    this.cancelRegister.emit(false);
  }
}
