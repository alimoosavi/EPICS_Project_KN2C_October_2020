import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class ChillerLamp extends React.Component {
    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Typography style={{margin: 15}}>
                    Chiller Alarm
                </Typography>
                <Card style={{
                    width: 200,
                    height: 200,
                    borderStyle: "solid",
                    borderRadius: '100%',
                    borderWidth: 20,
                    borderColor: "red",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <CardContent>
                        {
                            this.props.on && <div style={{
                                width: 150,
                                height: 150,
                                borderRadius: '100%',
                                backgroundColor: 'red'
                            }}/>
                        }
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default ChillerLamp;