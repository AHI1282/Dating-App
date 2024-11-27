import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { MembersService } from '../../../services/members.service';
import { IMemberModel } from '../../../models/member.model';
import { NgFor } from '@angular/common';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [NgFor, MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  private membersService = inject(MembersService);
  members: IMemberModel[] = [];

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers = () => {
    this.membersService.getMembers()
      .subscribe({
        next: members => this.members = members
      })
  }
}
