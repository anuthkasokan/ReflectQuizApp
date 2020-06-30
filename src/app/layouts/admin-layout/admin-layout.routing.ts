import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import {CuriousquizComponent} from '../../curiousquiz/curiousquiz.component';
import {GrowthmindsetComponent} from '../../growthmindset/growthmindset.component';
import { MaketimeformeComponent } from 'app/maketimeforme/maketimeforme.component';
import { ProductivityZoneComponent } from 'app/productivityzone/productivityzone.component';
import { ContinuousLearningAssessmentComponent } from 'app/continuouslearningassessment/continuouslearningassessment.component';
import { StoryTellingComponent } from 'app/storytelling/storytelling.component';
import { ReflectionToolComponent } from 'app/reflectiontool/reflectiontool.component';
import { BlindSpotComponent } from 'app/blindspot/blindspot.component';
import { LearningmythsComponent } from 'app/learningmyths/learningmyths.component';
import { SettingsComponent } from 'app/settings/settings.component';
import { ReportsComponent } from 'app/reports/reports.component';
import { CulturalobservationComponent } from 'app/culturalobservation/culturalobservation.component';
import { MsalGuard } from '@azure/msal-angular'


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent ,  canActivate: [MsalGuard]},
    { path: 'user-profile',   component: UserProfileComponent ,  canActivate: [MsalGuard]},
    { path: 'curiousity', component: CuriousquizComponent,  canActivate: [MsalGuard] },
    { path: 'growthmindset', component: GrowthmindsetComponent ,  canActivate: [MsalGuard]},
    { path: 'maketimeforme', component: MaketimeformeComponent ,  canActivate: [MsalGuard]},
    { path: 'productivityzone', component: ProductivityZoneComponent,  canActivate: [MsalGuard] },
    { path: 'continuouslearning', component: ContinuousLearningAssessmentComponent ,  canActivate: [MsalGuard]},
    { path: 'storytelling', component: StoryTellingComponent,  canActivate: [MsalGuard]},
    { path: 'reflectiontool', component: ReflectionToolComponent ,  canActivate: [MsalGuard]},
    { path: 'blindspot', component:BlindSpotComponent ,  canActivate: [MsalGuard]},
    { path: 'learningmyths', component:LearningmythsComponent,  canActivate: [MsalGuard] },
    { path: 'cultureobservation', component:CulturalobservationComponent ,  canActivate: [MsalGuard]},
    { path: 'settings', component:SettingsComponent ,  canActivate: [MsalGuard]},
    { path: 'reports', component:ReportsComponent,  canActivate: [MsalGuard]}
];
