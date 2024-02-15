const url = "http://localhost:5009/api"
export function N_getUserInformation(api_key, secret_key, action) {
    try {
        return fetch(`${url}/market-api?action=${action}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "Access-Control-Allow-Origin": "*",
                "x-api-key": api_key,
                Authorization: `${secret_key}`,
            },
        }).then((d) => d.json())
            .catch((e) => e);
    } catch (error) {
        console.log(error)
    }
}

export function N_MakeSellTrade(api_key, secret_key, action, initial_price, ending_price, quantity, currency, compare_currency, current_price) {
    console.log(initial_price, ending_price, quantity, currency, compare_currency, current_price)
    try {
        return fetch(`${url}/market-api?action=${action}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "Access-Control-Allow-Origin": "*",
                "x-api-key": api_key,
                Authorization: `${secret_key}`,
            },
            body: JSON.stringify({
                initial_price,
                ending_price,
                quantity,
                currency_type:currency,
                compare_currency,
                cprice: current_price
            })
        }).then((d) => d.json())
            .catch((e) => e);
    } catch (error) {
        console.log(error)
    }
}