import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

import { LaunchDetailsComponent } from './launch-details';

describe('LaunchDetailsComponent', () => {
  let component: LaunchDetailsComponent;
  let fixture: ComponentFixture<LaunchDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchDetailsComponent],
      providers: [
        provideMockStore({
          initialState: {
            launch: {
              launches: [],
              selectedLaunch: null,
              favoriteIds: [],
              loading: false,
              error: null
            }
          }
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '123'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
