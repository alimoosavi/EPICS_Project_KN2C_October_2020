import * as React from 'react';
import axiosInstance from "../../axios-instance";
import PvLogsTable from "./pvLogsTable";
import {convertTimeStamp} from "../parametersSelector";


const columns = [
    {name: 'thermometer_1', title: 'thermometer 1 (kelvin)'},
    {name: 'thermometer_2', title: 'thermometer 2 (kelvin)'},
    {name: 'thermometer_3', title: 'thermometer 3 (kelvin)'},
    {name: 'time', title: 'time', getCellValue: (row) => convertTimeStamp(row.time)},
]
const getPvLogs = async (query) => (await axiosInstance.get('/pv', {params: query})).data;

export const ThermometerTable = (props) => (
    <PvLogsTable table_type={3} parametersId={props.parametersId} columns={columns} getPvLogs={getPvLogs}/>
)