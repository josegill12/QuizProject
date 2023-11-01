import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionComponent from './QuestionComponent';

const QuizComponent = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/quizzes/')
            .then(response => {
                setQuizzes(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch quizzes.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading quizzes...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Quizzes</h1>
            {quizzes.map(quiz => (
                <div key={quiz.id}>
                    <h2>{quiz.title}</h2>
                    <QuestionComponent questions={quiz.questions} />
                </div>
            ))}
        </div>
    );
};

export default QuizComponent;