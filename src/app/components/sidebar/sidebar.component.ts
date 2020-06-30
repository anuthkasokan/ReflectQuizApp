import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../navbar/notification.service';
import { MsalUserService } from 'app/msaluser.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ADMINROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: 'icon-size' },
    { path: '/curiousity', title: 'Curiosity Quiz',  icon:'voicemail', class: 'icon-size' },
    { path: '/growthmindset', title: 'Growth Mindset Quiz',  icon:'trending_up', class: 'icon-size' },
    { path: '/maketimeforme', title: 'Making Time For Me Quiz',  icon:'access_time', class: 'icon-size' },
    { path: '/productivityzone', title:'Productivity Zone Quiz', icon:'timeline',class: 'icon-size'},
    { path: '/continuouslearning', title:'Continuous Learning Quiz', icon:'play_arrow',class: 'icon-size'},
    { path: '/storytelling', title:'Story Telling For Impact Quiz', icon:'menu_book', class:'icon-size'},
    { path: '/reflectiontool', title:'Reflection Tool Quiz', icon: 'flip_to_front', class:'icon-size'},
    { path: '/blindspot', title:'Blind Spot Quiz', icon: 'visibility_off', class:'icon-size'},
    { path: '/learningmyths', title:'Learning Myths Quiz', icon: 'local_library', class:'icon-size'},
    { path: '/cultureobservation', title:'Culture Observation Quiz', icon: 'people_alt', class:'icon-size'},
    { path: '/reports', title:'Reports', icon: 'notes', class:'icon-size'}
];
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: 'icon-size' },
  { path: '/curiousity', title: 'Curiosity Quiz',  icon:'voicemail', class: 'icon-size' },
  { path: '/growthmindset', title: 'Growth Mindset Quiz',  icon:'trending_up', class: 'icon-size' },
  { path: '/maketimeforme', title: 'Making Time For Me Quiz',  icon:'access_time', class: 'icon-size' },
  { path: '/productivityzone', title:'Productivity Zone Quiz', icon:'timeline',class: 'icon-size'},
  { path: '/continuouslearning', title:'Continuous Learning Quiz', icon:'play_arrow',class: 'icon-size'},
  { path: '/storytelling', title:'Story Telling For Impact Quiz', icon:'menu_book', class:'icon-size'},
  { path: '/reflectiontool', title:'Reflection Tool Quiz', icon: 'flip_to_front', class:'icon-size'},
  { path: '/blindspot', title:'Blind Spot Quiz', icon: 'visibility_off', class:'icon-size'},
  { path: '/learningmyths', title:'Learning Myths Quiz', icon: 'local_library', class:'icon-size'},
  { path: '/cultureobservation', title:'Culture Observation Quiz', icon: 'people_alt', class:'icon-size'}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private notificationService:NotificationService,private msalUserService:MsalUserService) { }

  ngOnInit() {

    this.menuItems =ROUTES.filter(menuItem => menuItem);
    let userdetails = this.msalUserService.getCurrentUserInfo();
    this.notificationService.getRoleByUser(userdetails["userName"])
    .subscribe(
      (response: any) => {
         let userDetail = response;
         this.menuItems = userDetail[0].role=="Admin"? ADMINROUTES.filter(menuItem => menuItem):
        ROUTES.filter(menuItem => menuItem);

      });

    
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
