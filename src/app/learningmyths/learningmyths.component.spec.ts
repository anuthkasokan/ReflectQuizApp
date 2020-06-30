import { ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing'
import {Router,ActivatedRoute} from '@angular/router'
import { MatSnackBarModule  } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MsalUserService } from '../msaluser.service';
import { LearningmythsComponent } from './learningmyths.component';
import { LearningmythsService } from './learningmyths.service';

describe('LearningmythsComponent', () => {
  let component: LearningmythsComponent;
  let fixture: ComponentFixture<LearningmythsComponent>;
  let router: Router;
  let service;

  const questions = [
    {id: 1, question : "",answer : true},
    {id: 2, question : "",answer : true}
  ]

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [LearningmythsComponent],
      imports: [RouterTestingModule, MatSnackBarModule,HttpClientTestingModule],
      providers: [
        LearningmythsService,MsalUserService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningmythsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(LearningmythsService);
    service = TestBed.get(MsalUserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
