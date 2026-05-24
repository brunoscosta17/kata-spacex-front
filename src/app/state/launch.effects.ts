import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SpacexService } from '../services/spacex';
import * as LaunchActions from './launch.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class LaunchEffects {
  loadLaunches$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LaunchActions.loadLaunches),
      mergeMap(() =>
        this.spacexService.getPastLaunches().pipe(
          map(launches => LaunchActions.loadLaunchesSuccess({ launches })),
          catchError(error => of(LaunchActions.loadLaunchesFailure({ error })))
        )
      )
    )
  );

  loadLaunchDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LaunchActions.loadLaunchDetails),
      mergeMap(({ id }) =>
        this.spacexService.getLaunchById(id).pipe(
          map(launch => LaunchActions.loadLaunchDetailsSuccess({ launch })),
          catchError(error => of(LaunchActions.loadLaunchDetailsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private spacexService: SpacexService
  ) {}
}