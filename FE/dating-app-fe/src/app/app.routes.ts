import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { ListsComponent } from './components/lists/lists.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { preventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'members', component: MemberListComponent,  },
      { path: 'members/:id', component: MemberDetailComponent,  },
      { path: 'lists', component: ListsComponent,  },
      { path: 'messages', component: MessagesComponent,  },
      { path: 'profile', component: ProfileComponent,
        canDeactivate:[preventUnsavedChangesGuard]  },
    ]
  },
  { path: '**', component: HomeComponent, pathMatch: 'full' }
];
