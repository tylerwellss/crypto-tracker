import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import './DiversificationTable.css'

const getSorting = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
  { id: 'coin', numeric: false, disablePadding: false, label: 'Coin'},
  { id: 'percentage', numeric: false, disablePadding: false, label: '% of Portfolio' },
];

class DiversificationTableHead extends React.Component {
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

class DiversificationTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'desc',
      orderBy: 'percentage',
      holdings: [],
      page: 0,
      rowsPerPage: 100,
      loading: true,
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

  render() {
    const { order, orderBy, rowsPerPage, page } = this.state;
      let table = (
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
                <TableCell>{n.coin}</TableCell>
                <TableCell>{((n.holdingsValue / this.props.portfolioValue) * 100).toFixed(2)}%</TableCell>
              </TableRow>
            );
          })
      )
            
      table = (
        <div>
        <div>
          <Table aria-labelledby="tableTitle">
            <DiversificationTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={this.props.data.length}
            />
            <TableBody>
              {table}
            </TableBody>
          </Table>
        </div>
        </div>
      )

    return (
      <div className="DiversificationTable"> 
        {table}
      </div>
    );
  }
}

export default DiversificationTable;