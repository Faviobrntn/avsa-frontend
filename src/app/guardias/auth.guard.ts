import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

	constructor(private authService: AuthService, private router: Router) { }

	
  	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
	{
		
		// return true;
		let url: string = state.url;
		return this.checkLogin(url);
  	}
  	canActivateChild(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return true;
  	}
  	canLoad(
		route: Route,
		segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
		return true;
	}
	  

	checkLogin(url: string): boolean {
		if (this.authService.getToken()) { return true; }

		// Store the attempted URL for redirecting
		this.authService.redirectUrl = url;

		// Navigate to the login page with extras
		this.router.navigate(['/login']);
		return false;
	}
}
