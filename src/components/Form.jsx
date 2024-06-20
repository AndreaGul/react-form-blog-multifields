import { useState } from 'react';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa';
import GestionePost from './GestionePost';

export default function Form() {
    const listCategory = ['Technology', 'Health', 'Lifestyle', 'Education'];
    const listTags = ['AI', 'Machine Learning', 'Nutrition', 'Fitness', 'Mindfulness'];
    const initialData = {
        name: '',
        img: '',
        content: '',
        category: '',
        tags: [],
        available: false,
    };

    const [posts, setPosts] = useState([]);
    const [formData, setFormData] = useState(initialData);
    const [editIndex, setEditIndex] = useState(null);
    const [editArticle, setEditArticle] = useState(initialData);

    const handleSubmit = (e) => {
        e.preventDefault();
        setPosts((array) => [...array, formData]);
        setFormData(initialData);
    };

    const handleFormField = (objectKey, value) => {
        setFormData((currObject) => ({
            ...currObject,
            [objectKey]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleFormField('img', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeArticle = (articleIndex) => {
        setPosts((array) => array.filter((value, i) => i !== articleIndex));
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditArticle(posts[index]);
    };

    const handleSave = (index) => {
        const updatedArticles = [...posts];
        updatedArticles[index] = editArticle;
        setPosts(updatedArticles);
        setEditIndex(null);
        setEditArticle(initialData);
    };

    const handleEditField = (field, value) => {
        setEditArticle((currObject) => ({
            ...currObject,
            [field]: value,
        }));
    };

    const renderField = (objKey, value) => {
        if (typeof value === 'boolean') {
            return (
                <label key={`formElement${objKey}`} className="input-css">
                    {objKey}
                    <input
                        name={objKey}
                        type="checkbox"
                        checked={formData[objKey]}
                        onChange={(e) => handleFormField(objKey, e.target.checked)}
                    />
                </label>
            );
        } else if (Array.isArray(value)) {
            if (objKey === 'tags') {
                return (
                    <div key={`formElement${objKey}`}>
                        <h5>Tags:</h5>
                        <ul>
                            {listTags.map((element, index) => (
                                <li key={`item${index}`}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={formData.tags?.includes(element)}
                                            onChange={() => {
                                                const curr = formData.tags || [];
                                                const newTags = curr.includes(element)
                                                    ? curr.filter((e) => e !== element)
                                                    : [...curr, element];
                                                handleFormField('tags', newTags);
                                            }}
                                        />
                                        {element}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            }
        } else if (objKey === 'category') {
            return (
                <div key={`formElement${objKey}`}>
                    <h5>Categoria:</h5>
                    <select
                        className="input-css"
                        value={formData.category}
                        onChange={(e) => handleFormField('category', e.target.value)}
                    >
                        <option value="">Seleziona una categoria</option>
                        {listCategory.map((category, index) => (
                            <option key={`category${index}`} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            );
        } else if (objKey === 'img') {
            return (
                <div key={`formElement${objKey}`} className="input-css container-input-img">
                    <label>
                        {objKey}
                        <input className="input-img" type="file" onChange={handleFileChange} />
                    </label>
                    {formData.img && (
                        <div>
                            <img
                                src={formData.img}
                                alt="Preview"
                                className="preview-img"
                            />
                        </div>
                    )}
                </div>
            );
        } else {
            return (
                <input
                    key={`formElement${objKey}`}
                    name={objKey}
                    type={typeof value === 'number' ? 'number' : 'text'}
                    placeholder={objKey}
                    className="input-css"
                    value={formData[objKey]}
                    onChange={(e) => handleFormField(objKey, e.target.value)}
                />
            );
        }
    };

    return (
        <>
        
            <div className="form-section">
                <form onSubmit={handleSubmit} className="form-container">
                    <h2>Aggiungi un nuovo post</h2>
                    <div className="form-fields">
                        {Object.keys(initialData).map((objKey) =>
                            renderField(objKey, initialData[objKey])
                        )}
                    </div>
                    <button className="button-css">Aggiungi</button>
                </form>
            </div>
            <GestionePost
                posts={posts}
                editIndex={editIndex}
                editArticle={editArticle}
                listTags={listTags}
                listCategory={listCategory}
                handleEdit={handleEdit}
                handleSave={handleSave}
                removeArticle={removeArticle}
                handleEditField={handleEditField}
            />
        
        </>
    );
}
