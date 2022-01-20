import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fitur1Component } from './fitur1.component';

describe('Fitur1Component', () => {
  let component: Fitur1Component;
  let fixture: ComponentFixture<Fitur1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fitur1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fitur1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
