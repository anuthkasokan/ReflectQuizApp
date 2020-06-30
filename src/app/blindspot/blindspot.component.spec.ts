import { async, ComponentFixture, TestBed ,inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { Router, ActivatedRoute } from '@angular/router'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BlindSpotService } from './blindspot.service';
import { MsalUserService } from '../msaluser.service'
import { of } from 'rxjs';
import { BlindSpotComponent } from './blindspot.component';


describe('BlindSpotComponent', () => {
  let component: BlindSpotComponent;
  let fixture: ComponentFixture<BlindSpotComponent>;
  let router: Router;
  let service: BlindSpotService;
  let msalService: MsalUserService;
  const blindQuestions = [
    { id: 1, adjectives: [] },
    { id: 2, adjectives: [] }
  ]
  const users = [
    { userid: 1, emailid: "" },
    { userid: 2, emailid: "" }
  ]


  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [BlindSpotComponent],
      imports: [RouterTestingModule, MatSnackBarModule,HttpClientTestingModule],
      providers: [
        BlindSpotService,MsalUserService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlindSpotComponent);
    component = fixture.componentInstance;
    service = TestBed.get(BlindSpotService);
    TestBed.get(MsalUserService);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create Blinspot service instance', inject([BlindSpotService], (injectSrvice: BlindSpotService) => {
    expect(injectSrvice).toBe(service);
  })
  );
});
