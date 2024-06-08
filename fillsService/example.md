```
const createWebhook = async () => {
    try {
      const response = await fetch(
        "https://api.helius.xyz/v0/webhooks?api-key=<PASTE YOUR API KEY HERE>",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "webhookURL": "https://your-railway-deployment.app/webhooks",
            "accountAddresses": ["FUfpR31LmcP1VSbz5zDaM7nxnH55iBHkpwusgrnhaFjL"],
            "accountAddressOwners": [],
            "encoding": "jsonParsed",
            "webhookType": "raw"
       }),
        }
      );
      const data = await response.json();
      console.log({ data });
    } catch (e) {
      console.error("error", e);
    }
  };
  createWebhook();
```
