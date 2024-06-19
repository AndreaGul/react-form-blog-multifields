import { useState } from 'react';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa';


export default function() {
    const [articles, setArticles] = useState([]);
    const [articleName, setArticleName] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editArticle, setEditArticle] = useState('');

    console.log(articleName, articles);

    const onSubmit = (e) => {
        e.preventDefault();

        setArticles(array => ([articleName, ...array]));
        setArticleName('');
      
    }

    const removeArticle = (articleIndex) => {
        setArticles(array => array.filter((value, i) => i !== articleIndex));
    }

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditArticle(articles[index]);
    }

    const handleSave = (index) => {
        const updatedArticles = [...articles];
        updatedArticles[index] = editArticle;
        setArticles(updatedArticles);
        setEditIndex(null);
        setEditArticle('');
    }

    return (
        <>
            <div className="all-container">
                <div className="container">
                    <form onSubmit={onSubmit} className='form-container'>
                        <input
                            type="text"
                            className='input-css'
                            value={articleName}
                            placeholder='Scrivi un articolo'
                            onChange={e => setArticleName(e.target.value)}
                        />
                        <button className='button-css' disabled={(articleName) === ''}>
                            Aggiungi
                        </button>
                    </form>
                    <div className='ul-container' style={{display: articles.length!==0? 'block' :'none' }}>
                        <ul className='ul-css'>
                            {articles.map((article, index) => (
                                <li key={`article${index}`} className='li-css'>
                                    {editIndex === index ? (
                                        <input
                                            type="text"
                                            className='input-update'
                                            value={editArticle}
                                            onChange={(e) => setEditArticle(e.target.value)}
                                        />
                                    ) : (
                                        <h5 className='testo-articolo'>{article}</h5>
                                    )}
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
            </div>
        </>
    );
}