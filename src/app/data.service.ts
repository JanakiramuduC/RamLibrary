import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

// export class Utils{
//   public static CACHE_KEY_LOGGEDIN:string="LOGGED_IN";
//   public static CACHE_KEY_SIGNUPUP_DATA:string="SIGNUP_DATA";

//   public static clearCache(){
//     localStorage.clear();
//   }

//   public static saveCacheByKey(Key:string,objectToCached:any){
//     localStorage.setItem(Key,JSON.stringify(objectToCached));
//   }

//   public static getCacheByKey(Key:string){
//     return JSON.parse(localStorage.getItem(Key)!);
//   }
// }

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private client:HttpClient) { }

  public getLogins(){
    var apiURL="http://localhost:3000/Logins";
    return this.client.get(apiURL);
  }

  public saveLogins(logininfo:any){
    var apiURL="http://localhost:3000/Logins";
    return this.client.post(apiURL,logininfo);
  }

}
