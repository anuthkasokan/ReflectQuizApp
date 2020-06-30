import { ComponentFixture, TestBed,inject } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing'
import {Router,ActivatedRoute} from '@angular/router'
import { MatSnackBarModule  } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { StoryTellingComponent } from './storytelling.component';
import { StoryTellingService } from './storytelling.service';
import { MsalUserService } from 'app/msaluser.service';
import { FormBuilder } from '@angular/forms';

describe('StoryTellingComponent', () => {
  let component: StoryTellingComponent;
  let service: StoryTellingService;
  let fixture: ComponentFixture<StoryTellingComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [StoryTellingComponent],
      imports: [RouterTestingModule, MatSnackBarModule,HttpClientTestingModule],
      providers: [
        StoryTellingService,MsalUserService,FormBuilder
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryTellingComponent);
    component = fixture.componentInstance;
    service = TestBed.get(StoryTellingService);
    TestBed.get(MsalUserService);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create Story telling service instance', inject([StoryTellingService], (injectSrvice: StoryTellingService) => {
    expect(injectSrvice).toBe(service);
  })
  );
});
