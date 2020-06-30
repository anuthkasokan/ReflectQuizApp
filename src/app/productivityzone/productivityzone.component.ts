import { Component, OnInit, Output } from '@angular/core';
import { FormGroup,FormControl,FormArray, FormBuilder } from '@angular/forms';
import { ProductivityZoneService } from './productivityzone.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { group } from '@angular/animations';


class ProductivityZoneResponse{
  userid: string;
  questionid: number;
  answer: string;
  rating:Rating;
}
class Rating{
  afternoon:number;
  earlyevening:number;
  lateevening:number;
}

@Component({
  selector: 'app-productivityzone',
  templateUrl: './productivityzone.component.html',
  styleUrls: ['./productivityzone.component.css']
})
export class ProductivityZoneComponent implements OnInit {

  constructor(private productivityZone: ProductivityZoneService,private snackBar: MatSnackBar,private formBuilder: FormBuilder) { }

  questions=[];
  saveProductivityZoneResponse: FormGroup;
  productivityZoneResponses = new Array<ProductivityZoneResponse>();
  showTips = true;
  showPerfection = true;
  showResult = false;



  ngOnInit(): void {

    this.saveProductivityZoneResponse = new FormGroup({
      'questionaire': new FormArray([])
    });

   this.productivityZone.productivityzonequestions()
   .subscribe((res:any)=>{
    this.questions=res;

   
    this.questions.forEach(element => {
      (<FormArray>this.saveProductivityZoneResponse.get('questionaire')).push(new FormControl(null));
    });
  });

  
    // let questionaire = this.formBuilder.array([]);

    // this.questions.forEach(element => {
    //   questionaire.push(this.createItem());
    // });


  }

  onSubmit(productivityzoneresponseresponse:FormGroup)
  {
    if (!this.isNull(productivityzoneresponseresponse.value.questionaire))
    {
      let i=0;
      productivityzoneresponseresponse.value.questionaire.forEach(element => {
        let userResponse = new ProductivityZoneResponse();
        userResponse.userid=localStorage.getItem('user');
        userResponse.questionid = this.questions[i].id;
        userResponse.answer= element;
        // userResponse.rating = new Rating();
        // userResponse.rating.afternoon = element.afternoon;
        // userResponse.rating.earlyevening = element.evening;
        // userResponse.rating.lateevening = element.lateevening;
        this.productivityZoneResponses.push(userResponse);

      });
 
    this.productivityZone.submitproductivityzoneresponse(this.productivityZoneResponses);
    this.saveProductivityZoneResponse.reset();
    this.productivityZoneResponses = [];
    this.showTips=true;
    this.showPerfection= true;
    this.showResult=true;
    this.snackBar.open("Your response has been successfully saved.","", {
      duration: 2000,panelClass: ['green-snackbar']
    });
    window.scrollTo(0,document.body.scrollHeight);
    }
    else{
      this.snackBar.open("Please add your response.","", {
        duration: 2000,panelClass: ['red-snackbar']
      });
    }
  }  

  createItem(): FormGroup {
    return this.formBuilder.group({
      userResponse: '',
      afternook: [],
      price: ''
    });
  }

  isNull = function (element){
    return element.join().replace(/,/g,'').length === 0;
};
  
}
