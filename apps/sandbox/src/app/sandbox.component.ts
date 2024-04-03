import { StateManagementService } from '$state-management';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, take } from 'rxjs';

interface State {
  waiting: boolean;
  success: boolean;
  error: null | string;
}

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrl: './sandbox.component.scss',
})
export class SandboxComponent implements OnInit {
  private storeCreator = this.sms.createBaseStore({
    apiUrlBase: '//jsonplaceholder.typicode.com',
  });
  public usersStore = this.storeCreator({ apiUrl: '/users', uniqueId: 'id' });

  public state$ = new BehaviorSubject<State>({
    waiting: false,
    success: false,
    error: null,
  });

  public form = this.fb.group({
    tbd: ['Surprise me', []],
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private sms: StateManagementService
  ) {}

  ngOnInit(): void {
    this.usersStore.state$.subscribe((s) => console.log(s));
    // Get item
    return;
    /**
    this.http.get('').subscribe((r) => {
      console.log(r);
      this.form.patchValue(r);
    });
     */
  }

  public submit() {
    const val = this.form.getRawValue();
    console.log(val);
    // this.http.post('', val).subscribe();
  }

  public stateChange(stateNew: Partial<State>) {
    this.state$
      .pipe(take(1))
      .subscribe((stateOld) => this.state$.next({ ...stateOld, ...stateNew }));
  }
}
