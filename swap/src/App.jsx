import React, { useState } from "react";
// import { Lucid, Blockfrost, WalletApi } from "lucid-cardano";
import axios from "axios";
import { WanBridge, Wallet } from "wanchain-cross-sdk";

function App() {
  const [toToken, setToToken] = useState < string > "ETH";
  const [walletConnected, setWalletConnected] = useState < boolean > false;
  const [walletAPI, setWalletAPI] =
    (useState < WalletApi) | (undefined > undefined);

  const handleFromTokenChange = (event) => {
    if (event.target.value === "ADA") {
      setToToken("ETH");
    } else {
      setToToken("ADA");
    }
  };

  const connectWallet = async () => {
    if (toToken === "ETH") {
      let metaMaskWallet = window.ethereum;
    } else {
      const wallet = await window.request({
        method: "eth_requestAccounts",
      });
      setWalletAPI(wallet);
    }
    setWalletConnected(true);
  };

  // const submitADAtoETH = async () => {
  //   const lucid: Lucid = await Lucid.new(
  //     new Blockfrost(
  //       "https://cardano-preprod.blockfrost.io/api/v0",
  //       process.env.REACT_APP_API_BLOCKFROST_API_KEY
  //     ),
  //     "Preprod"
  //   );

  //   lucid.selectWallet(walletAPI as WalletApi);

  //   const address = await lucid.wallet.address();
  //   const utxos = await lucid.wallet.getUtxos();
  //   const rewardAddress = await lucid.wallet.rewardAddress();

  //   const tx = await axios.get(
  //     `${process.env.REACT_APP_NODE_SERVER_URL}/swap`,
  //     {
  //       params: {
  //         address: address,
  //         availableUtxos: utxos,
  //         rewardAddress: rewardAddress,
  //         walletAPI: walletAPI,
  //       },
  //     }
  //   );

  //   const newTx = lucid.fromTx(tx.data.tx);

  //   const signedTx = await newTx.sign().complete();
  //   await signedTx.submit();
  // };

  const submitSwap = async () => {
    if (toToken === "ETH") {
      // submitADAtoETH();
    } else {
      ethToAd();
    }
  };

  const ethToAd = async () => {
    // let bridge = new WanBridge("testnet"); // testnet or mainnet
    //   bridge
    //     .on("ready", (assetPair: any) => {
    //       /* the bridge is initialized successfully and is ready for cross-chain, you can filter assetPairs by asset and chain type as needed.
    //   assetPairs example: [
    //     {
    //       assetPairId: "39",
    //       assetType: "AVAX",
    //       protocol: "Erc20",
    //       fromSymbol: "AVAX",
    //       toSymbol: "wanAVAX",
    //       decimals: "18",
    //       fromDecimals: "18",
    //       toDecimals: "18",
    //       fromChainType: "AVAX",
    //       toChainType: "WAN",
    //       fromChainName: "Avalanche C-Chain",
    //       toChainName: "Wanchain",
    //       fromAccount: "0x0000000000000000000000000000000000000000",
    //       toAccount: "0xc8f5b26589392fde84ee0482e2b5a77dfbe943fc"
    //     },
    //     ......
    //   ]
    // */
    //       console.log(assetPair, "ready");
    //     })
    //     .on("error", (info: any) => {
    //       /* failed to initialize the bridge, or cross-chain task failed.
    //   error info structure: {
    //     taskId, // optional, only task error info has taskId field
    //     reason
    //   }
    //   a task error info may includes the following reason:
    //   "Invalid wallet"
    //   "Failed to send transaction"
    //   "Rejected"
    //   "Insufficient ERC20 token allowance"
    //   "Insufficient balance"
    //   "Failed to approve token"
    //   "Failed to generate ota"
    //   "Transaction failed"
    //   "Amount is too small to pay the fee"
    //   "Waiting for locking asset timeout"
    //   "Please contact the Wanchain Foundation (techsupport@wanchain.org)"
    // */
    //       console.log(info, "error");
    //     })
    //     .on("ota", (info: any) => {
    //       /* the one-time-addess is generated to receive BTC, LTC or XRP.
    //   ota info structure: {
    //     taskId,
    //     address:, // BTC/LTC ota address, or XRP xAddress
    //     rAddress, // optional, XRP rAddress
    //     tagId     // optional, XRP tag ID
    //   }
    // */
    //       console.log(info, "ota");
    //     })
    //     .on("lock", (info: any) => {
    //       /* the lock transaction hash
    //   lock info structure: {
    //     taskId,
    //     txHash
    //   }
    // */
    //       console.log(info, "lock");
    //     })
    //     .on("redeem", (info: any) => {
    //       /* the redeem transaction hash, indicates that the cross-chain task is finished.
    //   redeem info structure: {
    //     taskId,
    //     txHash
    //   }
    // */
    //       console.log(info, "redeem");
    //     });
    //   let iwanAuth = {
    //     apiKey:
    //       "7520324fae3c2c31d750e9dc9aaa1efb2ea03cee3ccab9c996d0839786ef80a9",
    //     secretKey:
    //       "133d379ea0c0d2c5cc0e226740681df9d3889f3c033b10309fa7e4fc26169314",
    //   };
    //   bridge.init(iwanAuth);
    //   console.log("ETH to ADA");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Swap Tokens</h2>
        </div>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label
                className="block text-gray-700 dark:text-gray-300 font-medium"
                htmlFor="from-amount"
              >
                Swap From
              </label>
              <select
                onChange={handleFromTokenChange}
                className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="ADA">ADA</option>
                <option value="ETH">ETH</option>
              </select>
            </div>
            <div className="relative">
              <label
                className="block text-gray-700 dark:text-gray-300 font-medium"
                htmlFor="from-amount"
              >
                Swap Amount
              </label>
              <input
                className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id="to-amount"
                placeholder="0.0"
                type="number"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className="block text-gray-700 dark:text-gray-300 font-medium"
                htmlFor="from-amount"
              >
                Swap To
              </label>
              <input
                className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled
                id="from-amount"
                type="text"
                value={toToken}
              />
            </div>
            <div className="space-y-2">
              <label
                className="block text-gray-700 dark:text-gray-300 font-medium"
                htmlFor="to-amount"
              >
                To
              </label>
              <input
                className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled
                id="to-amount"
                placeholder="0.0"
                type="number"
              />
            </div>
          </div>
          {walletConnected ? (
            <button
              onClick={submitSwap}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Swap
            </button>
          ) : (
            <button
              onClick={connectWallet}
              className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Connect {toToken === "ADA" ? "Metamask" : "Nami"} Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
