import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormpipeComponent } from './formpipe.component';

describe('FormpipeComponent', () => {
  let component: FormpipeComponent;
  let fixture: ComponentFixture<FormpipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormpipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormpipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
