import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MsalUserService } from "app/msaluser.service";

var url = 'https://cognizantreflectapi.com/reflectiontool/';

@Injectable()
export class ReflectionToolService {
    constructor(private httpClient: HttpClient,private msalService:MsalUserService) { }

    httpOptions = {  
        headers: new HttpHeaders({  
            'Content-Type': 'application/json',  
            'Authorization': 'Bearer ' + this.msalService.GetAccessToken()  
        })  
  
    }; 

    getreflectiontoolquestions() {

      
        return this.httpClient.get(url+"getReflectionToolQuestions",this.httpOptions);
    }


    submitreflectiontoolresponse(responseData:any){

         return this.httpClient.post(url+"saveReflectionToolQuizAttempt",responseData,this.httpOptions);

    }

}