import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CuriousquizComponent } from '../../curiousquiz/curiousquiz.component';
import { CuriosityService } from '../../curiousquiz/curiousity.service';
import { GrowthmindsetComponent } from '../../growthmindset/growthmindset.component';
import { GrowthmindsetService } from '../../growthmindset/growthmindset.service';
import { MatRadioModule } from '@angular/material/radio'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MakeTimeForMeService } from 'app/maketimeforme/maketimeforme.service';
import { MaketimeformeComponent } from '../../maketimeforme/maketimeforme.component';
import { ProductivityZoneService } from '../../productivityzone/productivityzone.service';
import { ProductivityZoneComponent } from '../../productivityzone/productivityzone.component';
import { ContinuousLearningAssessmentComponent } from '../../continuouslearningassessment/continuouslearningassessment.component';
import { ContinuousLearningAssessmentService } from '../../continuouslearningassessment/continuouslearningassessment.service';
import { StoryTellingComponent } from '../../storytelling/storytelling.component';
import { StoryTellingService } from '../../storytelling/storytelling.service';
import { ReflectionToolComponent } from 'app/reflectiontool/reflectiontool.component';
import { ReflectionToolService } from 'app/reflectiontool/reflectiontool.service';
import { BlindSpotComponent } from 'app/blindspot/blindspot.component';
import { BlindSpotService } from 'app/blindspot/blindspot.service';
import { LearningmythsComponent } from 'app/learningmyths/learningmyths.component';
import { LearningmythsService} from 'app/learningmyths/learningmyths.service';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { SettingsComponent } from 'app/settings/settings.component';
import { SettingsService } from 'app/settings/settings.service';
import { MatTableModule } from '@angular/material/table';
import { ReportsComponent } from 'app/reports/reports.component';
import { ReportsService } from 'app/reports/reports.service';
import { DashboardService } from 'app/dashboard/dashboard.service';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md'
import { NgChartjsModule } from 'ng-chartjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { MaterialFileUploadComponent } from '../../material-file-upload/material-file-upload.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { AdminLayoutService } from './admin-layout.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CulturalobservationComponent } from 'app/culturalobservation/culturalobservation.component';
import { CulturalobservationService } from 'app/culturalobservation/culturalobservation.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    MatRadioModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatTableModule,
    ChartsModule,
    WavesModule,
    NgChartjsModule,
    MatPaginatorModule,
    MatSortModule,
    RoundProgressModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    CuriousquizComponent,
    GrowthmindsetComponent,
    MaketimeformeComponent,
    ProductivityZoneComponent,
    ContinuousLearningAssessmentComponent,
    StoryTellingComponent,
    ReflectionToolComponent,
    BlindSpotComponent,
    SettingsComponent,
    LearningmythsComponent,
    ReportsComponent,
    MaterialFileUploadComponent,
    CulturalobservationComponent
  ],
  providers: [CuriosityService,GrowthmindsetService,MakeTimeForMeService,
              ProductivityZoneService,ContinuousLearningAssessmentService,
              StoryTellingService,ReflectionToolService,BlindSpotService,
              SettingsService,LearningmythsService,DashboardService,ReportsService,
              CulturalobservationService,MatDatepickerModule, MatNativeDateModule,AdminLayoutService
             ]

})

export class AdminLayoutModule {}
