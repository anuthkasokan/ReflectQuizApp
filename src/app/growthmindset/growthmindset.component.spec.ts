import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { Router, ActivatedRoute } from '@angular/router'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { GrowthmindsetComponent } from './growthmindset.component';
import { GrowthmindsetService } from './growthmindset.service';
import { MsalUserService } from '../msaluser.service';

describe('GrowthmindsetComponent', () => {
  let component: GrowthmindsetComponent;
  let fixture: ComponentFixture<GrowthmindsetComponent>;
  let router: Router;
  let service;

  const questions = [
    { id: 1, question: "", answer: true },
    { id: 2, question: "", answer: true }
  ]

  beforeEach(async () => {
    service = jasmine.createSpyObj(['getgrowthmindsetquestions']);
    service.getgrowthmindsetquestions.and.returnValue(of(questions));

    TestBed.configureTestingModule({
      declarations: [GrowthmindsetComponent],
      imports: [RouterTestingModule, MatSnackBarModule, HttpClientTestingModule],
      providers: [
        GrowthmindsetService, MsalUserService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthmindsetComponent);
    component = fixture.componentInstance;
    service = TestBed.get(GrowthmindsetService);
    service = TestBed.get(MsalUserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
