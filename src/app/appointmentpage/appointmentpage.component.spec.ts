import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppointmentpageComponent } from './appointmentpage.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppointmentpageComponent', () => {
  let component: AppointmentpageComponent;
  let fixture: ComponentFixture<AppointmentpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [AppointmentpageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
