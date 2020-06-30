import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatSnackBar } from '@angular/material/snack-bar';
import { SettingsService } from '../settings/settings.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

class EmailTemplate{
  id:number;
  type:string;
  subject:string;
  headerprefix:string;
  footer:string;
  body:string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

   
  constructor(private settingsService:SettingsService, private formBuilder:FormBuilder, private snackBar: MatSnackBar) { 
    
  }

  showFilter:boolean=false;
  showFeedback =false;
  showEmail =false;
  questions : any;
  emailTemplates =[];
  templateList =[];
  saveSettingsResponse:FormGroup;
  saveFeedBacks:FormGroup;
  emailTemplate = new EmailTemplate();
  showTemplate =false;
  ShowAddTemplate =false;
  admins =[];
  users =[];
  cols:string[] = ["Employee", "Question", "Assigned","Action"];
  datasource :any;
  adjectiveCount:any;
  coWorkerCount:any;
  showDdArea = true;
  showSettings=false;

  ngOnInit() {

    this.settingsService.getAdmins()
    .subscribe(
      (response: any) => {
        this.admins = response;
      });

    this.settingsService.getUsers()
    .subscribe(
      (response: any) => {
        console.log(response);
        this.users = response;
      });

    this.settingsService.getCountsFromBlindSpot()
    .subscribe(
      (response: any) => {
        let blindSpotCounts = response;
        this.adjectiveCount = blindSpotCounts.selectedadmaxcount;
        this.coWorkerCount = blindSpotCounts.selectedcwmaxcount;
      });


    this.templateList = this.settingsService.getTemplateList();
   
    this.saveSettingsResponse = this.formBuilder.group({
      type: new FormControl('feedback'),
      template:new FormControl(null),
      addtemplate: new FormControl(''),
      adjectiveCount:new FormControl(this.adjectiveCount),
      coWorkerCount:new FormControl(this.coWorkerCount),
      feedbacks:this.formBuilder.array([])
    });


    this.settingsService.getPendingFeedbackQuestions()
    .subscribe(
      (response: any) => {
        
        this.questions = response;
        this.datasource = new MatTableDataSource(this.questions);

        let feedbackQuestionsArray = this.formBuilder.array([]);
    
        this.questions.forEach(element => {
          
          let feedbackGroup = this.formBuilder.group({
              id:element.id,
              userid:element.userid,
              question:element.question,
              assigned:element.assigned
          });
        feedbackQuestionsArray.push(feedbackGroup);
       
        });
        this.showSettings=true;
        this.showFeedback = true;
        this.saveSettingsResponse = this.formBuilder.group({
          type: new FormControl('feedback'),
          template:new FormControl(null),
          addtemplate: new FormControl(''),
          adjectiveCount:new FormControl(this.adjectiveCount),
          coWorkerCount:new FormControl(this.coWorkerCount),
          feedbacks:feedbackQuestionsArray
        });


      });




}


onCLickView(){
  if(this.showFilter == true){
    this.showFilter = false;
  }
  else{
    this.showFilter= true;
  }
 
}

onTypeChange(event:any)
{
 if(event.value =="feedback")
 {
  this.showEmail=false;
  this.showFeedback =true;
 }
 else
 {
  this.showFeedback =false;
  this.showEmail=true;
 }


}

onTemplateChange(event:any)
{
  this.settingsService.getEmailTemplate(event.value)
  .subscribe(
    (response: any) => {
    console.log(response);
    
    this.emailTemplate=response;
    this.showTemplate = true;
  });


}

AddTemplate()
{
  this.emailTemplate = new EmailTemplate();
  this.ShowAddTemplate = true;
  this.showTemplate = true
}

saveTemplate(saveTemplate:FormGroup)
{
  let template  = new EmailTemplate();
  template.type = saveTemplate.value.template;
  template.headerprefix = document.getElementById("header").innerHTML;
  template.body = document.getElementById("body").innerHTML;
  template.footer = document.getElementById("footer").innerHTML;
  template.subject = document.getElementById("subject").innerHTML;


  if(template.headerprefix =="" ||template.subject =="" || template.body ==""|| template.footer == "")
  {
    this.snackBar.open("You have to fill all details","", {
      duration: 2000,panelClass: ['red-snackbar']
    });

    return;
  }

  this.settingsService.saveEmailTemplate(template)
  .subscribe((data:any) => {
    this.snackBar.open("Email template has been successfully updated.","", {
      duration: 2000,panelClass: ['green-snackbar']
    });
    this.ShowAddTemplate = false;
    this.showTemplate = false;
    this.emailTemplate = new EmailTemplate();
    this.showEmail = false;
    this.saveSettingsResponse.reset(); 
  });



}

createFeedback(): FormGroup {
  return this.formBuilder.group({
    id: 0,
    userid: '',
    question: '',
    assigned:''
  });
}

addFeedback()
{
    let newFeedback = this.saveSettingsResponse.get('feedbacks') as FormArray;
    newFeedback.push(this.createFeedback());
      this.questions.push({
        id: 0,
        userid: '',
        question: '',
        assigned:''
      });
      this.datasource = new MatTableDataSource(this.questions);

}

deleteFeedback(index:any)
{
  let sure = confirm("Are you sure ?");
  if(sure)
  {
    let oldFeedBack = this.saveSettingsResponse.get('feedbacks') as FormArray;
    oldFeedBack.removeAt(index);
    this.settingsService.deleteFeedback(this.questions[index].id)
    .subscribe(
      (response: any) => {
        this.questions.splice(index,1);
        this.datasource = new MatTableDataSource(this.questions);
        this.snackBar.open("Feedback has been removed.","", {
          duration: 2000,panelClass: ['green-snackbar']
        });
      });

  }

}

saveFeedbacks(saveFeedbackResponse:FormGroup)
{
  this.showSettings=false;
  this.settingsService.saveFeedbacks(saveFeedbackResponse.value.feedbacks)
  .subscribe(
    (response: any) => {
      this.showSettings=true;
      this.snackBar.open("Feedback list has been updated.","", {
        duration: 2000,panelClass: ['green-snackbar']
      });
    });
  
}

onFileComplete(event:any)
{
  console.log(event);
  this.snackBar.open("File has been successfully uploaded","", {
    duration: 2000,panelClass: ['green-snackbar']
  });
  
}

onShowDdAreaChange(){
  console.log(this.showDdArea);
}
}
