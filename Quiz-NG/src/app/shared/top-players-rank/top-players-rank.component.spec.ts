import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPlayersRankComponent } from './top-players-rank.component';

describe('TopPlayersRankComponent', () => {
  let component: TopPlayersRankComponent;
  let fixture: ComponentFixture<TopPlayersRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopPlayersRankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPlayersRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
