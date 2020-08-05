import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCmdStatutComponent } from './show-cmd-statut.component';

describe('ShowCmdStatutComponent', () => {
  let component: ShowCmdStatutComponent;
  let fixture: ComponentFixture<ShowCmdStatutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCmdStatutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCmdStatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
