import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrdenesComponent } from './add-ordenes.component';

describe('AddOrdenesComponent', () => {
  let component: AddOrdenesComponent;
  let fixture: ComponentFixture<AddOrdenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrdenesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
