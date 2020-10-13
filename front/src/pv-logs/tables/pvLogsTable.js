import React from 'react';
import Paper from '@material-ui/core/Paper';
import {Grid, PagingPanel, Table, TableHeaderRow,} from '@devexpress/dx-react-grid-material-ui';
import {CustomPaging, PagingState,} from '@devexpress/dx-react-grid';


export default class PvLogsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: {
                pageSize: 20,
                pageNumber: 0,
                table_type: props.table_type,
                parametersId: props.parametersId
            },
            data: {data: [], count: 0}
        }
    }

    retPvLogs = async (query) => (this.setState({data: await this.props.getPvLogs(query)}))

    componentDidMount() {
        this.retPvLogs(this.state.query)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.parametersId !== this.props.parametersId) {
            this.setState({query: {...this.state.query, parametersId: this.props.parametersId}})
            this.retPvLogs({...this.state.query, parametersId: this.props.parametersId})
        }
    }

    setCurrentPage = (pageNumber) => {
        this.setState({query: {...this.state.query, pageNumber}});
        this.retPvLogs({...this.state.query, pageNumber})
    }


    render() {
        const {data, query} = this.state;

        return (
            <div style={{padding: 30}}>
                <Paper>
                    <Grid
                        rows={data.data}
                        columns={this.props.columns}
                    >
                        <PagingState
                            currentPage={query.pageNumber}
                            onCurrentPageChange={this.setCurrentPage}
                            pageSize={query.pageSize}
                        />
                        <CustomPaging
                            totalCount={data.count}
                        />
                        <Table/>
                        <TableHeaderRow/>

                        <PagingPanel/>

                    </Grid>
                </Paper>
            </div>
        )
    }
}
