import React from 'react';
import { Link } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";

// Helper function to parse timestamp strings in dd/mm/yyyy, hh:mm:ss am/pm format
const parseTimestamp = (timestamp) => {
    const [datePart, timePart] = timestamp.split(", ");
    const [day, month, year] = datePart.split("/").map(Number);
    return new Date(`${year}-${month}-${day} ${timePart}`);
};

const TransferHistory = () => {
    const storedTransfers = JSON.parse(localStorage.getItem('transfers')) || [];

    // Sort the transfers by parsed timestamp in descending order
    const sortedTransfers = storedTransfers.sort((a, b) => parseTimestamp(b.timestamp) - parseTimestamp(a.timestamp));

    return (
        <div className="p-6 text-white">
            <h2 className="text-2xl font-bold mb-4 text-white">Asset Transfer History</h2>
            {sortedTransfers.length > 0 ? (
                <table className="min-w-full bg-customgray border border-gray-300 rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-white bg-opacity-20 text-white">
                            <th className="py-2 px-4 border">From</th>
                            <th className="py-2 px-4 border">To</th>
                            <th className="py-2 px-4 border">Amount (ETH)</th>
                            <th className="py-2 px-4 border">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTransfers.map((transfer, index) => (
                            <tr key={index} className="bg-customdark">
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
            <div className="flex items-center">
                <Link className="border-2 rounded-lg p-3 w-[10%] my-3 hover:bg-customgray text-white flex items-center hover:text-white" to="/">
                    <IoArrowBackCircleOutline className="text-2xl mr-2" />
                    <div>Go Back</div>
                </Link>
            </div>
        </div>
    );
};

export default TransferHistory;
