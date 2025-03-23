"use client";
import { useState, useEffect } from "react";

export default function RecHistory() {
    const [email, setEmail] = useState("");
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const getEmailFromStorage = async () => {
            try {
                const stringifyData = await localStorage.getItem("loggedin");
                if (stringifyData) {
                    const rawData = JSON.parse(stringifyData);
                    if (rawData?.email) {
                        setEmail(rawData.email);
                        fetchHistory(rawData.email);
                    } else {
                        setError("Email not found in local storage");
                    }
                } else {
                    setError("No logged-in user data found");
                }
            } catch (err) {
                setError("Error accessing local storage");
            }
        };

        getEmailFromStorage();
    }, []);

    const fetchHistory = async (userEmail) => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch("https://wehack-backend.vercel.app/getRecHistory", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
                },
                body: JSON.stringify({ email: userEmail }),
            });

            const result = await response.json();
            if (response.ok) {
                setHistory(result.data);
            } else {
                setError(result.error || "Failed to fetch recruiter history");
            }
        } catch (err) {
            setError("Something went wrong");
        }
        setLoading(false);
    };

    return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">Recruiter History</h1>
            {email ? (
                <p className="mb-4 text-gray-400">Showing history for: <span className="font-bold">{email}</span></p>
            ) : (
                <p className="text-red-500">{error}</p>
            )}

            {loading && <p className="mt-4">Loading...</p>}
            {error && !loading && <p className="mt-4 text-red-500">{error}</p>}

            <div className="mt-6 w-full max-w-6xl overflow-x-auto">
                {history.length > 0 ? (
                    <table className="w-full border border-white">
                        <thead>
                            <tr className="bg-gray-800">
                                <th className="p-2 border border-white">Title</th>
                                <th className="p-2 border border-white">Description</th>
                                <th className="p-2 border border-white">Major Skill</th>
                                <th className="p-2 border border-white">Limit</th>
                                <th className="p-2 border border-white">Gender</th>
                                <th className="p-2 border border-white">Status</th>
                                <th className="p-2 border border-white">Mode</th>
                                <th className="p-2 border border-white">Q_ID</th>
                                <th className="p-2 border border-white">Question Type</th>
                                <th className="p-2 border border-white">Recruiter ID</th>
                                <th className="p-2 border border-white">Company Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((item, index) => (
                                <tr key={index} className="border border-white text-center">
                                    <td className="p-2 border border-white">{item.title}</td>
                                    <td className="p-2 border border-white">{item.desc}</td>
                                    <td className="p-2 border border-white">{item.major_skill}</td>
                                    <td className="p-2 border border-white">{item.limit}</td>
                                    <td className="p-2 border border-white">{item.gender}</td>
                                    <td className="p-2 border border-white">{item.status}</td>
                                    <td className="p-2 border border-white">{item.mode}</td>
                                    <td className="p-2 border border-white">{item.q_id}</td>
                                    <td className="p-2 border border-white">{item.question_type}</td>
                                    <td className="p-2 border border-white">{item.recruiter_id}</td>
                                    <td className="p-2 border border-white">{item.company_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="mt-4 text-gray-400">No history found.</p>
                )}
            </div>
        </div>
    );
}
