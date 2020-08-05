import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserstwoComponent } from './userstwo.component';

describe('UserstwoComponent', () => {
  let component: UserstwoComponent;
  let fixture: ComponentFixture<UserstwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserstwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
