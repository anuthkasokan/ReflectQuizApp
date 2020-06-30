import { Injectable } from "@angular/core";
import * as Msal from 'msal';  
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

var url = 'https://cognizantreflectapi.com/users/userDetails/';

const msalConfig:Msal.Configuration = {
    auth: {
        clientId:'5ad37ea5-ce50-4e8f-a178-8a05f57cb4cd',
        authority: 'https://login.microsoftonline.com/cea101fb-acfa-4ba2-90e9-5a83909297e7'
    },
};

@Injectable()
export class MsalUserService {
    private accessToken: any;  
    public clientApplication: Msal.UserAgentApplication = null;  
    constructor(private httpClient: HttpClient) {  
        this.clientApplication = new Msal.UserAgentApplication(msalConfig);  
    }  
  
    public GetAccessToken(): Observable<any> {  
        if (sessionStorage.getItem('msal.idtoken') !== undefined && sessionStorage.getItem('msal.idtoken') != null) {  
            this.accessToken = sessionStorage.getItem('msal.idtoken');  
        }  
            //console.log(this.accessToken);
   
        return this.accessToken;  
    }  
  
    public authCallback(errorDesc, token, error, tokenType) {  
        if (token) {  
  
        } else {  
            console.log(error + ':' + errorDesc);  
        }  
    }  
  
    public getCurrentUserInfo() {  
        const user = this.clientApplication.getAccount();  
        return user;
    }  
  
    public logout() {  
        this.clientApplication.logout();  
      }  

    public getRoleByUser()
      {
        let httpOptions = {  
            headers: new HttpHeaders({  
                'Content-Type': 'application/json',  
                'Authorization': 'Bearer ' + this.GetAccessToken()  
            })  
      
        };
        
        let emailId= this.getCurrentUserInfo()?.userName;
         return this.httpClient.get(url+"getUser/"+emailId,httpOptions);
      }
      public getLoggedUser()
      {
        let httpOptions = {  
            headers: new HttpHeaders({  
                'Content-Type': 'application/json',  
                'Authorization': 'Bearer ' + this.GetAccessToken()  
            })  
      
        };
        
        let emailId= this.getCurrentUserInfo()?.userName;
        let name = this.getCurrentUserInfo()?.name;
         return this.httpClient.get(url+"getUser/"+name+"/"+emailId,httpOptions);
      }
    }
