import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import {
  GraphQLStore,
  GraphQLStoreConfig,
} from '../stores/api/graphql-entity-store-creator';

@Injectable({
  providedIn: 'platform',
})
export class GraphQLStoreCreatorService {
  constructor(private apollo: Apollo) {}

  /**
   * Create a GraphQL based entity store
   * @param config
   * @param GetDocument
   * @returns
   */
  public createEntityStore = <t>(config: GraphQLStoreConfig<t>) => {
    const store = new GraphQLStore<t>(this.apollo, config);
    // Set unique IDs
    return store;
  };
}
