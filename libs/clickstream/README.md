# ClickstreamService

## Overview

The `ClickstreamService` is an Angular service for providing AWS Clickstream analytics to track user behavior in a web application. This service utilizes the AWS Clickstream Analytics SDK to capture and record user interactions.

For more information, see the [AWS Clickstream Analytics SDK documentation](https://docs.aws.amazon.com/solutions/latest/clickstream-analytics-on-aws/web-sdk.html).

## Installation

Install the package using npm:

```bash
npm install @aws/clickstream-web
Usage
Import the ClickstreamService in your Angular module:
typescript
Copy code
import { NgModule } from '@angular/core';
import { ClickstreamService } from './clickstream.service';

@NgModule({
  providers: [ClickstreamService]
})
export class AppModule { }
Initialize the service with your Clickstream configuration in your application's entry point, such as app.component.ts:
typescript
Copy code
import { Component, OnInit } from '@angular/core';
import { ClickstreamService } from './clickstream.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private clickstreamService: ClickstreamService) {}

  ngOnInit(): void {
    this.clickstreamService.init({
      appId: 'yourAppId',
      endpoint: 'yourEndpoint',
      globalAttributes: {
        userRole: 'admin',
        locale: 'en-US'
      }
    });
  }
}
Use the service methods to add global attributes, track events, set user ID, and set user attributes throughout your application:
typescript
Copy code
import { Component, OnInit } from '@angular/core';
import { ClickstreamService } from './clickstream.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private clickstreamService: ClickstreamService) {}

  ngOnInit(): void {
    this.clickstreamService.init({
      appId: 'yourAppId',
      endpoint: 'yourEndpoint',
      globalAttributes: {
        userRole: 'admin',
        locale: 'en-US'
      }
    });

    // Add global attribute
    this.clickstreamService.addGlobalAttribute({
      userRole: 'admin',
      locale: 'en-US'
    });

    // Track event
    this.clickstreamService.trackEvent({
      name: 'PageView',
      attributes: {
        pageName: 'Home',
        pageTitle: 'Welcome to our website'
      }
    });

    // Set user ID
    this.clickstreamService.setUserId('12345');

    // Set user attributes
    this.clickstreamService.setUserAttribute({
      age: 30,
      gender: 'male'
    });
  }
}
API Reference
Methods
init(config: ClickstreamConfiguration): void
Initializes the clickstream service with the provided parameters.

config: Configuration object containing appId, endpoint, and optional globalAttributes.
addGlobalAttribute(attributes: ClickstreamAttribute): void
Adds global attributes to be included with every recorded event.

attributes: Global attributes to be added.
trackEvent(event: ClickstreamEvent): void
Records a clickstream event.

event: The clickstream event to be recorded.
setUserId(userId: string | null): void
Sets the user ID for clickstream analytics.

userId: The user ID to be set.
setUserAttribute(attributes: ClickstreamAttribute): void
Sets user attributes for clickstream analytics.

attributes: The user attributes to be set.
License
This project is licensed under the Apache License 2.0. See the LICENSE file for details.

css
Copy code

This Markdown formatted content can be copied and pasted into a `.md` file as a README.
```
