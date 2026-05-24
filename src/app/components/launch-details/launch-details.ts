import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { loadLaunchDetails, toggleFavorite } from '../../state/launch.actions';
import { selectSelectedLaunchWithFavorite, selectIsLoading } from '../../state/launch.selectors';

@Component({
  selector: 'app-launch-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './launch-details.html',
  styleUrl: './launch-details.scss'
})
export class LaunchDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private sanitizer = inject(DomSanitizer);

  loading$ = this.store.select(selectIsLoading);
  launch$ = this.store.select(selectSelectedLaunchWithFavorite);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(loadLaunchDetails({ id }));
    }
  }

  onToggleFavorite(launchId: string): void {
    this.store.dispatch(toggleFavorite({ launchId }));
  }

  getSafeYoutubeUrl(youtubeId: string | null): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${youtubeId || ''}`);
  }
}
