import { Component, inject, input, OnInit, output } from '@angular/core';
import { IMemberModel } from '../../models/member.model';
import { CommonModule } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AccountService } from '../../services/account.service';
import { MembersService } from '../../services/members.service';
import { IPhotoModel } from '../../models/photo.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-photo-upload',
  standalone: true,
  imports: [CommonModule, FileUploadModule],
  templateUrl: './photo-upload.component.html',
  styleUrl: './photo-upload.component.css'
})
export class PhotoUploadComponent implements OnInit {
  private accountService = inject(AccountService);
  private membersService = inject(MembersService);
  private toastrService = inject(ToastrService);

  member = input.required<IMemberModel>();
  uploader?: FileUploader;
  hasBaseDropZoneOver: boolean = false;
  baseUrl = environment.apiUrl;
  memberChange = output<IMemberModel>();

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase = (e: any) => {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader = () => {
    this.uploader = new FileUploader ({
      url: `${this.baseUrl}/users/upload-photo`,
      authToken: `Bearer ${this.accountService.currentUser()?.token}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      const photo = JSON.parse(response);
      const updatedMember = {...this.member()}
      updatedMember.photos.push(photo);
      this.memberChange.emit(updatedMember);
    }
  }

  onSetMainPhoto = (photo: IPhotoModel) => {
    this.membersService
    .setMainPhoto(photo.id)
    .subscribe({
      next: () => {
        this.toastrService.success("Photo set as main successfully!");

        const user = this.accountService.currentUser();
        if(user) {
          user.photoUrl = photo.url;
          this.accountService.setCurrentUser(user);
        }

        const updatedMember = {...this.member()}
        updatedMember.photoUrl = photo.url;

        const mainPhoto = updatedMember.photos.find(p => p.isMain);
        if(mainPhoto) {
          mainPhoto.isMain = false;
        }

        const currPhoto = updatedMember.photos.find(p => p.id == photo.id);
        if(currPhoto) {
          currPhoto.isMain = true;
        }

        this.memberChange.emit(updatedMember);
      }
    })
  }

  onRemovePhoto = (photo: IPhotoModel) => {
    this.membersService
    .removePhoto(photo.id)
      .subscribe({
        next: () => {
          this.toastrService.success("Photo removed successfully!");

          const updatedMember = {...this.member()}
          updatedMember.photos = updatedMember.photos.filter(p => p.id !== photo.id);
          this.memberChange.emit(updatedMember);
        }
      })
  }
}
