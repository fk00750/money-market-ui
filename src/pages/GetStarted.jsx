import React, { useState } from 'react';
import Header from '../components/Header';
import { N_MakeSellTrade, N_getUserInformation } from '../helper/api_request';
import Wallet from '../components/Wallet';
import TradeHistory from '../components/TradeHistory';
import OpenBuyOrders from '../components/OpenBuyOrders';
import OpenSellOrders from '../components/OpenSellOrders';


function TabContent({ activeTab }) {
    // Render the content based on the active tab
    switch (activeTab) {
        case 'home':
            return <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">This is the user wallet content.</div>;
        case 'profile':
            return <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">This is the open orders content.</div>;
        case 'contact':
            return <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">This is the sell orders content.</div>;
        case 'history':
            return <div className="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">This is the trade history content.</div>;
        default:
            return null;
    }
}

function GetStarted() {
    const [apiKey, setApiKey] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [quantity, setQuantity] = useState(null)
    const [currency_type, setCurrencyType] = useState(null)
    const [compared_currency, setCompareCurrency] = useState(null)
    const [currentPrice, setCurrentPrice] = useState(null)
    const [selectedAction, setSelectedAction] = useState('user_info');

    // user
    const [userWallet, setUserWallet] = useState(null)
    const [userTotalWalletBalance, setUserTotalWalletBalance] = useState(0)
    const [userTradeHistory, setUserTradeHistory] = useState(null)
    const [userTotalTradeHistory, setUserTotalTradeHistory] = useState(0)
    const [userOpenBuyOrders, setUserOpenBuyOrders] = useState(null)
    const [userTotalOpenBuyOrders, setUserTotalOpenBuyOrders] = useState(0)
    const [userOpenSellOrders, setUserOpenSellOrders] = useState(null)
    const [userTotalSellOrders, setUserTotalSellOrders] = useState(0)
    const [isTrading, setIsTrading] = useState(false)
    const [activeTab, setActiveTab] = useState('user-wallet');


    const [initialPrice, setInitialPrice] = useState(0);
    const [endingPrice, setEndingPrice] = useState(0);

    const handleApiKeyChange = (event) => {
        setApiKey(event.target.value);
    };

    const handleSecretKeyChange = (event) => {
        setSecretKey(event.target.value);
    };

    const handleActionChange = (event) => {
        setSelectedAction(event.target.value);
        if (event.target.value === "sell" || event.target.value === 'buy') {
            setIsTrading(true)
        } else {
            setIsTrading(false)
        }
    };


    const handleInitialPriceChange = (e) => {
        const newInitialPrice = parseInt(e.target.value, 10);

        // Check if initial price is not lower than zero
        if (newInitialPrice >= 0 && newInitialPrice !== endingPrice) {
            setInitialPrice(newInitialPrice);
        }
    };

    const handleEndingPriceChange = (e) => {
        const newEndingPrice = parseInt(e.target.value, 10);

        // Check if ending price is not lower than initial price
        if (newEndingPrice >= initialPrice && initialPrice !== newEndingPrice) {
            setEndingPrice(newEndingPrice);
        }
    };

    const onSubmitHandle = (e) => {
        e.preventDefault()

        // N_getUserInformation(apiKey, secretKey, selectedAction).then((res) => {
        //     if (res.status === 200) {
        //         const walletData = res.params.wallets;
        //         const inrWallet = walletData.find(wallet => wallet.wallet_type === "INR");
        //         setUserWallet(res.params.wallets)
        //         setUserTotalWalletBalance(inrWallet?.balance)
        //         setUserTradeHistory(res.params.trade_history)
        //         setUserTotalTradeHistory(res.params.trade_history.length)
        //         setUserOpenBuyOrders(res.params.buy_orders)
        //         setUserTotalOpenBuyOrders(res.params.totalBuyOrders)
        //         setUserOpenSellOrders(res.params.sell_orders)
        //         setUserTotalSellOrders(res.params.totalSellOrders)
        //     }
        // })

        N_MakeSellTrade(apiKey,
            secretKey,
            selectedAction,
            initialPrice,
            endingPrice,
            quantity,
            currency_type,
            compared_currency,
            currentPrice).then((res) => {
                console.log(res)
            })
    }

    const handleTabsChange = (tab) => {
        setActiveTab(tab)


    }

    const renderContent = () => {
        switch (activeTab) {
            case "user-wallet":
                return <Wallet userWallet={userWallet && userWallet} />;
            case "open-orders":
                return <OpenBuyOrders open_orders={userOpenBuyOrders && userOpenBuyOrders} />;
            case "sell-orders":
                return <OpenSellOrders sell_orders={userOpenSellOrders && userOpenSellOrders} />;
            case "trade-history":
                return <TradeHistory tradeHistory={userTradeHistory && userTradeHistory} />;
            default:
                return null;
        }
    };


    const cardData = [
        { title: 'Total INR Balance', content: userTotalWalletBalance },
        { title: 'Open Orders', content: userTotalOpenBuyOrders },
        { title: 'Sell Orders', content: userTotalSellOrders },
        { title: 'Close Orders', content: userTotalTradeHistory },
    ];

    return (
        <>
            <Header />

            {userWallet && <div className="container mt-4">
                <div className="row">
                    {cardData.map((card, index) => (
                        <div key={index} className={`col-md-3 mt-2`}>
                            <div className={`card ${index % 4 === 0 ? 'bg-primary' : index % 4 === 1 ? 'bg-danger' : index % 4 === 2 ? 'bg-success' : 'bg-warning'}`}>
                                <div className="card-body">
                                    <h5 className="card-title text-center">{card.title}</h5>
                                    <p className="card-text text-white text-center">{card.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}

            <div className="container mt-4">
                <form>
                    <div className="mb-3">
                        <label className="form-label">API Key:</label>
                        <input type="text" className="form-control" value={apiKey} onChange={handleApiKeyChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">API Name:</label>
                        <input type="text" className="form-control" value={secretKey} onChange={handleSecretKeyChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Select Action:</label>

                        <div className="mx-2 form-check form-check-inline">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="user_info"
                                name="action"
                                value="user_info"
                                checked={selectedAction === 'user_info'}
                                onChange={handleActionChange}
                            />
                            <label className="form-check-label" htmlFor="user_info">
                                Get User Info
                            </label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="sell"
                                name="action"
                                value="sell"
                                checked={selectedAction === 'sell'}
                                onChange={handleActionChange}
                            />
                            <label className="form-check-label" htmlFor="sell">
                                Sell Trading
                            </label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="buy"
                                name="action"
                                value="buy"
                                checked={selectedAction === 'buy'}
                                onChange={handleActionChange}
                            />
                            <label className="form-check-label" htmlFor="buy">
                                Buy Trading
                            </label>
                        </div>
                    </div>
                    {isTrading && (
                        <div className="row">
                            <div className="mb-3 col-sm">
                                <label className="form-label">Initial Price</label>
                                <input type="number" className="form-control" value={initialPrice} onChange={handleInitialPriceChange} />
                            </div>

                            <div className="mb-3 col-sm">
                                <label className="form-label">Ending Price</label>
                                <input type="number" className="form-control" value={endingPrice} onChange={handleEndingPriceChange} />
                            </div>

                            <div className="mb-3 col-sm">
                                <label className="form-label">Quantity</label>
                                <input type="number" className="form-control" value={quantity} onChange={(e) => {
                                    e.preventDefault()
                                    setQuantity(e.target.value)
                                }} />
                            </div>


                            <div className="mb-3 col-sm">
                                <label className="form-label">Currency</label>
                                <input type="text" className="form-control" value={currency_type} onChange={(e) => {
                                    e.preventDefault()
                                    setCurrencyType(e.target.value)
                                }} />
                            </div>

                            <div className="mb-3 col-sm">
                                <label className="form-label">Paired Currency</label>
                                <input type="text" className="form-control" value={compared_currency} onChange={(e) => {
                                    e.preventDefault()
                                    console.log(e.target.value)
                                    setCompareCurrency(e.target.value)
                                }} />
                            </div>

                            <div className="mb-3 col-sm">
                                <label className="form-label">Current Price</label>
                                <input type="number" className="form-control" value={currentPrice} onChange={(e) => {
                                    e.preventDefault()
                                    setCurrentPrice(e.target.value)
                                }} />
                            </div>
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary" onClick={onSubmitHandle}>Submit</button>
                </form>
            </div>

            {/* {userWallet && <Wallet userWallet={userWallet} />} */}
            {userWallet && <div className='container mt-4'>
                <div className="p-5 bg-white rounded shadow mb-5">
                    <ul id="myTab" role="tablist" className="nav nav-tabs nav-pills flex-column flex-sm-row text-center bg-light border-0 rounded-nav">
                        <li className="nav-item flex-sm-fill">
                            <a id="home-tab" data-bs-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true" className={`nav-link border-0 text-uppercase font-weight-bold ${activeTab === "user-wallet" ? "active" : ""}`} onClick={() => handleTabsChange("user-wallet")}>User Wallet</a>
                        </li>
                        <li className="nav-item flex-sm-fill">
                            <a id="profile-tab" data-bs-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false" className={`nav-link border-0 text-uppercase font-weight-bold ${activeTab === "open-orders" ? "active" : ""}`} onClick={() => handleTabsChange("open-orders")}>Open Buy Orders</a>
                        </li>
                        <li className="nav-item flex-sm-fill">
                            <a id="contact-tab" data-bs-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false" className={`nav-link border-0 text-uppercase font-weight-bold ${activeTab === "sell-orders" ? "active" : ""}`} onClick={() => handleTabsChange("sell-orders")}>Open Sell Orders</a>
                        </li>
                        <li className="nav-item flex-sm-fill">
                            <a id="history-tab" data-bs-toggle="tab" href="#history" role="tab" aria-controls="history" aria-selected="false" className={`nav-link border-0 text-uppercase font-weight-bold ${activeTab === "trade-history" ? "active" : ""}`} onClick={() => handleTabsChange("trade-history")}>Trade History</a>
                        </li>
                    </ul>
                    <div className="tab-content mt-3">
                        {renderContent()}
                    </div>
                </div>
            </div>}
        </>
    );
}

export default GetStarted;
