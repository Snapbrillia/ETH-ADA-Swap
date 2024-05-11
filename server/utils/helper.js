const { BlockFrostAPI } = require("@blockfrost/blockfrost-js");

async function getPoolById(network, poolId) {
  const { Data } = await import("lucid-cardano");
  const { PoolDatum, NetworkId, BlockfrostAdapter } = await import(
    "@minswap/sdk"
  );

  const api = new BlockfrostAdapter({
    blockFrost: new BlockFrostAPI({
      projectId: process.env.BLOCKFROST_PROJECT_ID,
      network: "preprod",
    }),
  });

  const pool = await api.getPoolById({
    id: poolId,
  });

  if (!pool) {
    throw new Error(`Not found PoolState of ID: ${poolId}`);
  }

  const rawRoolDatum = await api.getDatumByDatumHash(pool.datumHash);
  const poolDatum = PoolDatum.fromPlutusData(
    network === "Mainnet" ? NetworkId.MAINNET : NetworkId.TESTNET,
    Data.from(rawRoolDatum)
  );

  return {
    poolState: pool,
    poolDatum: poolDatum,
  };
}

module.exports = {
  getPoolById,
};
