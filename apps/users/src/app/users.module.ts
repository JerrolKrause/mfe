import { MasterpageModule } from '$masterpage';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApiService } from './shared/stores/api.service';
import { UsersComponent } from './users.component';
import { userRoutes } from './users.routes';

// If including graph/apollo in a feature module, ensure that any service/component using it is not using root
// IE for a service: @Injectable() not @Injectable({ providedIn: 'root' })
// This will chunk/lazy load Apollo independently from the main bundle

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
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(userRoutes),
    MasterpageModule,
    ApolloModule,
  ],
  providers: [
    ApiService,
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
  bootstrap: [UsersComponent],
})
export class UsersModule {}
