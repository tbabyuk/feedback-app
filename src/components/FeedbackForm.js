import React, { useState, useContext } from 'react';
import RatingSelect from './RatingSelect';
import Button from './shared/Button';
import Card from './shared/Card';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');

  const {addFeedback} = useContext(FeedbackContext);

  const handleTextChange = (e) => {
    setText(e.target.value);
    if(text.trim().length < 9) {
        setMessage('Review needs to be more than 10 characters')
    } else {
        setMessage('')
        setBtnDisabled(false)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(text.trim().length > 10) {
      const newFeedback = {
        text,
        rating
      }

      addFeedback(newFeedback)

      setText('')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)}/>
        <div className='input-group'>
          <input
            type='text'
            placeholder='Write a review'
            onChange={handleTextChange}
            value={text}
          />
          <Button type='submit' isDisabled={btnDisabled}>Send</Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
