import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormArray } from '@angular/forms';
import { GrowthmindsetService } from './growthmindset.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  selector: 'app-growthmindset',
  templateUrl: './growthmindset.component.html',
  styleUrls: ['./growthmindset.component.css']
})
export class GrowthmindsetComponent implements OnInit {

  constructor(private growthmindsetservice:GrowthmindsetService,private snackBar: MatSnackBar) { }

  questions=[];
  question :any;

  saveUserResponse: any;
  responseForEachQuestion: any;
  saveGrowthmindsetResponse: FormGroup;
  currentQuestionId:any;
  respondedTrue = false;
  respondedFalse = false;
  questionsAreHidden = true;
  score =0;
  userResponses = new Array<userResponse>();
  showScore = false;
  finalScore:string;

  ngOnInit(): void {
    this.growthmindsetservice.getgrowthmindsetquestions().subscribe((data:any) => {
      data.forEach((element,i) =>  {
        this.question = new question();
        this.question.id=element.id;
        this.question.answer= element.answer;
        this.question.question = element.question;
        
        if(i !== 0){
          this.question.isHidden = true;
        }
        else{
          this.question.isHidden = false;
        }
  
        
        this.questions.push(this.question);  
      });
    
      let questionaire = new FormArray([]);
  
      this.questions.forEach(element => {
        questionaire.push(new FormControl(null));
      });
  
      this.saveGrowthmindsetResponse =new FormGroup({
        questionaire: questionaire,
      });
      this.questionsAreHidden = false;
    });
    
  }

  onSubmit(growthMindsetResponse:FormGroup,index:any)
  {

    if(growthMindsetResponse.value.questionaire[index] != null)
    {
      this.storeUserResponse(growthMindsetResponse.value.questionaire[index],index);

      this.questions[index].isHidden = true;
      this.questions[index + 1] ? this.questions[index + 1].isHidden = false :this.submitGrowthMindsetResponse() ;
    }
    else{
      this.snackBar.open("Please select your response.","", {
        duration: 2000,panelClass: ['red-snackbar']
      });
    }  
   
  }

  goPrevious(growthMindsetResponse:FormGroup,index:any)
  {

    this.questions[index].isHidden = true;
    this.questions[index - 1] ?this.questions[index - 1].isHidden = false : false
    
    if(growthMindsetResponse.value.userResponses[index -1])
     {
      this.questions[index - 1].yes=true;
     }
    else{
      this.questions[index - 1].yes=false;
     }
  }

  storeUserResponse(answer:any,index:any){
    let response = new userResponse();
    response.userId=localStorage.getItem("user");
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

  submitGrowthMindsetResponse()
  {
    this.finalScore =this.score >9?this.score.toString():'0'+this.score.toString();
    this.showScore=true;
    this.growthmindsetservice.submitgrowthmindsetresponse(JSON.stringify(this.userResponses))
  }

  retakeQuiz()
  {
    this.showScore=false;
    this.saveGrowthmindsetResponse.reset();
    this.userResponses = [];
    this.score =0;
    this.questions[0].isHidden = false;
  }

}
