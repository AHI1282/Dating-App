import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../../services/members.service';
import { ActivatedRoute } from '@angular/router';
import { IMemberModel } from '../../../models/member.model';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [TabsModule, GalleryModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit {
  private membersService = inject(MembersService);
  private route = inject(ActivatedRoute);
  member?: IMemberModel;
  images: GalleryItem[] = [];

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember = () => {
    const memberId = Number(this.route.snapshot.paramMap.get('id'));
    this.membersService.getMemberById(memberId)
      .subscribe({
        next: member => {
          this.member = member;
          this.member.photos.map(p => {
            this.images.push(new ImageItem({ src: p.url, thumb: p.url }))
          })
        }
      })
  };
}
