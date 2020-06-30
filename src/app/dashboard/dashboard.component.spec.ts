import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardService } from './dashboard.service';
import { MsalUserService } from 'app/msaluser.service';
import { FormBuilder } from '@angular/forms';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let service: DashboardService;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [RouterTestingModule, MatSnackBarModule,HttpClientTestingModule],
      providers: [
        DashboardService,MsalUserService,FormBuilder
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    service = TestBed.get(DashboardService);
    TestBed.get(MsalUserService);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create Maketimeforme service instance', inject([DashboardService], (injectSrvice: DashboardService) => {
    expect(injectSrvice).toBe(service);
  })
  );

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
