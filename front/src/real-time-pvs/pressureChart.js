import * as React from 'react';
import ReactHighcharts from 'react-highcharts';
import _ from 'lodash';

const upperBound = 1000;
const generateUpperBoundData = (length) => _.range(length).map(item => upperBound);

const lowerBound = 900;
const generateLowerBoundData = (length) => _.range(length).map(item => lowerBound);

const PressureChart = (props) => (<ReactHighcharts config={{
    title: {
        text: 'Pressure Chart'
    },
    xAxis: {
            title:{text: 'latest records'},
        categories: props.categories},
    yAxis: {
        title: {
            text: 'pascal'
        }
    },
    series: [
        {name: 'pressure' , data: props.data , color: 'green'} ,
        {name: 'upper bound' , data: generateUpperBoundData(props.data.length) , color: 'red'},
        {name: 'lower bound' , data: generateLowerBoundData(props.data.length) , color: 'orange'},
    ]
}}/>)

export default PressureChart;