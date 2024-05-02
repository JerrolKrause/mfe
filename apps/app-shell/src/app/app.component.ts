import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private querySubscription!: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.querySubscription = this.route.queryParams.subscribe((params) => {
      const src_pid = params['src_pid'];
      const src_sid = params['src_sid'];

      if (src_pid !== undefined) {
        sessionStorage.setItem('src_pid', src_pid);
      }

      if (src_sid !== undefined) {
        sessionStorage.setItem('src_sid', src_sid);
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leak
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
