import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LaunchState } from './launch.reducer';

export const selectLaunchState = createFeatureSelector<LaunchState>('launch');

export const selectAllLaunches = createSelector(selectLaunchState, state => state.launches);
export const selectIsLoading = createSelector(selectLaunchState, state => state.loading);
export const selectFavoriteIds = createSelector(selectLaunchState, state => state.favoriteIds);
export const selectSelectedLaunch = createSelector(selectLaunchState, state => state.selectedLaunch);

export const selectLaunchesWithFavorite = createSelector(
  selectAllLaunches,
  selectFavoriteIds,
  (launches, favoriteIds) => {
    return launches.map(launch => ({
      ...launch,
      isFavorite: favoriteIds.includes(launch.id)
    }));
  }
);

export const selectSelectedLaunchWithFavorite = createSelector(
  selectSelectedLaunch,
  selectFavoriteIds,
  (launch, favoriteIds) => {
    if (!launch) return null;
    return {
      ...launch,
      isFavorite: favoriteIds.includes(launch.id)
    };
  }
);