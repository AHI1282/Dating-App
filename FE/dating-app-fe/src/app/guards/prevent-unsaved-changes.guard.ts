import { CanDeactivateFn } from '@angular/router';
import { ProfileComponent } from '../components/profile/profile.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<ProfileComponent> = (component) => {
  if(component.profileForm?.dirty) {
    return confirm("Are you sure you want to continue? Any unsaved changes will be lost!")
  }

  return true;
};
