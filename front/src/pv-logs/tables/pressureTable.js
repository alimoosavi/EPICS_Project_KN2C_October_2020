import * as React from 'react';
import axiosInstance from "../../axios-instance";
import PvLogsTable from "./pvLogsTable";
import {convertTimeStamp} from "../parametersSelector";

const sevr_states = ['No Alarm'
    , 'Minor'
    , 'Major'
    , 'Invalid'
]

const stat_states = [
    'No Alarm',
    'Read',
    'Write',
    'HiHi',
    'High',
    'LoLo',
    'Low',
    'State',
    'Cos',
    'Comm',
    'TimeOut',
    'HwLimit',
    'Calc',
    'Scan',
    'Link',
    'Soft',
    'Bad Sub',
    'Udf',
    'Disable',
    'Simm',
    'Read Access',
]

const columns = [
    {name: 'pressure', title: 'pressure (pascal)'},
    {name: 'pressure_stat', title: 'pressure stat' , getCellValue: (row) => stat_states[row.pressure_stat]},
    {name: 'pressure_sevr', title: 'pressure sevr' , getCellValue: (row) => sevr_states[row.pressure_sevr]},
    {name: 'time', title: 'time', getCellValue: (row) => convertTimeStamp(row.time)},
]
const getPvLogs = async (query) => (await axiosInstance.get('/pv', {params: query})).data;

export const PressureTable = (props) => (
    <PvLogsTable table_type={2} parametersId={props.parametersId} columns={columns} getPvLogs={getPvLogs}/>
)