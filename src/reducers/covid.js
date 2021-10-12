import { GET_DATA, SHOW_DETAIL, CLOSE_DETAIL, SET_SPINNER } from '../types';

export const initialState = {
  countries: [],
  date: null,
  global: {},
  country: null,
  trigger: false,
  labels: [],
  active: [],
  confirmed: [],
  deaths: [],
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_DATA:
      return {
        ...state,
        countries: payload.Countries,
        date: payload.Date,
        global: payload.Global,
        loading: false,
      };
    case SHOW_DETAIL:
      return {
        ...state,
        country: payload.country,
        labels: payload.labels,
        active: payload.active,
        confirmed: payload.confirmed,
        deaths: payload.deaths,
        trigger: true,
        loading: false,
      };
    case CLOSE_DETAIL:
      return {
        ...state,
        trigger: false,
      };
    case SET_SPINNER:
      return {
        ...state,
        loading: payload.toggle,
      };
    default:
      return state;
  }
}
