import { UserService } from './../../user/user.service';
import { GoogleSigninDirective } from './../../user/google-signin.directive';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, NavigationEnd  } from '@angular/router';
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {
  
  panelOpenState = false;
  navigationState = true;
  isDoctor :boolean = false;

  isHandset$: Observable<boolean> = this.bpO.observe([Breakpoints.Handset])
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private bpO : BreakpointObserver,  private router:  Router, public auth : GoogleSigninDirective, public db : UserService) {
    router.events.subscribe( (event) => ( event instanceof NavigationEnd ) && this.handleRouteChange() )
   }

   topNavTitle : any;
   handleRouteChange = () => {
    if (this.router.url.includes('login')) {
     this.topNavTitle = "Login"
    }else if (this.router.url.includes('activity')) {
      this.topNavTitle = "Activity Log"
    } else if (this.router.url.includes('findPatient')) {
      this.topNavTitle = "Connect To Patient"
    }else {
      this.topNavTitle = "Dashboard"
    }
  };

  user: any;
  sub: Subscription;
  
  ngOnInit(): void {

    try {
      this.sub = this.db.getRole()
      .subscribe(user => (this.user = user));

      if (this.user == ""){
        this.user.roles.physician = false;

      }
    } catch (error) {
      this.user.roles.physician = false
    }
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
