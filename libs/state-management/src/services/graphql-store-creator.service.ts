import { Injectable } from '@angular/core';
import { Apollo, TypedDocumentNode } from 'apollo-angular';
import { State } from '../state.models';
import { graphQLEntityStore } from '../stores/api/graphql-entity-store-creator';

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
  public createEntityStore = <t>(
    config: State.ConfigEntity<t>,
    GetDocument: TypedDocumentNode<t, unknown>,
    CreateDocument: TypedDocumentNode<t, unknown>
  ) => {
    const store = new graphQLEntityStore<t>(
      this.apollo,
      config,
      GetDocument,
      CreateDocument
    );
    // Set unique IDs
    return store;
  };
}
