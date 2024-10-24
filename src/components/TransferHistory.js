import React from 'react';
import { Link } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";

const TransferHistory = () => {
    const storedTransfers = JSON.parse(localStorage.getItem('transfers')) || [];

    return (
        <div className="p-6 text-white">
            <h2 className="text-2xl font-bold mb-4 text-white">Asset Transfer History</h2>
            {storedTransfers.length > 0 ? (
                <table className="min-w-full bg-gradient-to-r from-blue-800 to-purple-600  border border-gray-300 rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-white bg-opacity-20 text-white ">
                            <th className="py-2 px-4 border">From</th>
                            <th className="py-2 px-4 border">To</th>
                            <th className="py-2 px-4 border">Amount (ETH)</th>
                            <th className="py-2 px-4 border">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {storedTransfers.map((transfer, index) => (
                            <tr key={index} className="bg-white bg-opacity-20">
                                <td className="py-2 px-4 border">{transfer.from}</td>
                                <td className="py-2 px-4 border">{transfer.to}</td>
                                <td className="py-2 px-4 border">{transfer.amount}</td>
                                <td className="py-2 px-4 border">{transfer.timestamp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-200">No transfers found.</p>
            )}
            <div className=" flex items-center ">
                <Link className="border-2 rounded-lg p-3  w-[10%] my-3  hover:border-black text-white flex items-center hover:text-black" to="/">
                    <IoArrowBackCircleOutline className="text-2xl mr-2" />
                    <div>Go Back</div>
                </Link>
            </div>
        </div>
    );
};

export default TransferHistory;
