import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Adds support for query params needed to communicate with class
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      const { src_pid, src_sid } = params;

      if (src_pid !== undefined) {
        sessionStorage.setItem('src_pid', src_pid);
      }

      if (src_sid !== undefined) {
        sessionStorage.setItem('src_sid', src_sid);
      }
    });
  }
}
