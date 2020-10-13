import * as React from 'react';
import ParametersSelector, {convertTimeStamp} from "./parametersSelector";
import axiosInstance from "../axios-instance";

import {PressureTable} from "./tables/pressureTable";
import {ThermometerTable} from "./tables/thermometerTable";
import {SystemPvsTable} from "./tables/systemPvsTable";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {CardHeader} from '@material-ui/core';

const getParametersLogs = async () => (await axiosInstance.get('/log/parameters')).data;

export const PressureTab = (selectedParameters) => (<PressureTable parametersId={selectedParameters}/>)
export const ThermometerTab = (selectedParameters) => (<ThermometerTable parametersId={selectedParameters}/>)
export const ParametersTab = (selectedParameters) => (<SystemPvsTable parametersId={selectedParameters}/>)

const ShowSelectedParameters = (props) => (
    <Card style={{
        width: 300,
        height: 300,
        padding: 30,
        margin: 30
    }}>

        <CardHeader title={"selected parameters information"}/>

        <CardContent>
            {Object.keys(props.parameters).map(key =>
                (
                    <Typography key={key} color="textSecondary">
                        {key} : {props.parameters[key]}
                    </Typography>
                )
            )}
        </CardContent>
    </Card>
)

export default class PvLogs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {parametersLogs: [], selectedParameters: null}
    }

    componentDidMount() {
        this.getParameters();
    }

    getParameters = async () => {
        try {
            const parametersLogs = await getParametersLogs()
            this.setState({parametersLogs})
        } catch (e) {
            console.error(e)
        }
    }

    handleSelectedParametersChange = (selectedParameters) => this.setState({selectedParameters});

    render() {

        const {parametersLogs, selectedParameters} = this.state;
        const {component} = this.props;

       
        return (

            <div>
                <ParametersSelector parametersLogs={parametersLogs} id={selectedParameters}
                                    handleChange={this.handleSelectedParametersChange}/>

                {parametersLogs.length && selectedParameters &&
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <ShowSelectedParameters
                        parameters={convertSelectedParametersInfoTime(findSelectedParameters(parametersLogs)(selectedParameters))
                        }/>
                    {component(selectedParameters)}
                </div>}
            </div>

        )
    }
}

const convertSelectedParametersInfoTime = (info) => ({...info, time: convertTimeStamp(info.time)})
const findSelectedParameters = (parametersLogs) => (id) => parametersLogs.find(log => log.id === id);
