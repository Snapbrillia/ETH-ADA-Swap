/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./css/color.css";
import "./css/style.css";

const CryptoSwapWidget = () => {
  return (
    <div class="main-container">
      <div class="main-content">
        <section class="middle">
          <div class="mid-container">
            <div class="mid-content">
              <div class="mid-head">
                <ul>
                  <li class="chart">
                    {/* <p>Chart</p> */}
                    {/* <i class="fa fa-chart-line"></i> */}
                    <a href="#wallet" class="btn-wallet" id="wallet">
                      Connect Wallet
                    </a>
                  </li>
                  <li class="token">
                    <p>Swap Tokens</p>
                  </li>
                  {/* <li class="history">
                    <p>History</p>
                    <i class="fa fa-clock-rotate-left"></i>
                  </li> */}
                  <li class="settings">
                    <p>Settings</p>
                    <i class="fa fa-gears fa-spin"></i>
                  </li>
                </ul>
              </div>
              <p class="center">Trade tokens in an instant</p>
              <div class="mid-item">
                <div class="mid-item-container">
                  <div class="mid-item-top">
                    <span>From</span>
                    <div class="btn-change">
                      <button id="half">Half</button>
                      <button id="max">Max</button>
                    </div>
                  </div>

                  <div class="mid-item-end">
                    <div class="mid-item-cent">
                      <img
                        src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=032"
                        alt=""
                      />
                      <p id="A">ETH</p>
                      <span>(Ethereum)</span>
                      <i class="fa fa-angle-down"></i>
                    </div>
                    <span class="value">
                    <input
                    style={{
                      marginLeft: '20%',
                    }}
                          class="input"
                          type="text"
                          placeholder="Enter Amount"
                          
                        />
                    </span>
                  </div>
                </div>
              </div>
              <div class="arrow-cont">
                <div class="arrow">
                  <i class="fa fa-arrow-up-long "></i>
                  <i class="fa fa-arrow-down-long "></i>
                </div>
              </div>
              <div class="mid-item">
                <div class="mid-item-container">
                  <div class="mid-item-top">
                    <span>To</span>
                    <div class="btn-change">
                      <button id="half">Half</button>
                      <button id="max">Max</button>
                    </div>
                  </div>

                  <div class="mid-item-end">
                    <div class="mid-item-cent">
                      <img
                        src="https://cryptologos.cc/logos/cardano-ada-logo.png?v=032"
                        alt=""
                      />
                      <p>ADA</p>
                      <span>(Cardano)</span>
                      <i class="fa fa-angle-down"></i>
                    </div>
                    <span class="value" >

                        <input
                        style={{
                          marginLeft: '20%',
                        }}
                          class="input"
                          type="text"
                          placeholder="Enter Amount"
                         
                        />
                      
                    </span>
                  </div>
                </div>
              </div>
              <div class="slippage">
                <p>Slippage Tolerance</p>
                <span>0.5%</span>
              </div>
              <div class="btn-container">
                <a href="#swap" class="btn-swap">
                  Proceed to Swap
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* <section class="bottom">
            <div class="mid-container">
                <div class="bottom-content">
                    <div class="bottom-item">
                        <div class="item">
                            <div class="item-cont">
                                <img src="./assets/icon/Binance Coin (BNB).svg" alt="" />
                                <span id="coin">BNB</span>
                            </div>
                        </div>
                        <div class="item">
                            <p>Price</p>
                            <span>$439.18</span>
                        </div>
                        <div class="item">
                            <p>24H%</p>
                             <a>+10.2%</a>
                        </div>
                        <div class="item">
                            <img src="./assets/icon/Group 24.svg" alt="" id="graph" />
                        </div>
                    </div>
                    <div class="bottom-item">
                        <div class="item">
                            <div class="item-cont">
                              <img src="./assets/icon/Vector.svg" alt="" />
                              <span id="coin">BUTN</span>
                            </div>
                        </div>
                        <div class="item" id="price">
                            <p>Price</p>
                            <span>$0.5374</span>
                        </div>
                        <div class="item">
                            <p>24H%</p>
                             <a href="#">+31.2%</a>
                        </div>
                        <div class="item">
                            <img src="./assets/icon/Group 24.svg" alt="" id="graph" />
                        </div>
                    </div>
               </div> 
             </div>
        </section> */}
      </div>
    </div>
  );
};

export default CryptoSwapWidget;
