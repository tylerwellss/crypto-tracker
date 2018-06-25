import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import './HoldingsTable.css'
// import { Link } from 'react-router-dom';
import Spinner from '../../components/Shared/Spinner/Spinner';
import axios from 'axios';
import Icon from '@material-ui/core/Icon';

const getSorting = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
  { id: 'coin', numeric: false, disablePadding: false, label: 'Coin'},
  { id: 'amount', numeric: false, disablePadding: false, label: 'Amount' },
  { id: 'delete', numeric: false, disablePadding: false, label: 'Delete' },
];

class HoldingsTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                style={column.style}
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    <strong>{column.label}</strong>
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
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
    // TODO: Move this to redux
    axios.get('https://track-my-crypto.firebaseio.com/portfolios/' + localStorage.getItem('userId') + '/holdings.json')
      .then(response => {
        let fetchedHoldings = [];
        for (let key in response.data) {
          fetchedHoldings.push({
            ...response.data[key],
        })};
        this.setState({holdings: fetchedHoldings, loading: false})
      })
      .catch(error => {
        console.log(error);
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

  render() {
      // To add commas to big numbers
    const numberWithCommas = (x, type) => {
      return type === 'noDecimals'
      ?  x.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    const { data, order, orderBy, rowsPerPage, page } = this.state;

    let table = undefined;
    let spinner = <Spinner />;

    if (this.state.loading) {
      spinner = <Spinner />;
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
      spinner = null;
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
              <TableCell><Icon>delete</Icon></TableCell>
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
        {spinner}
      </div>
    );
  }
}

export default HoldingsTable;