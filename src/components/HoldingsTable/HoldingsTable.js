import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import './HoldingsTable.css'
import Icon from '@material-ui/core/Icon';
import HoldingsTableHead from './HoldingsTableHead/HoldingsTableHead';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

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
      page: 0,
      rowsPerPage: 100,
    };
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
    this.props.onDelete(localStorage.getItem('userId'), idToDelete);
    this.props.onFetchPortfolio(localStorage.getItem('userId'));
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
        this.props.holdings
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
              rowCount={this.props.holdings.length}
            />
            <TableBody>
              {table}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={this.props.holdings.length}
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

const mapStateToProps = state => {
  return {
    holdings: state.portfolio.holdings,
    loading: state.portfolio.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDelete: (userId, coinId) => dispatch(actions.deleteCoin(userId, coinId)),
    onFetchPortfolio: (userId) => dispatch(actions.fetchPortfolio(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HoldingsTable);