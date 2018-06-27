import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import Spinner from '../Shared/Spinner/Spinner';
import './PortfolioTable.css'
import PortfolioTableHead from './PortfolioTableHead/PortfolioTableHead';

const getSorting = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
  { id: 'coin', numeric: false, disablePadding: false, label: 'Coin'},
  { id: 'price', numeric: false, disablePadding: false, label: 'Price' },
  { id: 'holdingsValue', numeric: false, disablePadding: false, label: 'Holdings Value' },
  { id: 'amount', numeric: false, disablePadding: false, label: 'Amount Held' },
  { id: 'market_cap', numeric: false, disablePadding: false, label: 'Market Cap' },
  { id: 'volume', numeric: false, disablePadding: false, label: '24h Volume' },
  { id: 'cap24hrChange', numeric: false, disablePadding: false, label: '24h Change' },
];

class PortfolioTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'desc',
      orderBy: 'holdingsValue',
      page: 0,
      rowsPerPage: 100,
    };
  }

  componentDidMount() {
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
    let table = <Spinner />

    const numberWithCommas = (x, type) => {
      return type === 'noDecimals'
      ?  x.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    const { order, orderBy, rowsPerPage, page } = this.state;

    let tableRows = undefined;
    var arr = [];
    for (var key in this.props.data) {
      arr.push(this.props.data[key]);
    }

    if (!this.props.loading) {
      tableRows = (
        this.props.data
          .sort(getSorting(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((n, index) => {
            return (
              <TableRow
                hover
                tabIndex={-1}
                key={index}
              >
                <TableCell><Link to={"/cryptocurrency/" + n.coin} className="Link"><strong>{n.coin}</strong></Link></TableCell>
                <TableCell>${n.price}</TableCell>
                <TableCell>${numberWithCommas(n.holdingsValue)}</TableCell>
                <TableCell>{n.amount}</TableCell>
                <TableCell>${numberWithCommas(n.market_cap, 'noDecimals')}</TableCell>
                <TableCell>${numberWithCommas(n.volume, 'noDecimals')}</TableCell>
                <TableCell>{n.cap24hrChange}%</TableCell>
              </TableRow>
            );
          })
      )
  
      table = (
        <div>
        <p><strong>Your current holdings</strong></p> 
        <div>
          <Table aria-labelledby="tableTitle">
            <PortfolioTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={this.props.data.length}
            />
            <TableBody>
              {tableRows}
            </TableBody>
          </Table>
        </div>
        </div>
      )
    }


    return (
      <div className="PortfolioTable"> 
        {table}
      </div>
    );
  }
}

export default PortfolioTable;