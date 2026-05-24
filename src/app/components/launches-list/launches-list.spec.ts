import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { LaunchesListComponent } from './launches-list';

describe('LaunchesList', () => {
  let component: LaunchesListComponent;
  let fixture: ComponentFixture<LaunchesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchesListComponent],
      providers: [
        provideMockStore({
          initialState: {
            launch: {
              launches: [],
              favoriteIds: [],
              loading: false,
              error: null
            }
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchesListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
