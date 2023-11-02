import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionComponent from './QuestionComponent';

const QuizComponent = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [answers, setAnswers] = useState({}); // Store selected options for each question

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

    // Function to handle the selection of an option
    const handleSelectOption = (questionId, optionId) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: optionId
        }));
    };

    // Function to handle submission of answers
    const handleSubmit = () => {
        // Here you can send the answers back to the Django backend for evaluation
        // or evaluate them on the client-side depending on your requirement
        console.log('Submitted Answers:', answers);
    };

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
                    {quiz.questions.map(question => (
                        <QuestionComponent key={question.id} question={question} onSelectOption={handleSelectOption} />
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit Answers</button>
        </div>
    );
};

export default QuizComponent;