import React from 'react'
import {useState} from 'react';

function FeedbackItem() {
    const [rating, setRating] = useState(7)
    const [text, setText] = useState('is an example of feedback item')

    const handleClick= () =>{
        setRating((prev) => {
            console.log('prevnro: ' + prev);
            return prev + 1
         
        })
    }

  return (
    <div className='card'>
      <div className="num-display">{rating}</div>
      <div className="text-display">
        {text}
        <button onClick={handleClick}>Click </button>
      </div>
    </div>
  )
}

export default FeedbackItem
