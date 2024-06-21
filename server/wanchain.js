const { WanBridge, Wallet } = require("wanchain-cross-sdk");

let bridge = new WanBridge("testnet"); // testnet or mainnet
bridge
  .on("ready", (assetPairs) => {
    /* the bridge is initialized successfully and is ready for cross-chain, you can filter assetPairs by asset and chain type as needed.
    assetPairs example: [
      {
        assetPairId: "39",
        assetType: "AVAX",
        protocol: "Erc20",
        fromSymbol: "AVAX",
        toSymbol: "wanAVAX",
        decimals: "18",
        fromDecimals: "18",
        toDecimals: "18",
        fromChainType: "AVAX",
        toChainType: "WAN",
        fromChainName: "Avalanche C-Chain",
        toChainName: "Wanchain",
        fromAccount: "0x0000000000000000000000000000000000000000",
        toAccount: "0xc8f5b26589392fde84ee0482e2b5a77dfbe943fc"
      },
      ......
    ]
  */
  })
  .on("error", (info) => {
    /* failed to initialize the bridge, or cross-chain task failed.
    error info structure: {
      taskId, // optional, only task error info has taskId field
      reason
    }
    a task error info may includes the following reason:
    "Invalid wallet"
    "Failed to send transaction"
    "Rejected"
    "Insufficient ERC20 token allowance"
    "Insufficient balance"
    "Failed to approve token"
    "Failed to generate ota"
    "Transaction failed"
    "Amount is too small to pay the fee"
    "Waiting for locking asset timeout"
    "Please contact the Wanchain Foundation (techsupport@wanchain.org)"
  */
  })
  .on("ota", (info) => {
    /* the one-time-addess is generated to receive BTC, LTC or XRP.
    ota info structure: {
      taskId,
      address:, // BTC/LTC ota address, or XRP xAddress
      rAddress, // optional, XRP rAddress
      tagId     // optional, XRP tag ID
    }
  */
  })
  .on("lock", (info) => {
    /* the lock transaction hash
    lock info structure: {
      taskId,
      txHash
    }
  */
  })
  .on("redeem", (info) => {
    /* the redeem transaction hash, indicates that the cross-chain task is finished.
    redeem info structure: {
      taskId,
      txHash
    }
  */
  });
