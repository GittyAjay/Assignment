import {STATE_TYPE, PAYLOAD_TYPE} from './types';

export interface reducer_interface {
  state: STATE_TYPE;
  payload: PAYLOAD_TYPE;
}
export interface home_interface {
  getGenreList: Function;
}

export interface store_reducers {
  homePageData: any;
}
