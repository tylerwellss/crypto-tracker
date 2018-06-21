import React from 'react';
import './CoinBrief.css'

const coinBrief = (props) => {
  return (
    <div className="CoinBrief FlexRow">
      <div className="FlexColumn FlexAlignCenter CoinImageContainer">
        <img src="http://via.placeholder.com/75x75" alt="CoinImage" className="CoinImage"/>
      </div>
      <div className="FlexColumn FlexVertCenter">
        <p style={{'color':'gray','fontSize':'12px'}}>({props.coinData.id})</p>
        <p style={{'fontWeight':'bold','fontSize':'38px'}}>{props.coinData.display_name}</p>
      </div>
      <div className="FlexColumn FlexVertCenter">
        <p style={{'fontSize':'12px', 'fontWeight':'bold', 'color':'green'}}>{props.coinData.cap24hrChange}%<span style={{'fontSize':'8px', 'marginLeft':'5px', 'color':'gray'}}>24h Change</span></p>
        <p style={{'fontSize':'38px', 'fontWeight':'bold'}}>${props.coinData.price}</p>
      </div>
    </div>
  );
};

export default coinBrief;