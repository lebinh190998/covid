import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Global.css';
import earth from '../../img/earth.gif';

const Global = ({ covid: { global } }) => {
  const {
    NewConfirmed,
    NewDeaths,
    NewRecovered,
    TotalConfirmed,
    TotalDeaths,
    TotalRecovered,
  } = global;
  return (
    <div className='container'>
      <h1 className='title'>Covid In Global</h1>
      <div style={{ height: '200px', width: '200px', paddingBottom: '50px' }}>
        <img
          src={earth}
          style={{
            width: '100%',
            height: '100%',
          }}
          alt={`earth gif`}
        />
      </div>
      <div className='container-inner'>
        <div className='tab'>
          <div className='report'>
            Total Confirmed: <b>{TotalConfirmed}</b>
          </div>
          <div className='report'>
            Total Deaths: <b style={{ color: '#CC6666' }}>{TotalDeaths}</b>
          </div>
          <div className='report'>
            Total Recovered:{' '}
            <b style={{ color: '#5AC18E' }}>{TotalRecovered}</b>
          </div>
        </div>
        <div className='tab'>
          <div className='report'>
            New Confirmed: <b>{NewConfirmed}</b>
          </div>
          <div className='report'>
            New Deaths: <b style={{ color: '#CC6666' }}>{NewDeaths} </b>
          </div>
          <div className='report'>
            New Recovered: <b style={{ color: '#5AC18E' }}>{NewRecovered} </b>
          </div>
        </div>
      </div>
    </div>
  );
};

Global.propTypes = {
  covid: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  covid: state.covid,
});

export default React.memo(connect(mapStateToProps, {})(Global));
