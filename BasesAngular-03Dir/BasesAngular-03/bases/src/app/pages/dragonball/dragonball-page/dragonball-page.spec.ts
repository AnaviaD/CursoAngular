import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonballPage } from './dragonball-page';

describe('DragonballPage', () => {
  let component: DragonballPage;
  let fixture: ComponentFixture<DragonballPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragonballPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragonballPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
