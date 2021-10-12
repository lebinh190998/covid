import { GET_DATA, SHOW_DETAIL, CLOSE_DETAIL, SET_SPINNER } from '../types';
import axios from 'axios';
import { serverURL } from './serverURL';

export const setSpinner = (toggle) => (dispatch) => {
  dispatch({
    type: SET_SPINNER,
    payload: { toggle },
  });
};

export const getData = () => async (dispatch) => {
  try {
    dispatch(setSpinner(true));
    const res = await axios.get(`${serverURL}/summary`);
    const { Countries, Date, Global } = res.data;
    //Sort countries
    Countries.sort(
      (a, b) =>
        b.TotalConfirmed - a.TotalConfirmed ||
        b.TotalDeaths - a.TotalDeaths ||
        a.TotalRecovered - b.TotalRecovered
    );
    console.log(Global);
    dispatch({
      type: GET_DATA,
      payload: { Countries, Date, Global },
    });
  } catch (err) {
    console.log(err);
  }
};

export const showDetail = (countryCode, slug) => async (dispatch) => {
  try {
    dispatch(setSpinner(true));
    const [res1, res2] = await Promise.all([
      axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`),
      axios.get(
        `${serverURL}/country/${slug}?from=2020-03-25T00:00:00Z&to=2020-04-01T00:00:00Z`
      ),
    ]);

    const labels = [];
    const active = [];
    const confirmed = [];
    const deaths = [];
    res2.data.forEach((element) => {
      let d = new Date(element.Date);
      let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
      let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
      labels.push(`${da}-${mo}`);
      active.push(element.Active);
      confirmed.push(element.Confirmed);
      deaths.push(element.Deaths);
    });

    dispatch({
      type: SHOW_DETAIL,
      payload: { country: res1.data[0], labels, active, confirmed, deaths },
    });
  } catch (err) {
    console.log(err);
  }
};

export const closeDetail = () => (dispatch) => {
  dispatch({
    type: CLOSE_DETAIL,
  });
};
