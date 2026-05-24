import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { loadLaunches, toggleFavorite } from '../../state/launch.actions';
import { selectLaunchesWithFavorite, selectIsLoading } from '../../state/launch.selectors';
import { Launch } from '../../state/launch.model';

@Component({
  selector: 'app-launches-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './launches-list.html'
})
export class LaunchesListComponent implements OnInit {
  private store = inject(Store);

  searchTerm$ = new BehaviorSubject<string>('');
  loading$ = this.store.select(selectIsLoading);

  launches$ = combineLatest([
    this.store.select(selectLaunchesWithFavorite),
    this.searchTerm$
  ]).pipe(
    map(([launches, searchTerm]) => {
      const cleanTerm = searchTerm.toLowerCase().trim();
      if (!cleanTerm) return launches;
      return launches.filter(launch =>
        launch.name.toLowerCase().includes(cleanTerm)
      );
    })
  );

  ngOnInit(): void {
    this.store.dispatch(loadLaunches());
  }

  onSearchChange(term: string) {
    this.searchTerm$.next(term);
  }

  onToggleFavorite(event: Event, launchId: string) {
    event.stopPropagation();
    this.store.dispatch(toggleFavorite({ launchId }));
  }

  trackByLaunchId(index: number, launch: Launch): string {
    return launch.id;
  }
}