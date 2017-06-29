import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablecaseComponent } from './tablecase.component';

describe('TablecaseComponent', () => {
  let component: TablecaseComponent;
  let fixture: ComponentFixture<TablecaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablecaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablecaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
