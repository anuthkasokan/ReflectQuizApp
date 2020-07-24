import { Component, OnInit } from '@angular/core';
import { CulturalobservationService } from './culturalobservation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
class question {
  id: number;
  question: string;
 
  }
  class userResponse{
    userId: string;
    questionid: number;
    topic: string;
    date :string;
    meetingtitle :string;
    scoring:string;
    score:number;
    comments:string ;
    
  }
@Component({
  selector: 'app-culturalobservation',
  templateUrl: './culturalobservation.component.html',
  styleUrls: ['./culturalobservation.component.css']
})
export class CulturalobservationComponent implements OnInit {
 

  constructor(private culturalobservationserviceService: CulturalobservationService,private snackBar: MatSnackBar,
    private formBuilder:FormBuilder) { }
  questions=[];
  question :any;
  culturalobservationResponse: FormGroup;
  userResponses = new Array<userResponse>();
  disableOption = false;
  showScore=false;
  showQuestions =false;
  finalScore=0;
  showIntro =true;

  ngOnInit(): void {
    this.culturalobservationserviceService.getCulturalobservationquizService().subscribe((res:any)=>{
      res.forEach(element => {
        this.question = new question();
        this.question.id=element.id;
        this.question.question = element.question;
      this.questions.push(this.question);
          
      let questionaire =this.formBuilder.array([]);

      this.questions.forEach(element => {
          let observationGroup = this.formBuilder.group({
            date :new FormControl(""),
            meetingtitle :new FormControl(""),
            scoring: new FormControl(""),
            comments:new FormControl("") 
          });
          questionaire.push(observationGroup);
              
      });
          
   
      
      this.culturalobservationResponse = this.formBuilder.group({
        questionaire:questionaire
      });

      });
    });


  
  }
  onSubmit(culturalobservationResponse:FormGroup)
  {
    
    if (!this.isNull(culturalobservationResponse.value.questionaire) && culturalobservationResponse.status.toLowerCase() =="valid")
    {

      let i=0;
      console.log(culturalobservationResponse);
      
      culturalobservationResponse.value.questionaire.forEach(element => {
        let response= new userResponse()
        response.userId=localStorage.getItem("user");
        response.topic= element.topic;
        response.questionid =this.questions[i].id;
        response.scoring = element.scoring;

        if(element.scoring =="Rarely")
        {
          this.finalScore += 1;
          response.score=1;
        }

        if(element.scoring =="Some")
        {
          this.finalScore += 3;
          response.score=3;
        }

        if(element.scoring =="Frequently")
        {
          this.finalScore +=5
          response.score=5;
        }

        response.meetingtitle = element.meetingtitle;
        response.date = element.date;
        response.comments = element.comments;

        this.userResponses.push(response);
        i++;
      });
  
    this.culturalobservationserviceService.submitculturalobervationresponse(this.userResponses);
   


    this.snackBar.open("Your response has been successfully saved.","", {
      duration: 2000,panelClass: ['green-snackbar']
    });
    window.scrollTo(0,document.body.scrollHeight);

    this.showQuestions =false;
    this.showScore=true;
    this.showIntro = false;

    }
    else{
      this.snackBar.open("Please add your response.","", {
        duration: 2000,panelClass: ['red-snackbar']
      });
    }
  }

  retakeQuiz()
  {
    this.culturalobservationResponse.reset();
    this.showScore=false;
    this.showQuestions =false;
    this.showIntro = true;
    this.userResponses = [];
  }

  takeQuiz()
  {
    this.showScore=false;
    this.showQuestions =true;
    this.showIntro = false;
  }

  isNull = function (element){
    return element.join().replace(/,/g,'').length === 0;
};

  
}
