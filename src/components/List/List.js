import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './List.css';
import { showDetail } from '../../actions';

const List = ({ showDetail, covid: { countries, loading } }) => {
  const renderTableHeader = () => {
    let header = [
      'Country',
      'Total Confirmed',
      'Total Deaths',
      'Total Recovered',
    ];
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };
  const renderTableData = () => {
    return countries.map((country, index) => {
      const {
        Country,
        CountryCode,
        Slug,
        TotalConfirmed,
        TotalDeaths,
        TotalRecovered,
      } = country;
      return (
        <tr
          className='list-item'
          key={index}
          onClick={(e) => showDetail(CountryCode, Slug)}
        >
          <td>{Country}</td>
          <td>{TotalConfirmed}</td>
          <td>{TotalDeaths}</td>
          <td>{TotalRecovered}</td>
        </tr>
      );
    });
  };

  return (
    <div className='container'>
      <h1 className='title'>Covid By Countries</h1>
      <div className='container-inner'>
        <table id='countries'>
          <tbody>
            <tr>{renderTableHeader()}</tr>
            {renderTableData()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

List.propTypes = {
  covid: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  covid: state.covid,
});

export default React.memo(connect(mapStateToProps, { showDetail })(List));
