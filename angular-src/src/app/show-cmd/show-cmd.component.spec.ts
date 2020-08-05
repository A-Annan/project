import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCmdComponent } from './show-cmd.component';

describe('ShowCmdComponent', () => {
  let component: ShowCmdComponent;
  let fixture: ComponentFixture<ShowCmdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCmdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
