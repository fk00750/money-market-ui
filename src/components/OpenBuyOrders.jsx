import React from 'react'

function OpenBuyOrders({ open_orders }) {
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
                <h2>User Open Orders</h2>
                <table className="table table-striped table-hover">
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
                        {open_orders && open_orders.map((open_order, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{open_order.order_id}</td>
                                <td>{open_order.raw_price}</td>
                                <td>{open_order.volume}</td>
                                <td>{open_order.currency_type}/{open_order.compare_currency}</td>
                                <td>{new Date(open_order.trade_date).toLocaleString("en-US", options)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default OpenBuyOrders