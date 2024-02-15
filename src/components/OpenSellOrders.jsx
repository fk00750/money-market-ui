import React from 'react'

function OpenSellOrders({ sell_orders }) {
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
                <h2>User Sell Orders</h2>
                <table className="table table-responsive-sm table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Order Id</th>
                            <th scope="col">Price</th>
                            <th scope="col">Volume</th>
                            <th scope="col">Currency Pair</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sell_orders && sell_orders.map((sell_order, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{sell_order.order_id}</td>
                                <td>{sell_order.raw_price}</td>
                                <td>{sell_order.volume}</td>
                                <td>{sell_order.currency_type}/{sell_order.compare_currency}</td>
                                <td>{new Date(sell_order.trade_date).toLocaleString("en-US", options)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default OpenSellOrders