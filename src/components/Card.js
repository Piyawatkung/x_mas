import { useState } from 'react';

export default function Card({ id, text, style, onEdit, onDelete, isOwner, isSharedView }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(text);

    const handleSave = () => {
        onEdit(id, editText);
        setIsEditing(false);
    };

    return (
        <div className="bg-white p-2 rounded shadow-md" style={style}>
            {isEditing ? (
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full border rounded p-1"
                />
            ) : (
                <p>{text}</p>
            )}
            {!isSharedView && isOwner && (
                <div className="mt-2">
                    {isEditing ? (
                        <button onClick={handleSave} className="text-blue-500 mr-2">Save</button>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="text-blue-500 mr-2">Edit</button>
                    )}
                    <button onClick={() => onDelete(id)} className="text-red-500">Delete</button>
                </div>
            )}
        </div>
    );
}