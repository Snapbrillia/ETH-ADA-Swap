import React, { useState } from "react";
import { Lucid, Blockfrost, WalletApi } from "lucid-cardano";
import axios from "axios";

function App() {
  const [toToken, setToToken] = useState<string>("ETH");
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [walletAPI, setWalletAPI] = useState<WalletApi | undefined>(undefined);

  const handleFromTokenChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (event.target.value === "ADA") {
      setToToken("ETH");
    } else {
      setToToken("ADA");
    }
  };

  const connectWallet = async () => {
    if (toToken === "ETH") {
      const walletAPI: WalletApi = await (window as any).cardano.nami.enable();
      setWalletAPI(walletAPI);
    } else {
      const wallet = await (window as any).request({
        method: "eth_requestAccounts",
      });
      setWalletAPI(wallet);
    }
    setWalletConnected(true);
  };

  const submitADAtoETH = async () => {
    const lucid: Lucid = await Lucid.new(
      new Blockfrost(
        "https://cardano-preprod.blockfrost.io/api/v0",
        process.env.REACT_APP_BLOCKFROST_API_KEY
      ),
      "Preprod"
    );

    lucid.selectWallet(walletAPI as WalletApi);

    const address = await lucid.wallet.address();
    const utxos = await lucid.wallet.getUtxos();
    const rewardAddress = await lucid.wallet.rewardAddress();

    const tx = await axios.get(`${process.env.REACT_NODE_SERVER_URL}/swap`, {
      params: {
        address: address,
        availableUtxos: utxos,
        rewardAddress: rewardAddress,
        walletAPI: walletAPI,
      },
    });

    const newTx = lucid.fromTx(tx.data.tx);

    const signedTx = await newTx.sign().complete();
    await signedTx.submit();
  };

  const submitSwap = async () => {
    if (toToken === "ETH") {
      submitADAtoETH();
    } else {
    }
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
