import * as React from 'react';
import axiosInstance from "../../axios-instance";
import PvLogsTable from "./pvLogsTable";
import {convertTimeStamp} from "../parametersSelector";

const columns = [
    {name: 'id', title: 'Id'},
    {name: 'temperature_average', title: 'temperature average (kelvin)'},
    {name: 'chiller', title: 'chiller'},
    {name: 'time_count', title: 'time count (seconds)'},
    {name: 'power_usage', title: 'power usage (watt)'},
    {name: 'time', title: 'time' , getCellValue: (row) => convertTimeStamp(row.time)},
]
const getPvLogs = async (query) => (await axiosInstance.get('/pv', {params: query})).data;

export const SystemPvsTable = (props) => (
    <PvLogsTable table_type={1} parametersId={props.parametersId} columns={columns} getPvLogs={getPvLogs}/>
)