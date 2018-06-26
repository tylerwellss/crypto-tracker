import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import './HoldingsTable.css'
import axios from 'axios';
import Icon from '@material-ui/core/Icon';
import HoldingsTableHead from './HoldingsTableHead/HoldingsTableHead';

const getSorting = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

class HoldingsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'desc',
      orderBy: 'amount',
      holdings: [],
      page: 0,
      rowsPerPage: 100,
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({loading: true})
    // TODO: Use Redux
    axios.get('https://track-my-crypto.firebaseio.com/portfolios/' + localStorage.getItem('userId') + '/holdings.json')
      .then(response => {
        let fetchedHoldings = [];
        for (let key in response.data) {
          fetchedHoldings.push({
            id: key,
            ...response.data[key],
        })};
        this.setState({holdings: fetchedHoldings, loading: false})
      })
      .catch(error => {
        this.setState({loading: false})
      })
    }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleDelete = (idToDelete) => {
    this.setState({loading: true})
    axios.delete('https://track-my-crypto.firebaseio.com/portfolios/' + localStorage.getItem('userId') + '/holdings/' + idToDelete + '.json');
    this.setState({loading: false})
  }

  render() {
      // To add commas to big numbers
    const { order, orderBy, rowsPerPage, page } = this.state;

    let table = undefined;

    if (this.state.loading) {
      table = (
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      )
    } else {
      table = (
        this.state.holdings
          .sort(getSorting(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((n, index) => {
            return (
              <TableRow
                hover
                tabIndex={-1}
                key={index}
              >
              <TableCell>{n.coin}</TableCell>
              <TableCell>{n.amount}</TableCell>
              <TableCell onClick={(id) => this.handleDelete(n.id)}><Icon>delete</Icon></TableCell>
              </TableRow>
            );
          })
      )
    }

    return (
      <div className="HoldingsTable"> 
        <p><strong>Your current holdings</strong></p> 
        <div >
          <Table aria-labelledby="tableTitle">
            <HoldingsTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={this.state.holdings.length}
            />
            <TableBody>
              {table}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={this.state.holdings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
}

export default HoldingsTable;