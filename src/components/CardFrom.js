import { useState } from 'react';

export default function CardForm({ onAdd, cardsCount }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() && cardsCount < 5) {
            onAdd(text.trim());
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your wish (max 5 words)"
                className="w-full p-2 border rounded"
                maxLength={50}
            />
            <button
                type="submit"
                className="mt-2 bg-red-500 text-white p-2 rounded disabled:bg-gray-300"
                disabled={cardsCount >= 5}
            >
                Add Wish
            </button>
        </form>
    );
}