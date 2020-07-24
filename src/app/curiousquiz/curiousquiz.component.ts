import { Component, OnInit, Output } from '@angular/core';
import { FormGroup,FormControl,FormArray } from '@angular/forms';
import { CuriosityService } from './curiousity.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { element } from 'protractor';
import { getLocaleDateFormat } from '@angular/common';

 class question {
  id: number;
  question: string;
  answer:boolean;
  isHidden:boolean;
  yes:boolean;
  no:boolean;
}

class userResponse{
  userId: string;
  questionid: number;
  answer: boolean;
  score: number;
}

@Component({
  selector: 'app-curiousquiz',
  templateUrl: './curiousquiz.component.html',
  styleUrls: ['./curiousquiz.component.css']
})
export class CuriousquizComponent implements OnInit {
  questions=[];
  question :any;
  saveUserResponse: any;
  responseForEachQuestion: any;
  saveCuriousResponse: FormGroup;
  currentQuestionId:any;
  respondedTrue = false;
  respondedFalse = false;
  questionsAreHidden = true;
  score =0;
  userResponses = new Array<userResponse>();
  showScore = false;
  finalScore:string;
  current:any;

  constructor(private curiousService: CuriosityService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.questions.push({id: 0, question : "HOW CURIOUS ARE YOU TODAY ?",answer : true,isHidden:false,yes:false,no:false})
    let responseData = new Array();
    this.curiousService.getcuriosityquestions()
    .subscribe(
      (data: any[]) => {
        // responseData = data;
        this.addQuestions(data);
      },
      (error) => console.log(error)
    );
  }

  addQuestions(data:any){
    data.forEach((element)  => {
      this.question = new question();
      this.question.id=element.id;
      this.question.answer= element.answer;
      this.question.question = element.question;
      this.question.isHidden =true;
      this.questions.push(this.question);
    });

    let questionaire = new FormArray([]);

    this.questions.forEach(element => {
      questionaire.push(new FormControl(null));
    });

    this.saveCuriousResponse =new FormGroup({
      questionaire: questionaire,
    });
    this.questionsAreHidden = false;
  }

  onSubmit(curiousResponse:FormGroup,index:any)
  {
    if(curiousResponse.value.questionaire[index] != null || index==0)
    {
      if(index >0)
      this.storeUserResponse(curiousResponse.value.questionaire[index],index);

      this.questions[index].isHidden = true;
      this.questions[index + 1] ? this.questions[index + 1].isHidden = false :this.submitCuriosityResponse() ;
    }
    else{
      this.snackBar.open("Please select your response.","", {
        duration: 2000,panelClass: ['red-snackbar']
      });
    }
  }

  goPrevious(curiousResponse:FormGroup,index:any)
  {

    this.questions[index].isHidden = true;
    this.questions[index - 1] ?this.questions[index - 1].isHidden = false : false

    if(curiousResponse.value.questionaire[index -1])
     {
      this.questions[index - 1].yes=true;
     }
    else{
      this.questions[index - 1].yes=false;
     }
  }

  storeUserResponse(answer:any,index:any){
    let response = new userResponse();
    response.userId= localStorage.getItem("user");
    response.questionid = this.questions[index].id;
    response.answer = answer;
    response.score = this.questions[index].answer ==answer?1:0;

    let flag =false;
    if(this.userResponses != null)
    {
      this.userResponses.forEach(element => {

        if(element.questionid == response.questionid)
        {

          if(answer == this.questions[index].answer && answer != element.answer)
          {
            element.score =1;
            this.score += 1;
          }

           else if(answer != this.questions[index].answer && answer != element.answer)
           {
             element.score = 0;
            this.score -= 1;
           }

          element.answer = answer;
          flag =true;
        }

      });

      if(!flag)
      {
        this.userResponses.push(response);
        this.score += response.score;
      }
    }
    else
    {
      this.userResponses.push(response);
      this.score += response.score;
    }
  }

  submitCuriosityResponse()
  {
    this.finalScore =this.score >9?this.score.toString():'0'+this.score.toString();
    this.showScore=true;
    this.curiousService.submitcuriosityresponse(JSON.stringify(this.userResponses))
  }

  retakeQuiz()
  {
    this.showScore=false;
    this.saveCuriousResponse.reset();
    this.userResponses = [];
    this.score =0;
    this.questions[0].isHidden = false;
  }
}
