import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  
  panelOpenState = false;
  navigationState = true;

  isHandset$: Observable<boolean> = this.bpO.observe([Breakpoints.Handset])
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private bpO : BreakpointObserver,  private router:  Router) {
    router.events.subscribe( (event) => ( event instanceof NavigationEnd ) && this.handleRouteChange() )
   }

   topNavTitle : any;
   handleRouteChange = () => {
    if (this.router.url.includes('login')) {
     this.topNavTitle = "Login"
    }else if (this.router.url.includes('activityLog')) {
      this.topNavTitle = "Activity Log"
    } else {
      this.topNavTitle = "Dashboard"
    }
  };

  ngOnInit(): void {
  }

}
