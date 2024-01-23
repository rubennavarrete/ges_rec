import { Component, OnDestroy, OnInit } from '@angular/core';
import { Layouts } from './layout/layout';
import { Subject, takeUntil } from 'rxjs';
import { Router, RoutesRecognized } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';
  Layouts = Layouts;
  layout: Layouts = Layouts.Simple

  private destroy$ = new Subject<any>()

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    initFlowbite();
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data instanceof RoutesRecognized) {
            this.layout = data.state.root.firstChild?.data['layout']
          }
        },
        error: (err) => { 
          console.log('error', err);
        }
      })
  }
  

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe()
  }
}
