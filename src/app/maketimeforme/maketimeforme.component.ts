import { Component, OnInit, Output } from '@angular/core';
import { FormGroup,FormControl,FormArray } from '@angular/forms';
import { MakeTimeForMeService } from './maketimeforme.service';
import { MatSnackBar } from '@angular/material/snack-bar';

 class question {
  id: number;
  question: string;
  isHidden:boolean;
  scores:{
        always:number;
        often:number;
        sometimes:number;
        rarely:number;
        never:number;
  };
  always:boolean;
  often:boolean;
  sometimes:boolean;
  rarely:boolean;
  never:boolean;
}

class makeTimeForMeResponse{
  userId: string;
  questionid: number;
  answer: string;
  score:number;
}

@Component({
  selector: 'app-maketimeforme',
  templateUrl: './maketimeforme.component.html',
  styleUrls: ['./maketimeforme.component.css']
})
export class MaketimeformeComponent implements OnInit {

  constructor(private makeTimeForme: MakeTimeForMeService,private snackBar: MatSnackBar) { }

  questions=[];
  question :any;
  saveUserResponse: any;
  responseForEachQuestion: any;
  saveMakeTimeForMeResponse: FormGroup;
  currentQuestionId:any;
  respondedTrue = false;
  respondedFalse = false;
  questionsAreHidden = true;
  score =0;
  makeTimeForMeResponses = new Array<makeTimeForMeResponse>();
  showScore = false;
  finalScore:string;



  ngOnInit(): void {
    this.makeTimeForme.getmaketimeformequestions().subscribe((data:any) => {
      data.forEach(element => {
        this.question = new question();
        this.question.id=element.id;
        this.question.question = element.question;
        this.question.isHidden =true;
        this.question.scores = element.scores;
        this.questions.push(this.question);
    
      });

      this.questions[0].isHidden=false;
      let questionaire = new FormArray([]);

      this.questions.forEach(element => {
        questionaire.push(new FormControl(null));
      });

      this.saveMakeTimeForMeResponse =new FormGroup({
        questionaire: questionaire,
      });
      this.questionsAreHidden = false;
    });
  }

  onSubmit(maketimeformeresponse:FormGroup,index:any)
  {
    if(maketimeformeresponse.value.questionaire[index] != null || index==0)
    {
      if(index >0)
      this.storeUserResponse(maketimeformeresponse.value.questionaire[index],index);

      this.questions[index].isHidden = true;
      this.questions[index + 1] ? this.questions[index + 1].isHidden = false :this.submitMakeTimeForMeResponse() ;
    }
    else{
      this.snackBar.open("Please select your response.","", {
        duration: 2000,panelClass: ['red-snackbar']
      });
    }  
  }

  goPrevious(maketimeformeresponse:FormGroup,index:any)
  {

    this.questions[index].isHidden = true;
    this.questions[index - 1] ?this.questions[index - 1].isHidden = false : false;
 
  }

  storeUserResponse(answer:any,index:any){
    let response = new makeTimeForMeResponse();
    response.userId= localStorage.getItem('user');
    response.questionid = this.questions[index].id;
    response.score =answer;

    if(answer == this.questions[index].scores.always)
    {
      response.answer = "always";
    }else
    if(answer == this.questions[index].scores.often)
    {
      response.answer = "often";
    }else
    if(answer == this.questions[index].scores.sometimes)
    {
      response.answer = "sometimes";
    }else
    if(answer == this.questions[index].scores.rarely)
    {
      response.answer = "rarely";
    }else
    if(answer == this.questions[index].scores.never)
    {
      response.answer = "never";
    }

    let flag =false;
    if(this.makeTimeForMeResponses != null)
    {
      this.makeTimeForMeResponses.forEach(element => {
        
        if(element.questionid == response.questionid)
        {

          this.score -= element.score;
          this.score += response.score; 
          flag =true;
        }

      });

      if(!flag)
      {
        this.makeTimeForMeResponses.push(response);
        this.score += response.score;
      }
    }
    else
    {
      this.makeTimeForMeResponses.push(response);
      this.score += response.score;
    }

  }

  submitMakeTimeForMeResponse()
  {
    this.finalScore =this.score >9?this.score.toString():'0'+this.score.toString();
    this.showScore=true;
    this.makeTimeForme.submitmaketimeformeresponse(JSON.stringify(this.makeTimeForMeResponses));
    
  }

  retakeQuiz()
  {
    this.showScore=false;
    this.saveMakeTimeForMeResponse.reset();
    this.makeTimeForMeResponses = [];
    this.score =0;
    this.questions[0].isHidden = false;
  }

  checkResponseBack()
  {
    this.showScore= false;
    this.questions[this.questions.length -1] ?this.questions[this.questions.length - 1].isHidden = false : false;
  }
}
