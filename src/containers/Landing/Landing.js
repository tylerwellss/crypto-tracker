import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import * as data from './MockData.json'
import './Landing.css'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Shared/Spinner/Spinner';
import axios from 'axios';

const getSorting = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
  { id: 'rank', numeric: true, disablePadding: false, label: 'Rank', style: {'padding':'0', 'margin':'0', 'textAlign':'left', 'flexDirection':'row'}},
  { id: 'long', numeric: true, disablePadding: false, label: 'Name' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
  { id: 'mktcap', numeric: true, disablePadding: false, label: 'Market Cap' },
  { id: 'volume', numeric: true, disablePadding: false, label: '24 Volume' },
  { id: 'cap24hrChange', numeric: true, disablePadding: false, label: '24h Change' },
];

class LandingHead extends React.Component {
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

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'desc',
      orderBy: 'mktcap',
      data: [],
      page: 0,
      rowsPerPage: 100,
      searchQuery: '',
      globalData: null,
    };
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  componentDidMount() {
    axios.get('http://coincap.io/front')
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          response.data[i].rank = i + 1;
        }
        this.setState({data: response.data})
      })
    axios.get('http://coincap.io/global')
      .then(response => {
        this.setState({globalData: response.data});
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

  handleSearchInput = (event) => {
    if (event.target.value === '' || event.target.value === undefined || event.target.value === null) {
      this.setState({data: data, searchQuery: event.target.value})
    } else {
      let filteredData = data.filter(el => {
        return el.long.toLowerCase() === event.target.value.toLowerCase() || el.short.toLowerCase() === event.target.value.toLowerCase() ? el : null;
      })
      this.setState({data: filteredData, searchQuery: event.target.value})
    }
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

    if (this.state.data.length < 1) {
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
        data
          .sort(getSorting(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((n, index) => {
            let textColor = undefined
            if (n.cap24hrChange < 0) {
              textColor = 'red'
            } else {
              textColor = 'green'
            }
            return (
              <TableRow
                hover
                tabIndex={-1}
                key={index}
              >
                <TableCell style={{'padding':'0 0 0 0', 'textAlign':'left'}} numeric>
                  {n.rank}
                </TableCell>
                <TableCell numeric className="CurrencyName"><span className="CurrencyShort">{n.short}</span><Link className="Link" to={'/cryptocurrency/' + n.short.toLowerCase()}>{n.long}</Link></TableCell>
                <TableCell numeric>${numberWithCommas(n.price)}</TableCell>
                <TableCell numeric>${numberWithCommas(n.mktcap, 'noDecimals')}</TableCell>
                <TableCell numeric>${numberWithCommas(n.volume, 'noDecimals')}</TableCell>
                <TableCell style={{'color':textColor}} numeric>{n.cap24hrChange}%</TableCell>
              </TableRow>
            );
          })
      )
    }

    return (
      <div className="Landing">
        <TextField 
          className="SearchInput"
          id="search"
          label="Search"
          value={this.state.searchQuery}
          helperText="Search for a specific currency"
          placeholder="XMR"
          onChange={this.handleSearchInput}
        />
        <Button onClick={this.handleSearchSubmit} variant="contained" color="primary" style={{'marginLeft':'20px'}}>
          Search
        </Button>    
        <h5>Total Market Cap: {this.state.globalData ? '$' + numberWithCommas(this.state.globalData.totalCap, 'noDecimals') : 'Loading'}</h5>    
        <div >
          <Table aria-labelledby="tableTitle">
            <LandingHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {table}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
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
        <p>Data provided by <a href="http://coincap.io">CoinCap.io</a></p>
      </div>
    );
  }
}

export default Landing;