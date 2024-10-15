import { useState, useEffect } from 'react';

export default function ShareLink({ userId }) {
    const [shareUrl, setShareUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setShareUrl(`$christmastree?id=${userId}`);
        }
    }, [userId]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('Share link copied to clipboard!');
        });
    };

    if (!shareUrl) {
        return null; // หรือแสดง loading state
    }

    return (
        <div className="mt-4">
            <p className="font-bold">Share your Christmas tree:</p>
            <div className="flex mt-2">
                <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-grow p-2 border rounded-l"
                />
                <button
                    onClick={copyToClipboard}
                    className="bg-blue-500 text-white p-2 rounded-r"
                >
                    Copy
                </button>
            </div>
        </div>
    );
}