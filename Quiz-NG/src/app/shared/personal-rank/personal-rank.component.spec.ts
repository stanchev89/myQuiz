import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalRankComponent } from './personal-rank.component';

describe('PersonalRankComponent', () => {
  let component: PersonalRankComponent;
  let fixture: ComponentFixture<PersonalRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalRankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
