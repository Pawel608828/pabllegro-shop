import { useEffect, useState } from 'react';
import ItemDetails from '../components/ItemDetails';
import ItemForm from '../components/ItemForm';
import axios from 'axios';

const Home = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:2137/api/items');
            setItems(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleItemAdded = (newItem) => {
        setItems([newItem, ...items]);
    };

    const handleItemDeleted = (id) => {
        setItems(items.filter(item => item._id !== id));
    };

    const handleItemUpdated = (updatedItem) => {
        setItems(items.map(item =>
            item._id === updatedItem._id ? { ...item, ...updatedItem } : item
        ));
    };

    return (
        <div className="pages">
            <h1 className="page-title">Pabllegro</h1>

            <div className="home">
                <div className="form-section">
                    <h2 className="section-title">Dodaj nowy przedmiot</h2>
                    <ItemForm onItemAdded={handleItemAdded} />
                </div>

                <div className="items-section">
                    <h2 className="section-title">Lista przedmiotów <span className="items-count">({items.length})</span></h2>

                    {loading ? (
                        <p className="loading-message">Ładowanie...</p>
                    ) : error ? (
                        <p className="error-message">Błąd: {error}</p>
                    ) : items.length > 0 ? (
                        <div className="items-grid">
                            {items.map(item => (
                                <ItemDetails
                                    key={item._id}
                                    item={item}
                                    onDelete={handleItemDeleted}
                                    onUpdate={handleItemUpdated}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="no-items-message">Brak przedmiotów do wyświetlenia</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;