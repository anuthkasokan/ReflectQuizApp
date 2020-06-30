import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MsalUserService } from "app/msaluser.service";

var url = 'https://cognizantreflectapi.com/ContinuousLearningAssessmentQuiz/'
// var url = 'http://localhost:16500/ContinuousLearningAssessmentQuiz/';

@Injectable()
export class ContinuousLearningAssessmentService {
    constructor(private httpClient: HttpClient,private msalService:MsalUserService) { }

    httpOptions = {  
        headers: new HttpHeaders({  
            'Content-Type': 'application/json',  
            'Authorization': 'Bearer ' + this.msalService.GetAccessToken()  
        })  
  
    };

    getcontinuouslearningassessmentquestions() {
        return this.httpClient.get(url + "getContinuousLearningQuiz",this.httpOptions);
    }


    submitcontinuouslearningassessmentresponse(responseData:any){
        return this.httpClient.post(url+"saveContinuousLearningQuizAttempts",responseData,this.httpOptions).subscribe((res)=>{
        });
    }

    saveContinuousFeedBack(feedback:any)
    {
       // return this.httpClient.post(url+"saveContinuousFeedBack",feedback,this.httpOptions).subscribe((res)=>{
        }

}