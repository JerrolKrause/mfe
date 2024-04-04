import { HttpClient } from '@angular/common/http';
import { State } from '../../state.models';
import { NtsApiStore } from './api-store';
import { mergeConfig } from './api-store.utils';
import { NtsEntityStore } from './entity-store';

/**
 * Create a curried instance of the api store creator
 *
 * @example
 * private store = ntsApiStoreCreator(this.http, { apiUrlBase: '//jsonplaceholder.typicode.com' })
 * @param http A reference to Angular's http service
 * @param configBase Default configuration for all store instances used by this creator. Will be overwritten by individual store properties
 * @returns
 */
export const ntsApiStoreCreator = (
  http: HttpClient,
  configBase?: State.ConfigEntity | State.ConfigApi | null
) => {
  // @ts-expect-error : TODO: Resolve overload typings issue. Maybe :/
  const store: {
    /**
     * Create an instance of an entity based api store. Used for managing an array of objects
     * @example
     * public users = this.store<Models.User>({ apiUrl: '/users' });
     * @param config Store configuration and options
     * @param isEntityStore Should the store create and manage entities
     * @returns
     */
    <t>(config: State.ConfigEntity, isEntityStore?: true): NtsEntityStore<t>;
    /**
     * Create an instance of a non-entity based api store. Used for managing all none entity types
     * @example
     * public users = this.store<Models.User>({ apiUrl: '/users' }, false);
     * @param config Store configuration and options
     * @param isEntityStore Should the store create and manage entities
     * @returns
     */
    <t>(config: State.ConfigApi<t>, isEntityStore?: false): NtsApiStore<t>;
  } = <t>(
    config: State.ConfigApi<t> | State.ConfigEntity<t>,
    isEntityStore = true
  ) =>
    isEntityStore
      ? new NtsEntityStore<t>(
          http,
          mergeConfig(
            (configBase as State.ConfigEntity) || {},
            config as State.ConfigEntity
          )
        )
      : new NtsApiStore<t>(http, mergeConfig(configBase || {}, config));
  return store;
};
