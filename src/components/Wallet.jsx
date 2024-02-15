import React from 'react'

function Wallet({ userWallet }) {
    return (
        <>
            <div className='container mt-4'>
                <h2>User Wallet</h2>
                <table className="table table-striped table-hover">
                    <thead className="thead-dark border">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Wallet Type</th>
                            <th scope="col">Balance</th>
                            <th scope="col">Locked</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userWallet && userWallet.map((wallet, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{wallet.wallet_type}</td>
                                <td>{wallet.balance}</td>
                                <td>{wallet.locked}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Wallet