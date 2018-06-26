import React from 'react';
import './CoinBrief.css'

const coinBrief = (props) => {
  const numberWithCommas = (x, type) => {
    return type === 'noDecimals'
    ?  x.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div className="CoinBrief FlexRow">
      <div className="FlexColumn FlexAlignCenter CoinImageContainer">
        <img src="http://via.placeholder.com/75x75" alt="CoinImage" className="CoinImage"/>
      </div>
      <div className="FlexColumn FlexVertCenter">
        <p style={{'color':'gray','fontSize':'16px'}}>({props.coinData.id})</p>
        <p style={{'fontWeight':'bold','fontSize':'38px'}}>{props.coinData.display_name}</p>
      </div>
      <div className="FlexColumn FlexVertCenter">
        <p className={props.coinData.cap24hrChange > 0 ? 'PositiveCoinChange' : 'NegativeCoinChange'}>{props.coinData.cap24hrChange}%<span style={{'fontSize':'8px', 'marginLeft':'5px', 'color':'gray'}}>24h Change</span></p>
        <p style={{'fontSize':'38px', 'fontWeight':'bold'}}>${numberWithCommas(props.coinData.price)}</p>
      </div>
      <div className="FlexColumn FlexVertCenter">
        <div className="FlexRow">
          <div className="FlexColumn" style={{'textAlign':'right','fontWeight':'bold'}}>
            <p>${numberWithCommas(props.coinData.market_cap, 'noDecimals')}</p>
            <p>${numberWithCommas(props.coinData.volume, 'noDecimals')}</p>
            <p>{numberWithCommas(props.coinData.supply, 'noDecimals')}</p>
          </div>
          <div className="FlexColumn" style={{'textAlign':'left','paddingLeft':'10px'}}>
            <p>Market Cap</p>
            <p>24h Volume</p>
            <p>Circulating Supply</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default coinBrief;