import { useState } from 'react';
import axios from 'axios';

const ItemDetails = ({ item, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: item.name,
        price: item.price
    });
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:2137/api/items/${item._id}`);
            onDelete(item._id);
        } catch (error) {
            console.error('Error deleting item:', error);
            setError('Nie udało się usunąć przedmiotu');
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.patch(
                `http://localhost:2137/api/items/${item._id}`,
                formData
            );
            onUpdate(response.data);
            setIsEditing(false);
            setError(null);
        } catch (error) {
            console.error('Error updating item:', error);
            setError('Nie udało się zaktualizować przedmiotu');
        }
    };

    return (
        <div className="item-card">
            {isEditing ? (
                <div className="edit-form">
                    <input
                        type="text"
                        className="form-input"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Nazwa przedmiotu"
                    />
                    <input
                        type="number"
                        className="form-input"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        min="0"
                        step="0.01"
                        placeholder="Cena"
                    />

                    {error && <div className="error-message">{error}</div>}

                    <div className="form-actions">
                        <button className="btn btn-save" onClick={handleUpdate}>
                            Zapisz
                        </button>
                        <button className="btn btn-cancel" onClick={() => setIsEditing(false)}>
                            Anuluj
                        </button>
                    </div>
                </div>
            ) : (
                <div className="item-content">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price">{parseFloat(item.price).toFixed(2)} zł</p>

                    <div className="item-image-container">
                        <img
                            src={`http://localhost:2137/api/items/${item._id}/image`}
                            alt={item.name}
                            className="item-image"
                            onError={(e) => {
                                e.target.src = '/placeholder-image.jpg';
                            }}
                        />
                    </div>

                    <div className="item-actions">
                        <button className="btn btn-edit" onClick={() => setIsEditing(true)}>
                            Edytuj
                        </button>
                        <button className="btn btn-delete" onClick={handleDelete}>
                            Usuń
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemDetails;