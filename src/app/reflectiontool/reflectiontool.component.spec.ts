import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing'
import {Router,ActivatedRoute} from '@angular/router'
import { MatSnackBarModule  } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ReflectionToolComponent } from './reflectiontool.component';
import { ReflectionToolService } from './reflectiontool.service';
import { FormBuilder } from '@angular/forms';
import { MsalUserService } from '../msaluser.service';

describe('ReflectionToolComponent', () => {
  let component: ReflectionToolComponent;
  let service: ReflectionToolService;
  let fixture: ComponentFixture<ReflectionToolComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ReflectionToolComponent],
      imports: [RouterTestingModule, MatSnackBarModule,HttpClientTestingModule],
      providers: [
        ReflectionToolService,MsalUserService,FormBuilder
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReflectionToolComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ReflectionToolService);
    TestBed.get(MsalUserService);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create Maketimeforme service instance', inject([ReflectionToolService], (injectSrvice: ReflectionToolService) => {
    expect(injectSrvice).toBe(service);
  })
  );
});
