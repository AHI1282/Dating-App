import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { IMemberModel } from '../../models/member.model';
import { MembersService } from '../../services/members.service';
import { AccountService } from '../../services/account.service';
import { FormsModule, NgForm } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, TabsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  @ViewChild('profileForm') profileForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event:any) {
    if (this.profileForm?.dirty) {
      $event.returnValue = true;
    }
  }

  private membersService = inject(MembersService);
  private accountService = inject(AccountService);
  private toastrService = inject(ToastrService);
  globalService = inject(GlobalService);

  member?: IMemberModel;

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile = () => {
    const loggedInUserId = this.accountService.currentUser()?.id;

    this.membersService.getMemberById(loggedInUserId)
      .subscribe({
        next: user => this.member = user
      })
  }

  updateProfile = () => {
    this.globalService.isLoading.set(true);
    this.membersService.updateProfile(this.profileForm?.value)
      .subscribe({
        next: _ => {
          this.toastrService.success("Profile updated successfully!");
          this.profileForm?.reset(this.member);
          this.globalService.isLoading.set(false);
        }
      })
  }
}
