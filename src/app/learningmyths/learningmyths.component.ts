import { Component, OnInit, Output } from '@angular/core';
import { FormGroup,FormControl,FormArray } from '@angular/forms';
import { LearningmythsService } from './learningmyths.service';
import { MatSnackBar } from '@angular/material/snack-bar';

 class question {
  id: number;
  question: string;
  answer: string;
  statement: string;
  type:string;
  options:options;
  isHidden:boolean;
  optionA:boolean;
  optionB:boolean;
  optionC:boolean;
  optionD:boolean;
  showAnswer:boolean;
}

class options{
  a:string;
  b:string;
  c:string;
  d:string;
}

class userResponse{
  userid: string;
  questionid: number;
  answer: boolean;
}

@Component({
  selector: 'app-storytelling',
  templateUrl: './learningmyths.component.html',
  styleUrls: ['./learningmyths.component.css']
})
export class LearningmythsComponent implements OnInit {

  constructor(private learningmythsService: LearningmythsService,private snackBar: MatSnackBar) { }

  questions=[];
  question :any;
  saveUserResponse: any;
  responseForEachQuestion: any;
  savelearningMythsResponse: FormGroup;
  userResponses = new Array<userResponse>();
  showResult = false;
  questionsAreHidden = true;
  showRetake= false;

  ngOnInit(): void {

    this.questions.push({id: 0, question : "Take this quick assessment to see how well you understand the learning process."
    ,answer : "true",isHidden:false,type:"",options:{a:"",b:""}});

    this.learningmythsService.getLearningmythquestions().subscribe((data:any) => {    
      this.addQuestions(data)
    });
  }

  addQuestions(data:any){ 
    data.forEach(element => {
      this.question = new question();
      this.question.id=element.id;
      this.question.answer= element.answer;
      this.question.question = element.question;
      this.question.isHidden =true;
      this.question.type = element.type;
      this.question.options = element.options;
      this.question.statement = element.statement;
      this.questions.push(this.question);
  
      });

    let questionaire = new FormArray([]);

    this.questions.forEach(element => {
      questionaire.push(new FormControl(null));
    });

    this.savelearningMythsResponse =new FormGroup({
      questionaire: questionaire,
    });
    this.questionsAreHidden = false;
  }

  onSubmit(learningmythsResponse:FormGroup,index:any)
  {
    if(learningmythsResponse.value.questionaire[index] != null)
    {
        this.questions[index].showAnswer = true;

    }
    else{
      this.snackBar.open("Please select your response.","", {
        duration: 2000,panelClass: ['red-snackbar']
      });
    }  
  }

  goPrevious(learningmythsResponse:FormGroup,index:any)
  {

    this.questions[index].isHidden = true;
    this.questions[index - 1] ?this.questions[index - 1].isHidden = false : false
    
  }
  goNext(learningmythsResponse:FormGroup, index:any)
  {
    if(index>0)
    {
      this.storeUserResponse(learningmythsResponse.value.questionaire[index],index);
    }
    if(learningmythsResponse.value.questionaire[index] != null || index ==0)
    {
      index < this.questions.length-1? this.questions[index].isHidden = true:this.questions[index].isHidden = false;
      this.questions[index + 1] ? this.questions[index + 1].isHidden = false :this.submitlearningMythsresponse() ;
    }
    else{
      this.snackBar.open("Please select your response.","", {
        duration: 2000,panelClass: ['red-snackbar']
      });
    }  

  }

  storeUserResponse(answer:any,index:any){
    let response = new userResponse();
    response.userid=localStorage.getItem("user");
    response.questionid = this.questions[index].id;
    response.answer = answer; 

    let flag =false;
    if(this.userResponses != null)
    {
      this.userResponses.forEach(element => {
        
        if(element.questionid == response.questionid)
        {
          element.answer = answer;
          flag =true;
        }

      });

      if(!flag)
      {
        this.userResponses.push(response);
      }
    }
    else
    {
      this.userResponses.push(response);
    }

  }

  submitlearningMythsresponse()
  {
    this.showResult=true;
    this.showRetake = true;
    this.learningmythsService.submitlearningMythsresponse(JSON.stringify(this.userResponses));
  }

  retakeQuiz()
  {
    this.showResult=false;
    this.showRetake = false;
    this.savelearningMythsResponse.reset();
    this.userResponses = [];
    this.questions.forEach(element => {
      element.isHidden = true;
      element.showAnswer = false;
    });
    this.questions[0].isHidden = false;

  }
}
