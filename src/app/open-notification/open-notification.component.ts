
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog' ;
import { OpenNotificationService } from '../open-notification/open-notification.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

class Notification{
  notificationId:number;
  question:string;
  notificationType:string;
  userid:string;
  feedback:string;
}

export interface InputData{
  id:number;
  notification:string;
  notificationType:string;
  userid:string;
}


class userResponse{
  userid:string;
  attemptId:number;
  selectedAdjectives:Array<string>;
  }

@Component({
    selector: 'app-open-notification',
    templateUrl: './open-notification.component.html',
    styleUrls: ['./open-notification.component.css']
  })
  export class OpenNotificationComponent implements OnInit{

    constructor( public dialogRef: MatDialogRef<OpenNotificationComponent>,
      @Inject(MAT_DIALOG_DATA) public data:InputData , private notificationService: OpenNotificationService, private snackBar:MatSnackBar) {}

      saveFeedback :FormGroup;
      adjectives:any;
      notification:Notification;
      selectedAdjectives=[];
      showBlindSpot=false;
      disableAdjective = false;

   
ngOnInit(){
  this.notification = new Notification();
  this.notification.notificationId=this.data.id;
  this.notification.notificationType=this.data.notificationType;
  this.notification.question=this.data.notification;
  this.notification.userid=this.data.userid;


  if(this.data.notificationType == 'blindspot')
  {
    this.notificationService.getblindspotquestions()
    .subscribe(
      (response: any) => {
      
        this.adjectives = response;
        this.showBlindSpot=true;
      },
      (error) => console.log(error)
    );
   
  }


  this.saveFeedback = new FormGroup({
    feedback:new FormControl('')
  });

 
}

onClick(adjective:any)
{

  let flag= false;
  if(!this.isNull(this.selectedAdjectives))
  {
    for (let index = 0; index < this.selectedAdjectives.length; index++) {
      if(this.selectedAdjectives[index] == adjective)
      {
        flag=true;
        this.selectedAdjectives.splice(index,1);
        break;
      }
   
    }
    if(!flag)
    {
      this.selectedAdjectives.push(adjective);
      document.getElementById(adjective+"_n").classList.remove("btn-info");
      document.getElementById(adjective+"_n").classList.add("btn-warning");

    }
    else{
      document.getElementById(adjective+"_n").classList.remove("btn-warning");
      document.getElementById(adjective+"_n").classList.add("btn-info");
    }
 
  }
  else{
    this.selectedAdjectives.push(adjective);
    document.getElementById(adjective+"_n").classList.remove("btn-info");
    document.getElementById(adjective+"_n").classList.add("btn-warning");

  }

  if(this.selectedAdjectives.length == this.adjectives.selectedadmaxcount)
  {
    this.disableAdjective =true;
  }
  else{
    this.disableAdjective =false;
  }
 
}  


submitNotification(saveNotification:FormGroup){

  
  if(this.notification.notificationType == 'blindspot')
  {
    if(this.isNull(this.selectedAdjectives))
    {
      this.snackBar.open("Please select adjectives and co workers.","", {
        duration: 2000,panelClass: ['red-snackbar']
      });
      return;
    }
    else if(this.selectedAdjectives.length < this.adjectives.selectedadmaxcount)
    {
      this.snackBar.open("Please select "+this.adjectives.selectedadmaxcount+" adjectives about yourself","", {
        duration: 2000,panelClass: ['red-snackbar']
      });
      return;
    }
  
    let response = new userResponse();
    response.userid = localStorage.getItem("user");
    response.attemptId = this.notification.notificationId;
    response.selectedAdjectives= this.selectedAdjectives;

    this.notificationService.saveBlindSpot(response)
    .subscribe(
      (response: any) => {
      
        this.snackBar.open("Feedback has been saved.",'', {
          duration: 2000,panelClass: ['green-snackbar']
        });
        this.dialogRef.close(0);
      
      },
      (error) => console.log(error)
    );
    console.log(response);
    
  }
  else{
    if(saveNotification.value.feedback == '')
    {
      this.snackBar.open("Please add reply",'', {
        duration: 2000,panelClass: ['red-snackbar']
      });
      return;
    }
    let feedback:any={
      userid :localStorage.getItem("user"),
      feedbackid: this.notification.notificationId,
      feedback:saveNotification.value.feedback

    }
    this.notificationService.saveFeedback(feedback)
    .subscribe(
      (response: any) => {
          this.snackBar.open("Your reply has been sent.","", {
              duration: 2000,panelClass: ['green-snackbar']
            });
      });
    console.log(this.notification);
    
  }

  this.dialogRef.close(0);

}

cancelDialog()
{
  for (let index = 0; index < this.selectedAdjectives.length; index++) {
    document.getElementById(this.selectedAdjectives[index]+"_n").classList.remove("btn-warning");
    document.getElementById(this.selectedAdjectives[index]+"_n").classList.add("btn-info");
  }
  this.selectedAdjectives =[];
  this.disableAdjective=false;
  this.dialogRef.close(1);
}

isNull = function (element){
  return element.join().replace(/,/g,'').length === 0;
};

}