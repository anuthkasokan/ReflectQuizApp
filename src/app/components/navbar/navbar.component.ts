import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { OpenNotificationComponent } from '../../open-notification/open-notification.component';
import { MatDialog } from '@angular/material/dialog';
import { MsalUserService } from 'app/msaluser.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    notificationCount=0;
    notifications:Array<any>;
    initialNotificationCount=0;
    username="";
    userId="";
    showForAdmin =false;

    @HostListener("window:scroll", [])

    onScroll(): void {
        if ((document.getElementById("navbarNotificationList")?.scrollHeight) >= document.getElementById("navbarNotificationList")?.offsetHeight -1) {
            
            
            this.initialNotificationCount +=5;
        if(this.notificationCount >= this.initialNotificationCount)
        {
            this.notificationService.getNotifications(this.userId,this.initialNotificationCount,5)
            .subscribe(
                (response: any[]) => {
  
                    let newNotifications =response;
                    if(newNotifications?.length >0)
                    {
                        newNotifications.forEach(element => {
                            this.notifications.push(element);
                        });
                        console.log(this.notifications);
                    }
                  },
                  (error) => console.log(error)
              );

        }
            
        }
    }

    constructor(location: Location,  private element: ElementRef, private router: Router,
        private notificationService:NotificationService, private dialog: MatDialog, private msalservice:MsalUserService ) {
      this.location = location;
          this.sidebarVisible = false;
    }

    ngOnInit(){

      let userdetails = this.msalservice.getCurrentUserInfo();    
      this.username = userdetails["name"].split(' ')[0];

      this.notificationService.getRoleByUser(userdetails["userName"])
  .subscribe(
    (response: any) => {
       let userDetail = response;
       this.userId = userDetail[0].userId;
        if(userDetail[0].role=="Admin")
        {
            this.showForAdmin =true;
        }
        this.notificationService.getNotifications(this.userId,this.initialNotificationCount,5)
        .subscribe(
          (response: any[]) => {
              this.notifications = response;
  
          });
  
        this.notificationService.getNotificationsCount(this.userId)
        .subscribe(
          (response: any) => {
              this.notificationCount =  response;
  
          });
    });
    


      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.router.events.subscribe((event) => {
        this.sidebarClose();
         var $layer: any = document.getElementsByClassName('close-layer')[0];
         if ($layer) {
           $layer.remove();
           this.mobile_menu_visible = 0;
         }
     });
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function() {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function() {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            }else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function() {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function() { //asign a function
              body.classList.remove('nav-open');
              this.mobile_menu_visible = 0;
              $layer.classList.remove('visible');
              setTimeout(function() {
                  $layer.remove();
                  $toggle.classList.remove('toggled');
              }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }

    openNotification(notification:any)
    {
        const dialogRef = this.dialog.open(OpenNotificationComponent, {

            data: {id:notification.id, userId:notification.userId, notification:notification.question,notificationType:notification.type}
          });
    
    
    }

    signOut()
    {
        this.msalservice.logout();
    }
}
