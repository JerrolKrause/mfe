import { FormsLib } from '$forms';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable()
export class BorrowerFormService {
  public borrowerForm = this.fb.group({
    loanAmount: [],
    loanReason: [],
    name: [],
    nameFirst: [],
    nameLast: [],
    address: [],
    address2: [],
    city: [],
    state: [],
    zipCode: [],
  });

  public formOptions: FormsLib.FormOptions = {
    submitButton: {
      label: 'Continue',
    },
  };

  private routing = ['', 'loan-reason', 'borrower-info', 'address'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location
  ) {}

  /**
   * Go to the next route in series
   */
  public routeNext() {
    const currentPath = this.location.path().replace('/quoting', '');
    const currentSlug = currentPath.split('/').pop(); // Get the last segment of the current path
    const currentIndex = this.routing.findIndex((slug) => slug === currentSlug);
    const nextIndex = currentIndex + 1;
    if (nextIndex < this.routing.length) {
      const nextRoute = `/quoting/${this.routing[nextIndex]}`;
      this.router.navigate([nextRoute]);
    }
  }

  /**
   * Go to previous route in series
   */
  public routePrev() {
    const currentPath = this.location.path().replace('/quoting', '');
    const currentSlug = currentPath.split('/').pop(); // Get the last segment of the current path
    const currentIndex = this.routing.findIndex((slug) => slug === currentSlug);
    const nextIndex = currentIndex - 1; // Go back one
    if (nextIndex < this.routing.length) {
      const nextRoute = `/quoting/${this.routing[nextIndex]}`;
      this.router.navigate([nextRoute]);
    }
  }
}
