import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MsalUserService } from 'app/msaluser.service';

var userUrl ='https://cognizantreflectapi.com/users/userdetails/';
var url ='https://cognizantreflectapi.com/Reports/';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private httpClient: HttpClient,private msalService:MsalUserService) { }

  httpOptions = {  
      headers: new HttpHeaders({  
          'Content-Type': 'application/json',  
          'Authorization': 'Bearer ' + this.msalService.GetAccessToken()  
      })  

  }; 


  getUserList(){

    return this.httpClient.get(userUrl+"getUser",this.httpOptions);
  }

  getReportData(userid:string,quizId:number,attemptId:number){
    
    return this.httpClient.get(url+"getReportData/"+userid+"/"+quizId+"/"+attemptId,this.httpOptions);

  }


  getQuizes(){
    return this.httpClient.get(url+"getQuizzes",this.httpOptions);
  }

}
