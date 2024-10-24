import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import { LuSend } from "react-icons/lu";

const contractAddress = "0xb44fDA9781B08AAfD2a42Ba1f765a8D9e81d1E3b"; // Replace with your deployed contract address
const contractABI = [
    "function transfer(address payable _to, uint256 _amount) public",
    "function balances(address) view returns (uint256)"
];

const Wallet = ({ account, setAccount }) => {
    const [recipientAddress, setRecipientAddress] = useState('');
    const [voltaAmount, setVoltaAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showTransferForm, setShowTransferForm] = useState(false);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    console.log("Connected account:", accounts[0]);
                } else {
                    alert("No accounts found. Please create an account in MetaMask.");
                }
            } catch (error) {
                console.error("Connection error:", error);
                alert("Could not connect to wallet. Please try again.");
            }
        } else {
            alert("MetaMask not detected. Please install it.");
        }
    };

    const isValidAddress = (address) => {
        return ethers.utils.isAddress(address);
    };

    const transferVoltaCoin = async () => {
        if (!recipientAddress || !voltaAmount) {
            alert("Please enter both recipient address and amount.");
            return;
        }

        if (!isValidAddress(recipientAddress)) {
            alert("Invalid recipient address.");
            return;
        }

        if (parseFloat(voltaAmount) <= 0) {
            alert("Amount must be greater than zero.");
            return;
        }

        setIsLoading(true);
        try {
            const amountInWei = ethers.utils.parseUnits(voltaAmount, 18); // Adjust decimals as needed
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Check balance before sending
            const senderBalance = await contract.balances(account);
            if (senderBalance.lt(amountInWei)) {
                alert("Insufficient VOLTA balance.");
                return;
            }

            const transaction = await contract.transfer(recipientAddress, amountInWei, {
                gasLimit: 500000,
            });

            await transaction.wait();
            alert(`Successfully sent ${voltaAmount} Volta Coin to ${recipientAddress}`);
            
            // Store transaction details in local storage
            const transferDetails = {
                from: account,
                to: recipientAddress,
                amount: voltaAmount,
                timestamp: new Date().toLocaleString(),
            };

            const storedTransfers = JSON.parse(localStorage.getItem('transfers')) || [];
            storedTransfers.push(transferDetails);
            localStorage.setItem('transfers', JSON.stringify(storedTransfers));

            // Reset fields after transaction
            setRecipientAddress('');
            setVoltaAmount('');
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed. Reason: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-700 to-purple-600 text-white">
            <div className="text-gray-800 shadow-md rounded-lg p-8 max-w-lg w-full bg-white bg-opacity-20">
                <h2 className="text-3xl font-bold text-center mb-6 text-white">Asset Transfer</h2>

                {!account ? (
                    <button className="w-full border-2 border-gray-300 text-white py-3 rounded-lg hover:text-black font-bold hover:border-black" onClick={connectWallet}>
                        Connect MetaMask
                    </button>
                ) : (
                    <div>
                        {!showTransferForm ? (
                            <div className="flex space-x-4 mb-4">
                                <button
                                    className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 font-bold flex items-center justify-center"
                                    onClick={() => setShowTransferForm(true)}
                                >
                                    <LuSend className="text-2xl mr-2" />
                                    <div>Send</div>
                                </button>
                                <Link to="/transfer-history" className="w-full border-2 border-gray-300 text-white py-3 rounded-lg hover:text-black font-bold hover:border-black text-center">
                                    View Asset Transfers
                                </Link>
                            </div>
                        ) : (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-4 text-white">Transfer Volta Coin</h3>
                                <p className="mb-4 text-white">Connected Account: <span className="font-bold">{account}</span></p>
                                <input
                                    type="text"
                                    placeholder="Recipient Address"
                                    className="w-full border bg-transparent border-gray-300 rounded-lg p-3 mb-4 text-white"
                                    value={recipientAddress}
                                    onChange={(e) => setRecipientAddress(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Amount in VOLTA"
                                    className="w-full border bg-transparent border-gray-300 rounded-lg p-3 mb-6 text-white"
                                    value={voltaAmount}
                                    onChange={(e) => setVoltaAmount(e.target.value)}
                                />
                                <div className="flex flex-col items-center space-y-4">
                                    <button className="w-[250px] bg-green-500 text-white py-3 rounded-lg hover:bg-green-600" onClick={transferVoltaCoin} disabled={isLoading}>
                                        {isLoading ? 'Sending...' : 'Send VOLTA'}
                                    </button>
                                    <button
                                        className="w-[250px] bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600"
                                        onClick={() => setShowTransferForm(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wallet;
