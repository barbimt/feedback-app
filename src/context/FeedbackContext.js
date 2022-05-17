import { createContext, useState, useEffect } from "react";
import swal from "sweetalert";
const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(()=>{
  fetchFeedback()
  },[])

  //Fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await response.json()
    console.log(data)
    setFeedback(data)
    setIsLoading(false)
  }

  //add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method:'POST',  
      headers: {
      'Content-Type': 'application/json'
     },
     body: JSON.stringify(newFeedback),
  })
    const data = await response.json()
    setFeedback([data, ...feedback]);
  };

  //delete feedback
  const deleteFeedback = async (id) => {
    showDeleteModal(id);
    await fetch(`/feedback/${id}`, {method: 'DELETE'})
  };

  const showDeleteModal = (id) => {
    swal({
      title: "Delete Feedback",
      text: "Are you sure you want to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your feedback has been deleted!", {
          icon: "success",
        });
        setFeedback(feedback.filter((item) => item.id !== id));
      } else {
        swal("Your feedback is safe!");
      }
    });
  };

  const showEditModal = () => {
    swal("Your feedback has been updated", {
      buttons: false,
      timer: 2000,
    });
  }

  //set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };
  //update feedback item
  const updateFeedback = async(id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(updItem)
    })
    const data = await response.json()

        setFeedback(feedback.map((item) =>
         item.id === id ? // condicion
         {  ...item, ...data } : // true
         item // false
        ))
        
  } 

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
        showEditModal,

      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
