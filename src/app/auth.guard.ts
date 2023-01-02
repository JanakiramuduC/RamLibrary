import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      let allowed:boolean=(JSON.parse(localStorage.getItem("LOGGED_IN")!)["role"]=='admin');
      if(!allowed){
        alert("you are not authorised to access!");
      }
    return allowed;
  }
  
}
