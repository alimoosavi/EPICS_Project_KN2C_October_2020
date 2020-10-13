import * as React from 'react';
import ReactHighcharts from 'react-highcharts';
import _ from 'lodash';

const upperBound = 800;
const generateUpperBoundData = (length) => _.range(length).map(item => upperBound);

const AverageTemperatureChart = (props) => (<ReactHighcharts  config={{
    title: {
        text: 'Temperature Average Chart'
    },
    yAxis: {
        title: {
            text: 'kelvin'
        }
    },
    xAxis: {
        title:{text: 'latest records'},
        categories: props.categories},
    series: [{name: 'temperature average' , data: props.data , color: 'green'} , {name: 'upper bound' , data: generateUpperBoundData(props.data.length) , color: 'red'}]
}}/>)

export default AverageTemperatureChart;