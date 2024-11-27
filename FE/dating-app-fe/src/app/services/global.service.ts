import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  isLoading = signal<boolean>(false);
}
