
import React, { useState } from 'react';
import axios from 'axios';


const AddQuestionForm = ({ quizId }) => {
    const [questionText, setQuestionText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/questions/create/', {
            quiz: quizId,
            text: questionText,
            // Include options data if needed
        })
        .then(response => {
            console.log('Question added:', response.data);
            // You can reset the form or navigate the user elsewhere
        })
        .catch(error => console.error('Error adding question:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Question:
                <input type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} />
            </label>
            <button type="submit">Add Question</button>
        </form>
    );
};

export default AddQuestionForm;
