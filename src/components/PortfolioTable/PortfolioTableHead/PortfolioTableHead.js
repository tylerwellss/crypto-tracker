import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

class PortfolioTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    const columnData = [
      { id: 'coin', numeric: false, disablePadding: false, label: 'Coin'},
      { id: 'price', numeric: false, disablePadding: false, label: 'Price' },
      { id: 'holdingsValue', numeric: false, disablePadding: false, label: 'Holdings Value' },
      { id: 'amount', numeric: false, disablePadding: false, label: 'Amount Held' },
      { id: 'market_cap', numeric: false, disablePadding: false, label: 'Market Cap' },
      { id: 'volume', numeric: false, disablePadding: false, label: '24h Volume' },
      { id: 'cap24hrChange', numeric: false, disablePadding: false, label: '24h Change' },
    ];

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

export default PortfolioTableHead;