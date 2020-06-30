import { Component, OnInit, Output } from '@angular/core';
import { FormGroup,FormControl,FormArray } from '@angular/forms';
import { ContinuousLearningAssessmentService } from './continuouslearningassessment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

 class question {
  id: number;
  question: string;
  isHidden:boolean;
  yes:boolean;
  somewhat:boolean;
  no:boolean;
}

class continuousLearningAssessmentResponse{
  userid: string;
  questionid: number;
  answer:string;
  yes: boolean;
  no: boolean;
  somewhat: boolean;
}

class continuousFeedback{
  userid: string;
  ResponseFromYes: string;
  ResponseFromNo: string;
  ResponseFromSomeWhat: string 
}

@Component({
  selector: 'app-continuouslearningassessment',
  templateUrl: './continuouslearningassessment.component.html',
  styleUrls: ['./continuouslearningassessment.component.css']
})
export class ContinuousLearningAssessmentComponent implements OnInit {

  constructor(private continuousLearningAssessment: ContinuousLearningAssessmentService,private snackBar: MatSnackBar) { }

  questions=[];
  question :any;
  saveUserResponse: any;
  saveContinuousLearningAssessmentResponse: FormGroup;
  continuousLarningAssessmentResponses = new Array<continuousLearningAssessmentResponse>();
  showResult = false;
  showQuestions = true;
  questionsAreHidden = true;
  feedback:any;
  yesCount =0;
  someWhatCount =0;
  noCount =0;



  ngOnInit(): void {

    this.continuousLearningAssessment.getcontinuouslearningassessmentquestions()
    .subscribe(
      (data: any[]) => {
        // responseData = data;
        this.addQuestions(data);
      },
      (error) => console.log(error)
    );
  }

  addQuestions(data:any){
    data.forEach(element => {
      this.question = new question();
      this.question.id=element.id;
      this.question.question = element.question;
      this.question.isHidden =true;
      this.questions.push(this.question);
  
    });
  
    this.questions[0].isHidden=false;
    let questionaire = new FormArray([]);

    this.questions.forEach(element => {
      questionaire.push(new FormControl(null));
    });

    this.saveContinuousLearningAssessmentResponse =new FormGroup({
      questionaire: questionaire,
      yesresponse:new FormControl(null),
      noresponse: new FormControl(null),
      somewhatresponse: new FormControl(null)
    });
    this.questionsAreHidden=false;
  }

  onSubmit(continuouslearningassessmentresponse:FormGroup,index:any)
  {
    if(continuouslearningassessmentresponse.value.questionaire[index] != null)
    {
      this.storeUserResponse(continuouslearningassessmentresponse.value.questionaire[index],index);

      this.questions[index].isHidden = true;
      this.questions[index + 1] ? this.questions[index + 1].isHidden = false :this.submitContinuousLearningAssessmentResponse() ;
    }
    else{
      this.snackBar.open("Please select your response.","", {
        duration: 2000,panelClass: ['red-snackbar']
      });
    }  
  }

  goPrevious(index:any)
  {

    this.questions[index].isHidden = true;
    this.questions[index - 1] ?this.questions[index - 1].isHidden = false : false;
 
  }

  storeUserResponse(answer:any,index:any){
    let response = new continuousLearningAssessmentResponse();
    response.userid=localStorage.getItem("user");
    response.questionid = this.questions[index].id;
    response.answer = answer;
    if(answer =="yes")
    {
      response.yes=true;
    }
    if(answer =="somewhat")
    {
      response.somewhat = true;
    }
    if(answer =="no")
    {
      response.no=true;
    }

    let flag =false;
    if(this.continuousLarningAssessmentResponses != null)
    {
      this.continuousLarningAssessmentResponses.forEach(element => {
        
        if(element.questionid == response.questionid)
        {

          if(response.answer != element.answer)
          {
           switch(element.answer)
           {
            case "yes":
              this.yesCount -= 1;
              break;
              case "no":
                this.noCount -= 1;
                break;
                case "somewhat":
                  this.someWhatCount -= 1;
                  break;

           }
           switch(response.answer)
           {
            case "yes":
              this.yesCount += 1;
              break;
              case "no":
                this.noCount += 1;
                break;
                case "somewhat":
                  this.someWhatCount += 1;
                  break;
           }
            element.yes = response.yes;
            element.no = response.no;
            element.somewhat = response.somewhat;
          }

          flag =true;
        }

      });

      if(!flag)
      {
        this.continuousLarningAssessmentResponses.push(response);
        switch(response.answer)
        {
         case "yes":
           this.yesCount += 1;
           break;
           case "no":
             this.noCount += 1;
             break;
             case "somewhat":
               this.someWhatCount += 1;
               break;
        }
      }
    }
    else
    {
      this.continuousLarningAssessmentResponses.push(response);
      switch(response.answer)
      {
       case "yes":
         this.yesCount += 1;
         break;
         case "no":
           this.noCount += 1;
           break;
           case "somewhat":
             this.someWhatCount += 1;
             break;
      }
    }

  }

  submitContinuousLearningAssessmentResponse()
  {
    this.showResult=true;
    this.continuousLearningAssessment.submitcontinuouslearningassessmentresponse(JSON.stringify(this.continuousLarningAssessmentResponses));
    this.showQuestions = false;
  }

  retakeQuiz()
  {
    this.showResult=false;
    this.saveContinuousLearningAssessmentResponse.reset();
    this.continuousLarningAssessmentResponses = [];
    this.questions[0].isHidden = false;
    this.showQuestions = true;
    window.scrollTo(0,0);
  }

  checkResponseBack()
  {
    this.showResult= false;
    this.showQuestions = true;
    this.questions[this.questions.length -1] ?this.questions[this.questions.length - 1].isHidden = false : false;
    window.scrollTo(0,0);
  }

  submitFeedback(continuouslearningassessmentresponse:FormGroup)
  {
    if(continuouslearningassessmentresponse.value.yesresponse != null ||
      continuouslearningassessmentresponse.value.noresponse != null||
      continuouslearningassessmentresponse.value.somewhatresponse)
      {
        this.feedback = new continuousFeedback();
        this.feedback.userid= localStorage.getItem("user");
        this.feedback.ResponseFromYes = continuouslearningassessmentresponse.value.yesresponse;
        this.feedback.ResponseFromNo = continuouslearningassessmentresponse.value.noresponse;
        this.feedback.ResponseFromSomeWhat = continuouslearningassessmentresponse.value.somewhatresponse;
        this.continuousLearningAssessment.saveContinuousFeedBack(this.feedback);
        this.saveContinuousLearningAssessmentResponse.reset();
        this.continuousLarningAssessmentResponses = [];
        this.showResult=false;
        this.questions[0].isHidden = false;
        this.showQuestions = true;
        this.snackBar.open("Saved your response.","", {
          duration: 2000,panelClass: ['green-snackbar']
        });
        window.scrollTo(0,0);
      }
      else{
        this.snackBar.open("Please add your response","", {
          duration: 2000,panelClass: ['red-snackbar']
        });
      }

    
  }
}
