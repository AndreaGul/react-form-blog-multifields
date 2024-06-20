import React from 'react';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa';

export default function GestionePost({
    posts,
    editIndex,
    editArticle,
    listTags,
    listCategory,
    handleEdit,
    handleSave,
    removeArticle,
    handleEditField
}) {
    return (
        <div className="posts-section">
            <h2>Posts</h2>
            <div className="ul-container">
                <ul className="ul-css">
                    {posts.map((post, index) => (
                        <li key={`post${index}`} className="li-css">
                            <div className="post-content">
                                {Object.keys(post).map((key) => (
                                    <div key={`postField${index}${key}`} className="post-field">
                                        <strong>{key}:</strong>{' '}
                                        {editIndex === index ? (
                                            key === 'tags' ? (
                                                <ul>
                                                    {listTags.map((tag, tagIndex) => (
                                                        <li key={`tag${tagIndex}`}>
                                                            <label>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={editArticle.tags?.includes(tag)}
                                                                    onChange={() => {
                                                                        const curr = editArticle.tags || [];
                                                                        const newTags = curr.includes(tag)
                                                                            ? curr.filter((e) => e !== tag)
                                                                            : [...curr, tag];
                                                                        handleEditField('tags', newTags);
                                                                    }}
                                                                />
                                                                {tag}
                                                            </label>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : key === 'category' ? (
                                                <select
                                                    className="input-css"
                                                    value={editArticle[key]}
                                                    onChange={(e) => handleEditField(key, e.target.value)}
                                                >
                                                    <option value="">Seleziona una categoria</option>
                                                    {listCategory.map((category, categoryIndex) => (
                                                        <option key={`editCategory${categoryIndex}`} value={category}>
                                                            {category}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : key === 'available' ? (
                                                <input
                                                    type="checkbox"
                                                    checked={editArticle[key]}
                                                    onChange={(e) => handleEditField(key, e.target.checked)}
                                                />
                                            ) : key === 'img' ? (
                                                <>
                                                    <input
                                                        className='input-update input-img'
                                                        type="file"
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => {
                                                                    handleEditField('img', reader.result);
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }}
                                                    />
                                                    {editArticle.img && (
                                                        <div>
                                                            <img src={editArticle.img} alt="Preview" className="preview-img" />
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <input
                                                    type="text"
                                                    className="input-update"
                                                    value={editArticle[key]}
                                                    onChange={(e) => handleEditField(key, e.target.value)}
                                                />
                                            )
                                        ) : key === 'img' ? (
                                            post[key] ? (
                                                <img src={post[key]} alt={post.name} className="preview-img" />
                                            ) : ('N/A')
                                        ) : (
                                            post[key].toString()
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="container-icons">
                                {editIndex === index ? (
                                    <FaSave className="save-icon" onClick={() => handleSave(index)} />
                                ) : (
                                    <FaEdit className="edit-icon" onClick={() => handleEdit(index)} />
                                )}
                                <FaTrash className="delete-icon" onClick={() => removeArticle(index)} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}