import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing'
import {Router,ActivatedRoute} from '@angular/router'
import { MatSnackBarModule  } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ProductivityZoneComponent } from './productivityzone.component';
import { ProductivityZoneService } from './productivityzone.service';
import { MsalUserService } from '../msaluser.service';
import { FormBuilder } from '@angular/forms';

describe('ProductivityzoneComponent', () => {
  let component: ProductivityZoneComponent;
  let service;
  let msalUserService;
  let fixture: ComponentFixture<ProductivityZoneComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ProductivityZoneComponent],
      imports: [RouterTestingModule, MatSnackBarModule,HttpClientTestingModule],
      providers: [
        ProductivityZoneService,MsalUserService,FormBuilder
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductivityZoneComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ProductivityZoneService);
    msalUserService = TestBed.get(MsalUserService);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create Maketimeforme service instance', inject([ProductivityZoneService], (injectSrvice: ProductivityZoneService) => {
    expect(injectSrvice).toBe(service);
  })
  );
});
