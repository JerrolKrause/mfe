import { State } from '../state.models';

export const initialState: State.ApiState = {
  loading: false,
  modifying: false,
  error: null,
  errorModify: null,
  data: false,
};

export const initialEntityState: State.ApiState = {
  ...initialState,
  entities: {},
  ids: [],
  data: null,
};
