import React, { Component } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default class Loader extends Component {
  render() {
    return (
      <ThreeCircles
        height="100"
        width="100"
        color="#4d53a9"
        wrapperStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
        className="centr-block"
      />
    );
  }
}
