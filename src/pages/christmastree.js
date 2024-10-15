import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ChristmasTree from '../components/ChristmasTree';
import CardForm from '../components/CardFrom';
import ShareLink from '../components/ShareLink';

export default function Christmastree() {
    const [cards, setCards] = useState([]);
    const [userId, setUserId] = useState('');
    const [isSharedView, setIsSharedView] = useState(false);

    useEffect(() => {
        const storedUserId = localStorage.getItem('christmasCardUserId');
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            const newUserId = uuidv4();
            setUserId(newUserId);
            localStorage.setItem('christmasCardUserId', newUserId);
        }

        const urlParams = new URLSearchParams(window.location.search);
        const sharedId = urlParams.get('id');

        if (sharedId) {
            setIsSharedView(true);
            fetchSharedCards(sharedId);
        } else {
            const storedCards = localStorage.getItem('christmasCards');
            if (storedCards) {
                setCards(JSON.parse(storedCards));
            }
        }
    }, []);

    const fetchSharedCards = async (sharedId) => {
        // In a real application, this would be an API call
        // For now, we'll simulate it with localStorage
        const allCards = JSON.parse(localStorage.getItem('allChristmasCards')) || {};
        setCards(allCards[sharedId] || []);
    };

    const addCard = (text) => {
        if (cards.length < 5) {
            const newCard = { id: uuidv4(), text, userId };
            const newCards = [...cards, newCard];
            setCards(newCards);
            saveCards(newCards);
        }
    };

    const editCard = (id, newText) => {
        const newCards = cards.map(card =>
            card.id === id && card.userId === userId ? { ...card, text: newText } : card
        );
        setCards(newCards);
        saveCards(newCards);
    };

    const deleteCard = (id) => {
        const newCards = cards.filter(card => !(card.id === id && card.userId === userId));
        setCards(newCards);
        saveCards(newCards);
    };

    const saveCards = (cardsToSave) => {
        localStorage.setItem('christmasCards', JSON.stringify(cardsToSave));
        // In a real application, you'd also save to a database here
        const allCards = JSON.parse(localStorage.getItem('allChristmasCards')) || {};
        allCards[userId] = cardsToSave;
        localStorage.setItem('allChristmasCards', JSON.stringify(allCards));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold text-green-800 mb-8">Christmas Wish Cards</h1>
            <div className="w-full max-w-3xl">
                <ChristmasTree
                    cards={cards}
                    onEdit={editCard}
                    onDelete={deleteCard}
                    currentUserId={userId}
                    isSharedView={isSharedView}
                />
                {!isSharedView && (
                    <>
                        <CardForm onAdd={addCard} cardsCount={cards.length} />
                        <ShareLink userId={userId} />
                    </>
                )}
            </div>
        </div>
    );
}