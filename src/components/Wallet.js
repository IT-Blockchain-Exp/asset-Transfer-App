import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import { LuSend } from "react-icons/lu";

const contractAddress = "0x9ad7849D49dE517c39E99222C9088e51A67f9a0B";
const contractABI = [
    "function transferEth(address payable _to, uint256 _amount) public payable"
];

const Wallet = ({ account, setAccount }) => {
    const [recipientAddress, setRecipientAddress] = useState('');
    const [ethAmount, setEthAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showTransferForm, setShowTransferForm] = useState(false);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
                console.log("Connected account:", accounts[0]);
            } catch (error) {
                console.error("Connection error:", error);
            }
        } else {
            alert("MetaMask not detected");
        }
    };

    const isValidAddress = (address) => {
        return ethers.isAddress(address);
    };

    const transferVoltaETH = async () => {
        if (!recipientAddress || !ethAmount) {
            alert("Please enter both recipient address and amount.");
            return;
        }

        if (!isValidAddress(recipientAddress)) {
            alert("Invalid recipient address.");
            return;
        }

        if (parseFloat(ethAmount) <= 0) {
            alert("Amount must be greater than zero.");
            return;
        }

        setIsLoading(true);
        try {
            const amountInWei = ethers.parseUnits(ethAmount, 18);
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            const transaction = await contract.transferEth(recipientAddress, amountInWei, {
                value: amountInWei,
                gasLimit: 500000,
            });

            await transaction.wait();
            alert(`Successfully sent ${ethAmount} ETH to ${recipientAddress}`);

           
            const transferDetails = {
                from: account,
                to: recipientAddress,
                amount: ethAmount,
                timestamp: new Date().toLocaleString(),
            };

            const storedTransfers = JSON.parse(localStorage.getItem('transfers')) || [];
            storedTransfers.push(transferDetails);
            localStorage.setItem('transfers', JSON.stringify(storedTransfers)); // Update local storage

            // Reset fields after transaction
            setRecipientAddress('');
            setEthAmount('');
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed, see console for details.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen  bg-customdark text-white">
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
                                    <LuSend className="text-2xl mr-2" /> {/* This will make the icon larger and add margin to the right */}
                                    <div>Send</div>
                                </button>
                                <Link to="/transfer-history" className="w-full border-2 border-gray-300 text-white py-3 rounded-lg hover:text-black font-bold hover:border-black text-center">
                                    View Asset Transfers
                                </Link>
                            </div>
                        ) : (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-4 text-white">Transfer VoltaETH</h3>
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
                                    placeholder="Amount in Volta"
                                    className="w-full border bg-transparent border-gray-300 rounded-lg p-3 mb-6 text-white"
                                    value={ethAmount}
                                    onChange={(e) => setEthAmount(e.target.value)}
                                />
                                <div className="flex flex-col items-center space-y-4">
                                    <button className="w-[250px] bg-green-500 text-white py-3 rounded-lg hover:bg-green-600" onClick={transferVoltaETH} disabled={isLoading}>
                                        {isLoading ? 'Sending...' : 'Send Volta'}
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
