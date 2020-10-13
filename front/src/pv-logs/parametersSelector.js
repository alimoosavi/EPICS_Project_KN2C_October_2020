import * as React from 'react';
import Select from '@material-ui/core/Select';


export const convertTimeStamp = (timeStamp) => {
    const date = new Date(timeStamp);
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}
const showParameters = (parameters) => (convertTimeStamp(parameters.time))
class ParametersSelector extends React.Component {

    handleChange = (event) => this.props.handleChange(Number(event.target.value))

    render() {

        const {id, parametersLogs} = this.props;


        return (
            <Select
                native
                value={id}
                onChange={this.handleChange}
                inputProps={{
                    id: 'age-native-simple',
                }}
            >
                {
                    parametersLogs.map((log) => (
                            <option value={log.id} key={log.id}>{showParameters(log)}</option>
                        )
                    )
                }

            </Select>
        )
    }
}

export default ParametersSelector;