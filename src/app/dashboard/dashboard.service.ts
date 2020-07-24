import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MsalUserService } from "app/msaluser.service";

var url = 'https://cognizantreflectapi.com/Dashboard/';

@Injectable()
export class DashboardService {
    constructor(private httpClient: HttpClient,private msalService: MsalUserService) { }

    httpOptions = {  
      headers: new HttpHeaders({  
          'Content-Type': 'application/json',  
          'Authorization': 'Bearer ' + this.msalService.GetAccessToken()  
      })  

  }; 

    getPercentageOfCompletionForUser(user:any)
    {
       return this.httpClient.get(url+"getPercentageOfCompletion/"+user,this.httpOptions);
        
    }

    
    getPercentageOfCompletion()
    {

      return  this.httpClient.get(url+"getPercentageOfCompletion",this.httpOptions);
       
    }

    getRoleByUser(emailId:any)
    {
       return this.httpClient.get(url+"getUser/"+emailId,this.httpOptions);
    }

    getUsers()
    {
      return  this.httpClient.get(url+"getUser",this.httpOptions);
    }

    getScoreChartByUser(user:any) {
      return  this.httpClient.get(url+"getScoreChartDetails/"+user,this.httpOptions);
       
    }

    getScoreChart() {
       return this.httpClient.get(url+"getScoreChartDetails",this.httpOptions); 
}

    getAttemptCountsByUser(user:any)
    {
       return this.httpClient.get(url+"getAttemptCount/"+user,this.httpOptions);   
    }

    getAttemptCounts()
    {
      return  this.httpClient.get(url+"getAttemptCount",this.httpOptions);   
    }

    getAttemptHistoryChartByUser(user:any){
       return this.httpClient.get(url+"getAttemptHistoryDetails/"+user,this.httpOptions); 
    }

    getAttemptHistoryChart(){
        return this.httpClient.get(url+"getAttemptHistoryDetails",this.httpOptions); 
     }

    getCLACountsByUser(user:any){

        return   this.httpClient.get(url+"getContinuousLearningDetails/"+user,this.httpOptions);  
    }

    getCLACounts(){

        return this.httpClient.get(url+"getContinuousLearningDetails",this.httpOptions);  
    }
 
    getCuriosityAnswersByUser(user:any){

       return  this.httpClient.get(url+"getCuriosityAnswers/"+user,this.httpOptions); 
    }

    getCuriosityAnswers(){

       return this.httpClient.get(url+"getCuriosityAnswers",this.httpOptions);
    }

    getGrowthMindsetAnswersByUser(user:any){

       return this.httpClient.get(url+"getGrowthMindset/"+user,this.httpOptions);
    }

    getGrowthMindsetAnswers(){

       return this.httpClient.get(url+"getGrowthMindset",this.httpOptions);
    }
    getMakeTimeAnswersByUser(user:any){
        
       return this.httpClient.get(url+"getMakingTimeAnswers/"+user,this.httpOptions);
    }

    getMakeTimeAnswers(){
        
       return this.httpClient.get(url+"getMakingTimeAnswers",this.httpOptions);
    }

    getAdminComments(user:any)
    {
        if(user=='')
        {
            return this.httpClient.get(url+"getFeedbackDetailsForAdmin",this.httpOptions);
        }
        else
        {
            return this.httpClient.get(url+"getAdminComments/"+user,this.httpOptions);
        }

    }
}

