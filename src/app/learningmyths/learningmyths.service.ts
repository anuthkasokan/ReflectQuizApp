import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { MsalUserService } from 'app/msaluser.service';

var url ='https://cognizantreflectapi.com/LearningMyths/'
// var url = 'http://localhost:16500/LearningMyths/';

@Injectable({
  providedIn: 'root'
})
export class LearningmythsService {

  constructor(private httpClient:HttpClient,private msalService:MsalUserService) { }

  httpOptions = {  
    headers: new HttpHeaders({  
        'Content-Type': 'application/json',  
        'Authorization': 'Bearer ' + this.msalService.GetAccessToken()  
    })  

}; 

  getLearningmythquestions() {
      return this.httpClient.get(url + "getLearningMythsQuiz",this.httpOptions)
  }

  submitlearningMythsresponse(responseData:any) {
    return this.httpClient.post(url+"saveLearningMythsQuizAttempts",responseData,this.httpOptions).subscribe((res)=>{
    });
  }
}
