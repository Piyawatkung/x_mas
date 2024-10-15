import Card from './Card';

export default function ChristmasTree({ cards, onEdit, onDelete, currentUserId, isSharedView }) {
    return (
        <div className="relative w-full h-96">
            <div className="absolute inset-0 bg-green-700 clip-tree"></div>
            {cards.map((card, index) => (
                <Card
                    key={card.id}
                    {...card}
                    style={{
                        position: 'absolute',
                        top: `${20 + index * 15}%`,
                        left: `${10 + (index % 3) * 30}%`,
                    }}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isOwner={card.userId === currentUserId}
                    isSharedView={isSharedView}
                />
            ))}
        </div>
    );
}
