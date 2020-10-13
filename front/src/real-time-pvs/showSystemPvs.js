import * as React from 'react';
import {getSystemParameters} from "./getSystemPvs.api";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AverageTemperatureChart from "./averageTemperatureChart";
import PressureChart from "./pressureChart";
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import ChillerLamp from "./chillerLamp";

class ShowSystemPvs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {temperatureAverages: [], pressures: [], Chiller: false , time_count: 0 , power_usage_display: 0}
    }

    addTemperatureAverage = (average) => this.setState({temperatureAverages: addItemToChart(average)(this.state.temperatureAverages)})
    addPressure = (pressure) => this.setState({pressures: addItemToChart(pressure)(this.state.pressures) })

    componentDidMount() {
        setInterval(this.getParameters, 5000)
    }

    getParameters = async () => {
        try {

            const {Chiller, Power_Usage_Display, Pressure, Temperature_Average, Time_Count} = await getSystemParameters();

            this.addTemperatureAverage(Temperature_Average);
            this.addPressure(Pressure);
            this.setState({Chiller: convertNumToBool(Chiller) , time_count: Time_Count , power_usage_display: Power_Usage_Display})

        } catch (e) {
            console.error(e)
        }
    }

    render() {
        return (
            <div>
                <div style={{display: 'flex' , flexDirection: 'row' , width: '100%'}}>

                    <div style={{width: '100%'}}>
                        <AverageTemperatureChart categories={categories} data={this.state.temperatureAverages}/>
                    </div>

                    <div style={{width: '100%'}}>
                        <PressureChart categories={categories} data={this.state.pressures}/>
                    </div>

                </div>

                <div style={{display: 'flex' , flexDirection: 'row' , width: '100%'}}>

                    <div style={{width: '100%'}}>
                        <ChillerLamp on={this.state.Chiller}/>
                    </div>

                    <div style={{width: '100%' , alignItems: 'center' , justifyContent:'center'}}>
                        <Card>
                            <CardContent>
                                <Typography>
                                    Time Count: {this.state.time_count}
                                </Typography>
                                <Typography>
                                    Power Usage Display: {this.state.power_usage_display}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </div>

            </div>
        )
    }


}

const addItemToChart = (item) => (chartData) => (
    [
        ...(chartData.length > 20 ?
            [...chartData].slice(1, chartData.length)
            : [...chartData]), item]
)

const categories = _.range(20).map(item => String(item))
const convertNumToBool = (number) => (number == 1);

export default ShowSystemPvs;