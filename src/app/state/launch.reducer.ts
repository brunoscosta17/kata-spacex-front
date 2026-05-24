import { createReducer, on } from '@ngrx/store';
import * as LaunchActions from './launch.actions';
import { Launch } from './launch.model';

export interface LaunchState {
  launches: Launch[];
  selectedLaunch: Launch | null;
  favoriteIds: string[];
  loading: boolean;
  error: any;
}

export const initialState: LaunchState = {
  launches: [],
  selectedLaunch: null,
  favoriteIds: [],
  loading: false,
  error: null
};

export const launchReducer = createReducer(
  initialState,
  on(LaunchActions.loadLaunches, state => ({ ...state, loading: true, error: null })),
  on(LaunchActions.loadLaunchesSuccess, (state, { launches }) => ({ ...state, loading: false, launches })),
  on(LaunchActions.loadLaunchesFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(LaunchActions.toggleFavorite, (state, { launchId }) => {
    const isFavorite = state.favoriteIds.includes(launchId);
    const favoriteIds = isFavorite
      ? state.favoriteIds.filter(id => id !== launchId)
      : [...state.favoriteIds, launchId];
    return { ...state, favoriteIds };
  }),

  on(LaunchActions.loadLaunchDetails, state => ({ ...state, loading: true, selectedLaunch: null, error: null })),
  on(LaunchActions.loadLaunchDetailsSuccess, (state, { launch }) => ({ ...state, loading: false, selectedLaunch: launch })),
  on(LaunchActions.loadLaunchDetailsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);