import React from 'react';

const OptionComponent = ({ options }) => {
    return (
        <ul>
            {options.map(option => (
                <li key={option.id}>
                    {option.text}
                </li>
            ))}
        </ul>
    );
};

export default OptionComponent;