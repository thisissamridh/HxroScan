
// Function to fetch price and icon
export async function fetchPriceAndIcon() {
    try {
        const response = await fetch('https://api.solscan.io/account?address=HxhWkVpk5NS4Ltg5nij2G671CKXFRKPK8vy271Ub4uEK&cluster=');

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        const { price, icon } = data.data.tokenInfo;

        return { price, icon };
    } catch (error) {
        console.error('Error fetching price and icon:', error);
        return null;
    }
}
