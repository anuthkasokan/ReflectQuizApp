import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { SettingsService } from './settings.service';
import { MsalUserService } from 'app/msaluser.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let service: SettingsService;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      imports: [RouterTestingModule, MatSnackBarModule,HttpClientTestingModule],
      providers: [
        SettingsService,MsalUserService,FormBuilder
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(SettingsService);
    TestBed.get(MsalUserService);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create service instance', inject([SettingsService], (injectSrvice: SettingsService) => {
    expect(injectSrvice).toBe(service);
  })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
