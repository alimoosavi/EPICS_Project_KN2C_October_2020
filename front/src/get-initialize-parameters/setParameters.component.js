import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {blue} from '@material-ui/core/colors';
import {InputLabel} from '@material-ui/core';
import {getParametersApi, setParametersApi} from "./setParameters.api";

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    list: {
        display: 'flex',
        flexDirection: 'column'
    }
});



const ParameterDialog = (props) => {

    const [parameters, setParameters] = React.useState({threshold: 0, powerph: 0, volume: 0, mole: 0})

    const setParameter = (parameter, value) => setParameters({...parameters, [parameter]: value})

    const getPrameters = async () => {
        try {
            setParameters(await getParametersApi());
        } catch (e) {
            console.error(e);
        }
    }

    const submitParameters = async () => {
        try {
            console.log(parameters)
            await setParametersApi({...parameters , time: new Date().getTime()});
        } catch (e) {
            console.error(e)
        }
    }

    useEffect( () => {
        getPrameters()
        return () => {
            console.log("This will be logged on unmount");
        }
    } , []);

    return (

        <div>
            <List>
                {/*export const parameterNames = ['threshold', 'powerph', 'volume', 'mole'];*/}
                <>
                <InputLabel>
                    threshold (kelvin)
                </InputLabel>
                <TextField
                    type={"number"}
                    value={parameters.threshold}
                    onChange={event => setParameter('threshold', event.target.value)}
                    variant="outlined"
                />
                </>

                <>
                    <InputLabel>
                        powerph (watt)
                    </InputLabel>
                    <TextField
                        type={"number"}
                        value={parameters.powerph}
                        onChange={event => setParameter('powerph', event.target.value)}
                        variant="outlined"
                    />
                </>

                <>
                    <InputLabel>
                        volume (cubic meters)
                    </InputLabel>
                    <TextField
                        type={"number"}
                        value={parameters.volume}
                        onChange={event => setParameter('volume', event.target.value)}
                        variant="outlined"
                    />
                </>

                <>
                    <InputLabel>
                        mole (moles)
                    </InputLabel>
                    <TextField
                        type={"number"}
                        value={parameters.mole}
                        onChange={event => setParameter('mole', event.target.value)}
                        variant="outlined"
                    />
                </>

            </List>

            <Button variant="contained" color="primary" onClick={submitParameters}>
                submit parameters
            </Button>
        </div>
    );
}

export default ParameterDialog;