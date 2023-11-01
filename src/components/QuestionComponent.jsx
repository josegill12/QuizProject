import React from 'react';
import OptionComponent from './OptionComponent';

const QuestionComponent = ({ questions }) => {
    return (
        <div>
            {questions.map(question => (
                <div key={question.id}>
                    <h3>{question.text}</h3>
                    <OptionComponent options={question.options} />
                </div>
            ))}
        </div>
    );
};

export default QuestionComponent;