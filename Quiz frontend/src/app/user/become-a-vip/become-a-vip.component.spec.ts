import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeAVipComponent } from './become-a-vip.component';

describe('BecomeAVipComponent', () => {
  let component: BecomeAVipComponent;
  let fixture: ComponentFixture<BecomeAVipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecomeAVipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeAVipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
