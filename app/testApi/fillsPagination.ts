const fs = require('fs')

type FillType = {
  base_size: number;
  block_timestamp: string;
  inserted_at: string;
  maker_order_id: string;
  maker_trg: string;
  mpg: string;
  price: number;
  product: string;
  quote_size: number;
  slot: number;
  taker_side: string;
  taker_trg: string;
  tx_sig: string;
};


async function fetchFills(trgPubkey: string): Promise<void> {
  try {
    let allFills: FillType[] = [];
    const products = ["BTCUSD-PERP"];
    const seenOrderIds = new Set<string>();

    for (const product of products) {
      let beforeTimestamp: number | undefined;

      while (true) {
        const url =
          `https://dexterity.hxro.com/fills?product=${product}&trg=${trgPubkey}` +
          (beforeTimestamp ? `&before=${beforeTimestamp}` : "");
        const response = await fetch(url);
        const data: FillType[] = (await response.json()).fills;

        if (data.length === 0) break;

        const uniqueFillsById = data.filter((fill) => {
          if (!seenOrderIds.has(fill.maker_order_id)) {
            seenOrderIds.add(fill.maker_order_id);
            return true;
          }
          return false;
        });

        // Log unique fills to the console
        console.log(`New unique fills for ${product}:`, uniqueFillsById);


        // Add unique fills to the allFills array
        allFills.push(...uniqueFillsById);

        if (data.length < 50) break;

        beforeTimestamp = getUnixTimestamp(data[0].block_timestamp);
      }
    }

    // Save all fills to a JSON file
    fs.writeFileSync('fills.json', JSON.stringify(allFills, null, 2));
    console.log('All unique fills have been saved to fills.json');
  } catch (error) {
    console.error("Fetching fills failed:", error);
  }
}


function getUnixTimestamp(dateString: string) {
  const date = new Date(dateString);
  return Math.floor(date.getTime() / 1000);
}



// let trgPubkey = "HyRypoH2B8UPCVvcFqEBFh1E8f7HoHta9tWBJkMa3r7L";
console.time("FetchTime");
fetchFills('HyRypoH2B8UPCVvcFqEBFh1E8f7HoHta9tWBJkMa3r7L')
  .then(() => {
    console.log("Fetched fills:");
    console.timeEnd("FetchTime");
  })
  .catch(error => {
    console.error("An error occurred:", error)
    console.timeEnd("FetchTime");
  });
