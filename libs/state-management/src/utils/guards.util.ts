import { State } from '../state.models';
import { initialEntityState, initialState } from './initialState';
const keysApi = Object.keys(initialState).sort();
const keysEntity = Object.keys(initialEntityState).sort();

declare const process: any;

/**
 * Node JS check for SSR
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNode =
  typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;
export const isBrowser = !isNode;

/**
 * Typeguard for actions, checks action and ensures payload is properly typed
 * @param action
 * @param actionCreator
 * @returns
 */
export const isActionType = <t>(
  action: State.Action,
  actionCreator: State.ActionCreator
): action is State.Action<t> => {
  return action.type === actionCreator.type;
};

/**
 * Is this action an api action
 * @param action
 * @returns
 */
export const isActionApi = <t>(
  action: State.Action<t> | State.ApiAction<t>
): action is State.ApiAction<t> => !!(action as State.ApiAction<t>).storeId;

/**
 * Typeguard for checking if the input is an api state type
 * @param obj
 */
export const isApiState = (
  obj: any | null | undefined
): obj is State.ApiState => {
  // If null or not an object
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return false;
  }
  const entityKeys = Object.keys(obj).sort();

  const isMatch = true;
  for (let i = 0; i < keysApi.length; i++) {
    const key = keysApi[i];
    if (!entityKeys.includes(key)) {
      return false;
    }
  }

  return isMatch;
};

/**
 * Typeguard for checking if the input is an entity state type
 * @param obj
 */
export const isEntityState = (
  obj: any | null | undefined
): obj is State.ApiState => {
  // If null or not an object
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return false;
  }
  const entityKeys = Object.keys(obj).sort();

  const isMatch = true;
  for (let i = 0; i < keysEntity.length; i++) {
    const key = keysEntity[i];
    if (!entityKeys.includes(key)) {
      return false;
    }
  }

  return isMatch;
};
