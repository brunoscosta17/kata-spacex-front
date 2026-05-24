import { createAction, props } from '@ngrx/store';
import { Launch } from './launch.model';

export const loadLaunches = createAction('[Launch List] Load Launches');
export const loadLaunchesSuccess = createAction('[Launch List] Load Success', props<{ launches: Launch[] }>());
export const loadLaunchesFailure = createAction('[Launch List] Load Failure', props<{ error: any }>());

export const toggleFavorite = createAction('[Launch] Toggle Favorite', props<{ launchId: string }>());

export const loadLaunchDetails = createAction('[Launch Details] Load Launch Details', props<{ id: string }>());
export const loadLaunchDetailsSuccess = createAction('[Launch Details] Load Success', props<{ launch: Launch }>());
export const loadLaunchDetailsFailure = createAction('[Launch Details] Load Failure', props<{ error: any }>());

