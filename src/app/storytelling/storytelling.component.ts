import { Component, OnInit, Output } from '@angular/core';
import { FormGroup,FormControl,FormArray } from '@angular/forms';
import { StoryTellingService } from './storytelling.service';
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
  answer: string;
}

@Component({
  selector: 'app-storytelling',
  templateUrl: './storytelling.component.html',
  styleUrls: ['./storytelling.component.css']
})
export class StoryTellingComponent implements OnInit {

  constructor(private storytellingservice: StoryTellingService,private snackBar: MatSnackBar) { }

  questions=[];
  question :any;
  saveUserResponse: any;
  responseForEachQuestion: any;
  saveStoryTellingResponse: FormGroup;
  userResponses = new Array<userResponse>();
  showResult = false;
  questionsAreHidden= true;


  ngOnInit(): void {

    this.questions.push({id: 0, question : "You need to be compelling, unforgettable, funny and smart in the business world.  Making a strong positive impression is facilitated by good, truthful stories."
    ,answer : "true",isHidden:false,type:"",options:{a:"",b:""}});

    this.storytellingservice.getstorytellingquestions().subscribe((data:any) => {
      this.addQuestions(data);  
    });   
   
  }

  addQuestions(data:any)
  {
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

    this.saveStoryTellingResponse =new FormGroup({
      questionaire: questionaire,
    });
    this.questionsAreHidden = false;
  }

  onSubmit(storytellingResponse:FormGroup,index:any)
  {
    if(storytellingResponse.value.questionaire[index] != null)
    {
        this.questions[index].showAnswer = true;

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
    
  }
  goNext(storytellingResponse:FormGroup, index:any)
  {
    
    if(storytellingResponse.value.questionaire[index] != null || index ==0)
    {
      if(index >0)
      {
        this.storeUserResponse(storytellingResponse.value.questionaire[index],index);
      }    
      this.questions[index].isHidden = true;
      this.questions[index + 1] ? this.questions[index + 1].isHidden = false :this.submitStoryTellingResponse() ;
    }
    else{
      this.snackBar.open("Please select your response.","", {
        duration: 2000,panelClass: ['red-snackbar']
      });
    }  

  }

  storeUserResponse(answer:any,index:any){
    let response = new userResponse();
    response.userid= localStorage.getItem('user');
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

  submitStoryTellingResponse()
  {
    this.showResult=true;
    this.storytellingservice.submitstorytellingresponse(this.userResponses);
  }

  retakeQuiz()
  {
    this.showResult=false;
    this.saveStoryTellingResponse.reset();
    this.userResponses = [];
    this.questions[0].isHidden = false;
    this.questions.forEach(element => {
      element.showAnswer = false;
    });
  }
}
