import './App.css';
import React, { Fragment, useEffect } from 'react';

import Global from './components/Global/Global';
import List from './components/List/List';
import PopUp from './components/PopUp/PopUp';
import Spinner from './utils/Spinner/Spinner';

//Redux
import { getData } from './actions/index';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const App = ({ getData, covid: { loading } }) => {
  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Fragment>
      <div className='app' />
      <div className='app-inner'>
        <Global />
        <List />
        <PopUp />
        {loading && <Spinner />}
      </div>
    </Fragment>
  );
};

App.propTypes = {
  covid: PropTypes.object.isRequired,
  getData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  covid: state.covid,
});

export default React.memo(connect(mapStateToProps, { getData })(App));
