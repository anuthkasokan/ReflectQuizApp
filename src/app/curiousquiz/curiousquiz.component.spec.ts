import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { of, Subscriber } from 'rxjs';
import { CuriousquizComponent } from './curiousquiz.component';
import { CuriosityService } from './curiousity.service';
import { MsalUserService } from '../msaluser.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CuriousquizComponent', () => {

  let component: CuriousquizComponent;
  let fixture: ComponentFixture<CuriousquizComponent>;
  let service: CuriosityService;

  const questions = [
    { id: 1, question: "", answer: true,yes : true },
    { id: 2, question: "", answer: true }
  ]
  const answer = [
    { id: 1, question: "", answer: true,score:1 },
    { id: 2, question: "", answer: true,score:1 }
  ]
  const formBuilder: FormBuilder = new FormBuilder();
  const questionaire = new FormArray([]);
  const expectedquestionaire = new FormArray([new FormControl(questions), new FormControl(questions)]);

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CuriousquizComponent],
      imports: [RouterTestingModule, MatSnackBarModule, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        CuriosityService, MsalUserService, { provide: FormBuilder, useValue: formBuilder }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuriousquizComponent);
    component = fixture.componentInstance;
    component.saveCuriousResponse = formBuilder.group({
      questionaire: expectedquestionaire
    });
    service = TestBed.get(CuriosityService);
    TestBed.get(MsalUserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOninit method should call curious service', () => {
    let spy = spyOn(service, 'getcuriosityquestions').and.returnValue(of())
    component.ngOnInit();
    expect(spy).toHaveBeenCalled()
  });

  it('addQuestions method should map questions', () => {
    var questions = [{ id: 1, answer: "answer", question: "question", isHidden: true }]
    component.addQuestions(questions);
    expect(component.questions[1].id).toEqual(1)
  });

  it('onSubmit method should map userResponse where index equal to 0 and response value not null', () => {
    let index = 0
    component.onSubmit(component.saveCuriousResponse, index);
    expect(component.questions[0].isHidden).toEqual(true)
  });

  // it('onSubmit method should call storeuserResponse method if index is greater than zero', () => {
  //   component.questions = questions;
  //   console.log(component);
  //   console.log(component.storeUserResponse);
    
  //   let spy = spyOn(component, 'storeUserResponse').and.callFake(function () { })
  //   component.onSubmit(component.saveCuriousResponse, 1);
  //   expect(component.storeUserResponse).toHaveBeenCalled()
  // });

  it('goPrevious method should map question hiding for answer yes', () => {
    let index = 1
    component.questions = questions;
    component.goPrevious(component.saveCuriousResponse,index);
    expect(component.questions[index].isHidden).toEqual(true)
  });
  

  it('stroreUserResponse Method should map the user response', () => {
    let index = 1
    component.questions = questions;
    component.storeUserResponse(component.saveCuriousResponse,index);
    expect(component.score).toEqual(0)
  });
  class userResponse{
    userid: string;
    questionid: number;
    answer: boolean;
    score: number;
  }
  it('stroreUserResponse Method should map the user response muliple response available', () => {
    let index = 1
    component.userResponses = [{userid: "1",questionid: 1,answer: true,score: 1},
    {userid: "1",questionid: 1,answer: true,score: 1}]
    component.questions = questions;
    component.storeUserResponse(component.saveCuriousResponse,index);
    expect(component.score).toEqual(0)
  });

  // it('stroreUserResponse Method should map the user response for null response', () => {
  //   let index = 1
  //   component.questions = questions;
  //   component.userResponses = null;
  //   component.storeUserResponse(component.saveCuriousResponse,index);
  //   expect(true).toEqual(true)
  // });

  it('reTakeQuiz Method should reset the reponse and show the first page', () => {    
    component.retakeQuiz();
    expect(component.userResponses).toEqual([])
  });

  // it('onSubmit method should return validation if no response provided', () => {
  //   component.saveCuriousResponse.value.questionaire[1] = null;
  //   let mockSnackbar = jasmine.createSpy('open').and.callFake(function () { })
  //   // let spy = spyOn(component,'snackBar').and.callFake(function(){})
  //   component.onSubmit(component.saveCuriousResponse, 1);
  //   expect(mockSnackbar).toHaveBeenCalled()
  // });

});
