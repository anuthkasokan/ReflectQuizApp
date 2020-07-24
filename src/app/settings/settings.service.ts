import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { MsalUserService } from "app/msaluser.service";

var feedbackUrl = 'https://cognizantreflectapi.com/dashboard/';
var apiUrl ='https://cognizantreflectapi.com/blindspot/';
var userUrl ='https://cognizantreflectapi.com/dashboard/';
var emailUrl ='https://cognizantreflectapi.com/email/EmailService/';

@Injectable()
export class SettingsService {
    constructor(private httpClient: HttpClient,private msalService:MsalUserService) { }

    httpOptions = {  
        headers: new HttpHeaders({  
            'Content-Type': 'application/json',  
            'Authorization': 'Bearer ' + this.msalService.GetAccessToken()  
        })  
  
    }; 

    getAdmins(){

        return  this.httpClient.get(userUrl+"getUsersByRole/Admin",this.httpOptions);
    }

    getUsers(){

        return  this.httpClient.get(userUrl+"getUser",this.httpOptions);
    }

    getCountsFromBlindSpot(){

        return  this.httpClient.get(apiUrl+"getBlindSpotQuestions",this.httpOptions);
    }
    getPendingFeedbackQuestions(){

        return this.httpClient.get(feedbackUrl+"getFeedbackDetailsForAdmin",this.httpOptions);
    }

    getTemplateList()
    {
        return ["feedback","blindspot"];
    }
    getEmailTemplate(type:any)
    {
       return this.httpClient.get(emailUrl +"getEmailTemplate/"+type,this.httpOptions);
    
    }

    saveEmailTemplate(template:any)
    {
       return this.httpClient.post(emailUrl+"saveEmailTemplate",template,this.httpOptions);
    }

    deleteFeedback(feedbackId:any)
    {
        return this.httpClient.post(feedbackUrl+"deleteFeedback",feedbackId,this.httpOptions);
    }


   saveFeedbacks(feedbacks:any)
   {
    return this.httpClient.post(feedbackUrl+"updateOrAddFeedbacksByAdmin",feedbacks,this.httpOptions);
   }


}