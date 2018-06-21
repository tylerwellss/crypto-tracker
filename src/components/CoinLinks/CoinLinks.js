import React, { Component } from 'react';
import * as linkData from './MockData.json';
import TwitterIcon from 'mdi-react/TwitterCircleIcon';
import FacebookIcon from 'mdi-react/FacebookBoxIcon';
import EarthIcon from 'mdi-react/EarthIcon';
import GithubIcon from 'mdi-react/GithubCircleIcon';
import RedditIcon from 'mdi-react/RedditIcon';
import BitcoinTalkIcon from 'mdi-react/BitcoinIcon';
import TelegramIcon from 'mdi-react/TelegramIcon';
import DiscordIcon from 'mdi-react/DiscordIcon';
import './CoinLinks.css'

class CoinLinks extends Component {
  state = {

  };

  render() {
    return (
      <div className="CoinLinksContainer">
        <h3>Links</h3>
          <ul style={{'listStyleType':'none'}}>
            <li className="FlexRow CoinLink">
              <EarthIcon className="Gray"/><a href={linkData.eth.website}>Website</a>
            </li>
            <li className="FlexRow CoinLink">
              <GithubIcon /><a href={linkData.eth.website}>Github</a>
            </li>
            <li className="FlexRow CoinLink">
              <TwitterIcon /><a href={linkData.eth.twitter}>Twitter</a>
            </li>
            <li className="FlexRow CoinLink">
              <RedditIcon /><a href={linkData.eth.reddit}>Reddit</a>
            </li>
            <li className="FlexRow CoinLink">
              <FacebookIcon /><a href={linkData.eth.facebook}>Facebook</a>
            </li>
            <li className="FlexRow CoinLink">
              <BitcoinTalkIcon /><a href={linkData.eth.bitcointalk}>Bitcoin Talk</a>
            </li>
            <li className="FlexRow CoinLink">
              <TelegramIcon /><a href={linkData.eth.telegram}>Telegram</a>
            </li>
            <li className="FlexRow CoinLink">
              <DiscordIcon /><a href={linkData.eth.discord}>Discord</a>
            </li>
          </ul>
      </div>
    );
  };
};

export default CoinLinks;