import { Component, OnInit, Output } from '@angular/core';
import { FormGroup,FormControl,FormArray, FormBuilder } from '@angular/forms';
import { BlindSpotService } from './blindspot.service';
import { MatSnackBar } from '@angular/material/snack-bar';

class userResponse{
userid:string;
selectedadjectives:Array<string>;
selectedcoWorkers: Array<string>;
}

@Component({
  selector: 'app-blindspot',
  templateUrl: './blindspot.component.html',
  styleUrls: ['./blindspot.component.css']
})
export class BlindSpotComponent implements OnInit {

  constructor(private blindSpotService: BlindSpotService,private snackBar: MatSnackBar) { }

  questions:any;
  saveBlindSpotResponse: FormGroup;
  showResult = false;
  selectedAdjectives=[];
  coworkers:any;
  showQuestions =false;
  getResultData:any;
  showAdjectives=false;
  disableAdjective=false;
  showBlindspot=false;


  ngOnInit(): void {

    this.blindSpotService.showBlindSpotResult(localStorage.getItem("user"))
    .subscribe(
      (success: any) => {
        this.showBlindspot=true;
        if(success.id !=0 )
        {
          this.getResultData= success; 
          this.showQuestions = false;
          this.showResult = true;  
        }
        else{

          this.showQuestions = true;
        }

      },
      (error) => console.log(error)
    );

    let selectCoWorkers = new FormArray([]);

     this.blindSpotService.getblindspotquestions()
    .subscribe(
      (response: any[]) => {
     
        this.questions= response;

        let i =0;
    
        while (i < this.questions.selectedcwmaxcount) {
          selectCoWorkers.push(new FormControl(null));
          i++;
        }
        this.saveBlindSpotResponse = new FormGroup({
          selectcoworkers:selectCoWorkers
        });
        this.showAdjectives = true;
      },
      (error) => console.log(error)
    );

    this.blindSpotService.getCoWorkers()
    .subscribe(
      (response: any) => {

        this.coworkers = response;
      });
     
      

  }

  onClick(adjective:any)
  {

    let flag= false;
    if(!this.isNull(this.selectedAdjectives))
    {
      for (let index = 0; index < this.selectedAdjectives.length; index++) {
        if(this.selectedAdjectives[index] == adjective)
        {
          flag=true;
          this.selectedAdjectives.splice(index,1);
          break;
        }
     
      }
      if(!flag)
      {
        this.selectedAdjectives.push(adjective);
        document.getElementById(adjective).classList.remove("btn-info");
        document.getElementById(adjective).classList.add("btn-warning");

      }
      else{
        document.getElementById(adjective).classList.remove("btn-warning");
        document.getElementById(adjective).classList.add("btn-info");
      }
   
    }
    else{
      this.selectedAdjectives.push(adjective);
      document.getElementById(adjective).classList.remove("btn-info");
      document.getElementById(adjective).classList.add("btn-warning");

    }
   if(this.selectedAdjectives.length == this.questions.selectedadmaxcount)
   {
     this.disableAdjective =true;
   }
   else{
     this.disableAdjective =false;
   }
   
  }  

  onSubmit(saveBlindSpotResponse:FormGroup)
  {

    if(this.isNull(this.selectedAdjectives) || this.isNull(saveBlindSpotResponse.value.selectcoworkers))
    {
      this.snackBar.open("Please select adjectives and co workers.","", {
        duration: 2000,panelClass: ['red-snackbar']
      });
      return;
    }
    else if(this.selectedAdjectives.length < this.questions.selectedadmaxcount)
    {
      this.snackBar.open("Please select "+this.questions.selectedadmaxcount+" adjectives about yourself","", {
        duration: 2000,panelClass: ['red-snackbar']
      });
      return;
    }

    let response = new userResponse();
    response.userid=localStorage.getItem("user");
    response.selectedadjectives= this.selectedAdjectives;
    response.selectedcoWorkers = saveBlindSpotResponse.value.selectcoworkers;
    this.blindSpotService.submitblindspotresponse(response)
    .subscribe(
      (success: any) => {
        this.blindSpotService.showBlindSpotResult(response.userid)
        .subscribe(
          (success: any) => {
           this.getResultData= success; 
           this.showQuestions = false;
           this.showResult = true;  
          },
          (error) => console.log(error)
        );     
      },
      (error) => console.log(error)
    );


  }

  retakeQuiz()
  {
    this.saveBlindSpotResponse.reset();
    this.selectedAdjectives = [];
    this.showQuestions = true;
    this.showResult = false;


  }
  cancel()
  {
    for (let index = 0; index < this.selectedAdjectives.length; index++) {
      document.getElementById(this.selectedAdjectives[index]).classList.remove("btn-warning");
      document.getElementById(this.selectedAdjectives[index]).classList.add("btn-info");
    }
    this.selectedAdjectives =[];
    this.disableAdjective=false;
  }

  isNull = function (element){
    return element.join().replace(/,/g,'').length === 0;
};
  
}
