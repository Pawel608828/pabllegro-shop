import { useState } from 'react';
import axios from 'axios';

const ItemForm = ({ onItemAdded }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('image', image);

        try {
            const apiUrl = import.meta.env.MODE === 'development'
                ? 'http://localhost:2137/api/items'
                : '/api/items';

            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setName('');
            setPrice('');
            setImage(null);
            setPreview('');

            if (onItemAdded) {
                onItemAdded(response.data);
            }
        } catch (err) {
            setError(err.response?.data?.error || err.message || 'Wystąpił błąd podczas dodawania przedmiotu');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            maxWidth: '500px',
            margin: '0 auto',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{
                marginTop: 0,
                color: '#333',
                textAlign: 'center'
            }}>Dodaj nowy przedmiot</h3>

            {error && <div style={{
                color: 'red',
                marginBottom: '10px',
                padding: '10px',
                backgroundColor: '#ffeeee',
                borderRadius: '4px',
                border: '1px solid #ffcccc'
            }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '5px',
                        fontWeight: '500',
                        color: '#555'
                    }}>Nazwa przedmiotu</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '5px',
                        fontWeight: '500',
                        color: '#555'
                    }}>Cena (PLN)</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        min="0"
                        step="0.01"
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '5px',
                        fontWeight: '500',
                        color: '#555'
                    }}>Zdjęcie</label>
                    <div style={{
                        border: '1px dashed #ddd',
                        padding: '15px',
                        textAlign: 'center',
                        borderRadius: '4px',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <input
                            type="file"
                            onChange={(e) => {
                                if (e.target.files[0]) {
                                    setImage(e.target.files[0]);
                                    setPreview(URL.createObjectURL(e.target.files[0]));
                                }
                            }}
                            accept="image/*"
                            required
                            style={{ display: 'none' }}
                            id="fileInput"
                        />
                        <label htmlFor="fileInput" style={{
                            display: 'inline-block',
                            padding: '8px 15px',
                            backgroundColor: '#ff5c00',
                            color: 'white',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: '500'
                        }}>
                            Wybierz plik
                        </label>
                        {image && <div style={{
                            marginTop: '10px',
                            fontSize: '14px',
                            color: '#666'
                        }}>{image.name}</div>}
                    </div>
                </div>

                {preview && (
                    <div style={{
                        marginBottom: '15px',
                        textAlign: 'center'
                    }}>
                        <img
                            src={preview}
                            alt="Podgląd"
                            style={{
                                maxWidth: '200px',
                                maxHeight: '200px',
                                borderRadius: '4px',
                                border: '1px solid #eee'
                            }}
                        />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                        backgroundColor: '#ff5c00',
                        color: 'white',
                        border: 'none',
                        padding: '12px 15px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '600',
                        marginTop: '10px',
                        opacity: isLoading ? 0.7 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}
                >
                    {isLoading ? (
                        <>
                            <span style={{
                                display: 'inline-block',
                                width: '16px',
                                height: '16px',
                                border: '2px solid rgba(255,255,255,0.3)',
                                borderTopColor: 'white',
                                borderRadius: '50%',
                            }}></span>
                            Dodawanie...
                        </>
                    ) : (
                        'Dodaj przedmiot'
                    )}
                </button>
            </form>
        </div>
    );
};

export default ItemForm;