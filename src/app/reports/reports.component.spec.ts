import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';

import { ReportsComponent } from './reports.component';
import { ReportsService } from './reports.service';
import { MsalUserService } from 'app/msaluser.service';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let service: ReportsService;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ReportsComponent],
      imports: [RouterTestingModule, MatSnackBarModule,HttpClientTestingModule],
      providers: [
        ReportsService,MsalUserService,FormBuilder
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ReportsService);
    TestBed.get(MsalUserService);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create Maketimeforme service instance', inject([ReportsService], (injectSrvice: ReportsService) => {
    expect(injectSrvice).toBe(service);
  })
  );
});
