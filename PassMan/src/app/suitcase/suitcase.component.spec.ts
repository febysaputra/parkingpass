import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitcaseComponent } from './suitcase.component';

describe('SuitcaseComponent', () => {
  let component: SuitcaseComponent;
  let fixture: ComponentFixture<SuitcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
