import React from 'react'

const textInput = (title, type, inputValue, inputChange) => (
    <div>
        {title}
        <input
        type={type}
        value={inputValue}
        name={title}
        onChange={({ target }) => inputChange(target.value)}
        />
    </div>
)

export default textInput