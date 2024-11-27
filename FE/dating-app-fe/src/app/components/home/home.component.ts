import { Component } from '@angular/core';
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showRegisterForm: boolean = false;

  onRegister = () => {
    this.showRegisterForm = true;
  }

  cancelRegister = (event: boolean) => {
    this.showRegisterForm = event;
  }
}
