import { Component, OnInit,ViewChild } from '@angular/core';
import { ReportsService } from 'app/reports/reports.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable'

export interface ReportData {
  question: string;
  answer:string;
  type:string;
}

export interface CultureObservationReportData {
  question: string;
  answer:string;
  type:string;
  Date:string;
  MeetingTitle:string;
  Scoring:string;
  Comments:string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit  { 
  displayedColumns: string[] = ['sl_no','question', 'answer','attempt'];
  dataSource: MatTableDataSource<ReportData>;

  cultureDisplayedColumns: string[] = ['sl_no','question','Date','MeetingTitle','Scoring','Comments'];
  cultureDataSource: MatTableDataSource<CultureObservationReportData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  blindSpotTypeName = "bs";
  cutureObservationTypeName = "cot";
  curiosityTypeName = "mc";
  growthMindsetTypeName = "gm";
  makingTimeForMeTypeName = "mtm";
  continuousLearningTypeName = "cla";
  LearningMythsTypeName = "lm";
  StoryTellingTypeName = "st";
  reflectionToolTypeName = "rt";
  productivityZoneTypeName = "pz";
  details:any;
  users=[];
  quiz=[];
  attempts=[];
  saveReportResponse:FormGroup;
  userSelect:FormControl;
  quizSelect:FormControl;
  attemptSelect:FormControl;
  quizText:FormControl;
  displayText:string;
  showDisplayText:boolean;
  showQuizList:boolean;
  showattemptList:boolean;
  showTable:boolean;
  showBlindTable:boolean;
  showCultureObservationTable:boolean;
  showReflectionTable:boolean;
  showDownloadButton:boolean;
  userSelectValue:string;
  quizSelectValue:number;
  attemptSelectValue:number;
  cultureObservationtoolId = 5;

  CurrentDate : string = new Date().toDateString();

  constructor(private reportService:ReportsService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {    
    this.showQuizList = false;
    this.showattemptList = false;
    this.showTable = false;
    this.showBlindTable = false;
    this.showCultureObservationTable = false;
    this.showDownloadButton = false;
    this.showDisplayText = true;
    this.displayText = "Please Select User";
    this.reportService.getUserList()
    .subscribe(
      (response: any[]) => {

        response.forEach(u => {
          this.users.push(u);      
        })
      });
     
    
    this.reportService.getQuizes()
    .subscribe(
      (response: any[]) => {

        this.quiz = response;
      });
    this.getAttemptList().forEach(a => {
      this.attempts.push(a);
    })
    
  }

  onSelectUser(event: any){
    
    this.showQuizList = true;
    this.quizSelectValue=null;
    this.attemptSelectValue=null;
    this.displayText = "Please select Quiz";  
  }

  onSelectQuiz(event: any){
    this.showattemptList = true;
    this.attemptSelectValue=null;
  }

  onSelectAttempt(event:any){

    this.bindDattable()
  }

  bindDattable(){        
 
    // Assign the data to the data source for the table to render
      this.reportService.getReportData(this.userSelectValue,this.quizSelectValue,this.attemptSelectValue)
      .subscribe(
        (response: any[]) => {
  
          this.details = response;
          this.dataSource = new MatTableDataSource(this.details);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort; 
                 
    if(this.details.length > 0) {
      this.showDisplayText = false;
      if(this.details[0].type === this.blindSpotTypeName){
        this.showBlindTable =true;
        this.showTable = false;
        this.showReflectionTable = false;
        this.showCultureObservationTable = false;
        this.showattemptList = true;        
      }
      else if(this.details[0].type === this.cutureObservationTypeName){
        this.showCultureObservationTable = true;
        this.showBlindTable =false;
        this.showTable = false;
        this.showReflectionTable = false;
        this.showattemptList = true;
      }
      else if(this.details[0].type === this.reflectionToolTypeName)
      {
        this.showReflectionTable = true;
        this.showCultureObservationTable = false;
        this.showBlindTable =false;
        this.showTable = false;
        this.showattemptList = true;
      }
      else{
        this.showReflectionTable = false;
        this.showTable = true;
        this.showBlindTable =false;
        this.showCultureObservationTable = false;
        this.showattemptList = true;
      }
    }
    else{
      this.showDisplayText = true;
      this.showTable = false;
      this.showBlindTable =false;
      this.showCultureObservationTable = false;
      if(this.quizSelectValue === undefined){
        this.displayText = "Please select Quiz";   
      } 
      else{
        this.displayText = "No data available...";
      }
    }
        });
     


  }

  
  getAttemptList(){
    var attempts = [
      {id:1,attempt:"Latest Attempt"},
      {id:2,attempt:"Previous Attempt"}
    ]
    return attempts;
  }

  exportPDF(){
    var doc = new jsPDF()
    var userName = this.users.filter(u => u.id === this.userSelectValue)[0].name;
    var quizName = this.quiz.filter(q => q.id === this.quizSelectValue)[0].qzname;
    var attempt = "";
    if(this.showattemptList){
      attempt = "-" + this.attempts.filter(a => a.id === this.attemptSelectValue)[0].attempt;
    }
    var fileTitle = userName + '-' + quizName + attempt;
    const date =  this.CurrentDate;
    doc.text(fileTitle, 14, 15);
    doc.setFontSize(7);
    doc.text(date, 14, 19);
    doc.autoTable({ 
      html : '#reportId',
      startY: 22

    })
 
    doc.save('QuizReport.pdf')
  }
}
