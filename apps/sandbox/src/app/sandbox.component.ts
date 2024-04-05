import { StateManagementService } from '$state-management';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { filter, map, mergeMap, take } from 'rxjs';

interface Geo {
  lat?: string;
  lng?: string;
}

interface Address {
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
  geo?: Geo;
}

interface Company {
  name?: string;
  catchPhrase?: string;
  bs?: string;
}

interface User {
  id?: number | null;
  name?: string | null;
  username?: string;
  email?: string;
  address?: Address;
  phone?: string;
  website?: string;
  company?: Company;
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
  public usersStore = this.storeCreator<Partial<User>>({ apiUrl: '/users/1' });

  public form = this.fb.group({
    name: ['', []],
    id: [0, []],
  });

  constructor(
    private fb: FormBuilder,
    private sms: StateManagementService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Look at the route param and use that to load the correct user ID
    this.route.params
      .pipe(
        map((params) => params['id']),
        mergeMap((id) => this.usersStore.get({ apiUrl: `/users/${id ?? 1}` })),
        filter((x) => !!x),
        take(1)
      )
      .subscribe((user) => this.form.patchValue(user));
  }

  /**
   * Submit updated user
   */
  public submit() {
    const val = this.form.getRawValue() as Partial<User>;
    this.usersStore.put(val).subscribe(() => {
      // Add toast confirming success
      this.messageService.add({
        life: 1500,
        severity: 'success',
        summary: 'Success',
        detail: 'User Updated Successfully',
      });
    });
  }
}
