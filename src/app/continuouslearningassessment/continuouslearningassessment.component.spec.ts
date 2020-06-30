import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing'
import { of } from 'rxjs';
import {Router,ActivatedRoute} from '@angular/router'
import { MatSnackBarModule  } from '@angular/material/snack-bar';
import { ContinuousLearningAssessmentComponent } from './continuouslearningassessment.component';
import { ContinuousLearningAssessmentService } from './continuouslearningassessment.service'

describe('ContinuousLearningAssessmentComponent', () => {
  let component: ContinuousLearningAssessmentComponent;
  let fixture: ComponentFixture<ContinuousLearningAssessmentComponent>;
  let service;
  let router: Router;

  const questions = [
    {id: 1, question : "",answer : true},
    {id: 2, question : "",answer : true}
  ]

  beforeEach(async() => {
    service = jasmine.createSpyObj(['getcontinuouslearningassessmentquestions']);
    service.getcontinuouslearningassessmentquestions.and.returnValue(of(questions));

    TestBed.configureTestingModule({
      declarations: [ ContinuousLearningAssessmentComponent ],
      imports: [RouterTestingModule,MatSnackBarModule],   
      providers: [
        {provide: Router, useValue: {navigate: () => {}}},
        {provide: ActivatedRoute, useValue: {
        }},
        {provide: ContinuousLearningAssessmentService, useValue: service}
      ] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinuousLearningAssessmentComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ContinuousLearningAssessmentService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
