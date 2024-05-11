const express = require("express");
const app = express();
const cors = require("cors");
const { getPoolById } = require("./utils/helper");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());

app.get("/swap", async (req, res) => {
  try {
    const { address, availableUtxos, rewardAddress } = req.query;
    const { Lucid, Blockfrost } = await import("lucid-cardano");
    const { calculateSwapExactOut, Dex, ADA } = await import("@minswap/sdk");

    const lucid = await Lucid.new(
      new Blockfrost(
        "https://cardano-preprod.blockfrost.io/api/v0",
        process.env.BLOCKFROST_PROJECT_ID
      ),
      "Preprod"
    );

    lucid.selectWalletFrom({
      address: address,
      availableUtxos: availableUtxos,
      rewardAddress: rewardAddress,
    });

    const poolId =
      "3bb0079303c57812462dec9de8fb867cef8fd3768de7f12c77f6f0dd80381d0d";

    const { poolState, poolDatum } = await getPoolById("preprod", poolId);

    const exactAmountOut = 10n;

    const { amountIn } = calculateSwapExactOut({
      exactAmountOut: exactAmountOut,
      reserveIn: poolState.reserveA,
      reserveOut: poolState.reserveB,
    });

    const slippageTolerance = 20n;
    const necessaryAmountIn = (amountIn * (100n + slippageTolerance)) / 100n;

    const dex = new Dex(lucid);
    const tx = await dex.buildSwapExactOutTx({
      maximumAmountIn: necessaryAmountIn,
      assetIn: ADA,
      assetOut: poolDatum.assetB,
      expectedAmountOut: exactAmountOut,
      sender: address,
      availableUtxos: availableUtxos,
    });

    return res.send({ tx: tx.toString() });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.listen(8000, () => {
  console.log("Server is listening on port 8000...");
});
