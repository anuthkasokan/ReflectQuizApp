import { Component, OnInit, Output } from '@angular/core';
import { FormGroup,FormControl,FormArray } from '@angular/forms';
import { ReflectionToolService } from './reflectiontool.service';
import { MatSnackBar } from '@angular/material/snack-bar';

 class question {
  id: number;
  question: string;
  type:string;
  options:Array<string>;
  agree:boolean;
  neutral:boolean;
  disagree:boolean;
}


class userResponse{
  userId: string;
  questionid: number;
  answer: string;
  selectedoptions:Array<any>;
}

@Component({
  selector: 'app-reflectiontool',
  templateUrl: './reflectiontool.component.html',
  styleUrls: ['./reflectiontool.component.css']
})
export class ReflectionToolComponent implements OnInit {

  constructor(private reflectiontoolservice: ReflectionToolService,private snackBar: MatSnackBar) { }

  questions = new Array<any>();
  question :any;
  saveReflectionToolResponse: FormGroup;
  userResponses = new Array<userResponse>();
  disableOption = false;
  showReflection = false;


  ngOnInit(): void {

    this.reflectiontoolservice.getreflectiontoolquestions()
    .subscribe(
      (response: any) => {
      
        let reflectionQuestions = response;
  
        reflectionQuestions.forEach(element => {
          let reflectionQuestion =  new question()
          reflectionQuestion.id =element.id;
          reflectionQuestion.question = element.question;
          reflectionQuestion.type = element.type;
          reflectionQuestion.options = element.options;
          reflectionQuestion.agree=false;
          reflectionQuestion.disagree = false;
          reflectionQuestion.neutral = false;
          this.questions.push(reflectionQuestion);
        });

        let questionaire = new FormArray([]);

        this.questions.forEach(element => {
          questionaire.push(new FormControl(null));
        });
    
        this.saveReflectionToolResponse =new FormGroup({
          questionaire: questionaire,
        });    
        this.showReflection=true;
      },
      (error) => console.log(error)
    );

  }

  onSubmit(reflectionToolResponse:FormGroup)
  {
   
    if (!this.isNull(reflectionToolResponse.value.questionaire))
    {
      let i=0;
      reflectionToolResponse.value.questionaire.forEach(element => {
        let response = new userResponse();
        response.userId=localStorage.getItem("user");
        response.questionid = this.questions[i].id;
        response.answer= this.questions[i].type != "select"? element:null;
        response.selectedoptions = this.questions[i].type =="select"?element:null;
        this.userResponses.push(response);
        i++;
      });
   
    this.reflectiontoolservice.submitreflectiontoolresponse(this.userResponses)
    .subscribe(
      (response: any) => {
        this.saveReflectionToolResponse.reset();
        this.userResponses = [];
    
        this.snackBar.open("Your response has been successfully saved.","", {
          duration: 2000,panelClass: ['green-snackbar']
        });
        window.scrollTo(0,document.body.scrollHeight);
      },
      (error) => console.log(error)
    );
    }
    else{
      this.snackBar.open("Please add your response.","", {
        duration: 2000,panelClass: ['red-snackbar']
      });
    }
  }


  retakeQuiz()
  {
    this.saveReflectionToolResponse.reset();
    this.userResponses = [];
    this.questions[0].isHidden = false;
    this.disableOption = false;

  }

  changed(reflectionResponse:FormGroup, index:any) {
console.log(reflectionResponse.value);
    if(reflectionResponse.value.questionaire[index].length > 2)
      this.disableOption = true;
    else
      this.disableOption = false;

  }

  isNull = function (element){
    return element.join().replace(/,/g,'').length === 0;
};


}
