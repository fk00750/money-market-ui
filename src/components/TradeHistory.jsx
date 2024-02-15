import React from 'react'

function TradeHistory({ tradeHistory }) {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    }
    return (
        <>
            <div className='container mt-4'>
                <h2>User Trade History</h2>
                <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Type</th>
                            <th scope="col">Currency Pair</th>
                            <th scope="col">Price</th>
                            <th scope="col">Volume</th>
                            <th scope="col">Buy Order Id</th>
                            <th scope="col">Sell Order Id</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tradeHistory && tradeHistory.map((trade, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{trade.type}</td>
                                <td>{trade.currency_type}/{trade.compare_currency}</td>
                                <td>{trade.price}</td>
                                <td>{trade.volume}</td>
                                <td>{trade.sell_order_id}</td>
                                <td>{trade.buy_order_id}</td>
                                <td>{new Date(trade.trade_date).toLocaleString("en-US", options)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TradeHistory