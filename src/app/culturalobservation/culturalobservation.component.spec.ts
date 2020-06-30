import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing'
import {Router,ActivatedRoute} from '@angular/router'
import { MatSnackBarModule  } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { CulturalobservationComponent } from './culturalobservation.component';
import { CulturalobservationService } from './culturalobservation.service';

describe('CulturalobservationComponent', () => {
  let component: CulturalobservationComponent;
  let fixture: ComponentFixture<CulturalobservationComponent>;
  let router: Router;
  let service;

  const questions = [
    {id: 1, question : "",answer : true},
    {id: 2, question : "",answer : true}
  ]

  beforeEach(async(() => {
    service = jasmine.createSpyObj(['getCulturalobservationquizService']);
    service.getCulturalobservationquizService.and.returnValue((questions));

    TestBed.configureTestingModule({
      declarations: [ CulturalobservationComponent ],  
      imports: [RouterTestingModule,MatSnackBarModule],   
      providers: [
        {provide: Router, useValue: {navigate: () => {}}},
        {provide: ActivatedRoute, useValue: {
        }},
        {provide: CulturalobservationService, useValue: service}
      ]   
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CulturalobservationComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CulturalobservationService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
