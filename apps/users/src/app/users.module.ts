import { MasterpageModule } from '$masterpage';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { UsersComponent } from './users.component';
import { userRoutes } from './users.routes';

const uri = 'https://graphqlzero.almansi.me/api';
export function createApollo(httpLink: HttpLink): ApolloClientOptions<unknown> {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    MasterpageModule,
    ApolloModule,
  ],
  providers: [
    provideClientHydration(),
    provideClientHydration(),
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
  bootstrap: [UsersComponent],
})
export class UsersModule {}
