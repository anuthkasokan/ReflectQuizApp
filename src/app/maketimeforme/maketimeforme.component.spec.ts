import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { Router, ActivatedRoute } from '@angular/router'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
// import { of } from '@angular/';
import { MaketimeformeComponent } from './maketimeforme.component';
import { MakeTimeForMeService } from './maketimeforme.service';
import { HttpClient } from '@angular/common/http';
import { MsalUserService } from '../msaluser.service'

describe('MaketimeformeComponent', () => {
  let component: MaketimeformeComponent;
  let fixture: ComponentFixture<MaketimeformeComponent>;
  let router: Router;
  // let service;
  let service: MakeTimeForMeService;
  let spy: any;
  let httpClient: HttpClient;
  let msalUserService: MsalUserService;

  const questions = [
    { id: 1, question: "", answer: true },
    { id: 2, question: "", answer: true }
  ]

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [MaketimeformeComponent],
      imports: [RouterTestingModule, MatSnackBarModule,HttpClientTestingModule],
      providers: [
        MakeTimeForMeService,MsalUserService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaketimeformeComponent);
    component = fixture.componentInstance;
    service = TestBed.get(MakeTimeForMeService);
    TestBed.get(MsalUserService);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create Maketimeforme service instance', inject([MakeTimeForMeService], (injectSrvice: MakeTimeForMeService) => {
    expect(injectSrvice).toBe(service);
  })
  );
});
