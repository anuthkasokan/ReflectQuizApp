import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { MsalUserService } from 'app/msaluser.service';

var url ='https://cognizantreflectapi.com/GrowthMindsetQuiz/'
// var url = 'https://cognizantreflectapi.com/GrowthMindsetQuiz/';

class userResponse{
  userId: number;
  questionid: number;
  answer: boolean;
  score: number;
}

@Injectable()
  export class GrowthmindsetService {
    constructor(private httpClient: HttpClient,private msalService:MsalUserService) { }

    httpOptions = {  
      headers: new HttpHeaders({  
          'Content-Type': 'application/json',  
          'Authorization': 'Bearer ' + this.msalService.GetAccessToken()  
      })  

  }; 
    getgrowthmindsetquestions() {
        return this.httpClient.get(url + "getGrowthMindsetQuiz", this.httpOptions);        
    }


    submitgrowthmindsetresponse(responseData:any){
      return this.httpClient.post(url+"saveGrowthMindsetQuizAttempts",responseData,this.httpOptions).subscribe((res)=>{
      });
    }
}
