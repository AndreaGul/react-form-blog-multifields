import { useState } from 'react';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa';


export default function() {

    const listCategory = [
        'Technology',
        'Health',
        'Lifestyle',
        'Education'
    ]

    const listTags=[
        'AI',
        'Machine Learning',
        'Nutrition',
        'Fitness',
        'Mindfulness'
    ]

    const initialData = {
        name: '',
        img:'',
        content:'',
        category:'',
        tags:[],
        available:'',
    }



    const [posts, setPosts] = useState([]);
    const [formData, setFormData] = useState(initialData);
    const [editIndex, setEditIndex] = useState(null);
    const [editArticle, setEditArticle] = useState('');

    console.log(formData, posts);

    const handleSubmit = (e) => {
        e.preventDefault();

        setPosts(array => ([...array, formData ]));
        setFormData(initialData);
      
    }

    const handleFormField = (objectKey,value)=>{

        setFormData(currObject => ({
            ...currObject, [objectKey]: value
        }))

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
                    <form onSubmit={handleSubmit} className='form-container'>
                        {Object.keys(initialData).map((objKey,index)=>{
                            const value = initialData[objKey];
                            switch(typeof value){
                                default:
                                    return(
                                        <input
                                        key={`formElement${index}`}
                                        name={objKey}
                                        type={typeof value === 'number' ? 'number':'text'}
                                        placeholder={objKey}
                                        className='input-css'
                                        value={formData.objKey}
                                        onChange={e => handleFormField(objKey,e.target.value)}
                                    />
                                    )
                            }
                        })}
                        <input
                            type="text"
                            className='input-css'
                            value={formData.name}
                            placeholder='Scrivi un articolo'
                            onChange={e => handleFormField(name,e.target.value)}
                        />
                        <button className='button-css' >
                            Aggiungi
                        </button>
                    </form>
                    <div className='ul-container' style={{display: posts.length!==0? 'block' :'none' }}>
                        <ul className='ul-css'>
                            {posts.map((post, index) => (
                                <li key={`post${index}`} className='li-css'>
                                    {editIndex === index ? (
                                        <input
                                            type="text"
                                            className='input-update'
                                            value={editArticle}
                                            onChange={(e) => setEditArticle(e.target.value)}
                                        />
                                    ) : (
                                        <h5 className='testo-articolo'>{post.name}</h5>
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