import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './PopUp.css';
import { closeDetail } from '../../actions';
import { Line } from 'react-chartjs-2';

const PopUp = ({
  closeDetail,
  covid: { country, labels, active, confirmed, deaths, trigger },
}) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    setData({
      labels,
      datasets: [
        {
          label: 'Active',
          data: active,
          fill: true,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
        },
        {
          label: 'Confirmed',
          data: confirmed,
          fill: false,
          borderColor: '#742774',
        },
        {
          label: 'Death',
          data: deaths,
          fill: false,
          borderColor: '#cc0000',
        },
      ],
    });
  }, [labels, active, deaths, confirmed]);
  return trigger ? (
    <div className='popup'>
      <div className='popup-inner'>
        <button className='close-btn' onClick={closeDetail}>
          x
        </button>
        <div className='info'>
          {country ? (
            <Fragment>
              <div className='flag'>
                <img
                  src={country.flags.png}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'solid 2px #e5e5e5',
                  }}
                  alt={`${country.cca2} flag`}
                />
              </div>
              <div className='stats'>
                <div className='stats-inner'>
                  <div>
                    Population: <b>{country.population}</b>
                  </div>
                  <div>
                    Capital: <b>{country.capital[0]}</b>
                  </div>
                </div>
                <div className='stats-inner'>
                  <div>
                    Region: <b>{country.region}</b>
                  </div>
                  <div>
                    Subregion: <b>{country.subregion}</b>
                  </div>
                </div>
              </div>
            </Fragment>
          ) : (
            'Country Details'
          )}
        </div>
        <div className='graph'>
          {data ? (
            <Line
              data={data}
              options={{
                scales: {
                  yAxes: [
                    {
                      display: true,
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              }}
            />
          ) : (
            'Country Graph'
          )}
        </div>
      </div>
    </div>
  ) : (
    ''
  );
};

PopUp.propTypes = {
  covid: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  covid: state.covid,
});

export default React.memo(connect(mapStateToProps, { closeDetail })(PopUp));
