import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent {

  estaLogeado = null;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {

      this.estaLogeado = this.authService.getToken();
  }


  logout() {
    if (confirm('Se va a cerrar sesión. Desea continuar?')) {
      this.authService.logout();
      window.location.href = '/';
    }
  }

}
