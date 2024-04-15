import { MasterpageModule } from '$masterpage';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { LibsLazyLoad } from './lazy.module';

import { HttpLink } from 'apollo-angular/http';

const uri = 'https://graphqlzero.almansi.me/api';
export function createApollo(httpLink: HttpLink): ApolloClientOptions<unknown> {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MasterpageModule,
    LibsLazyLoad,
    ApolloModule,
  ],
  providers: [
    provideClientHydration(),
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
