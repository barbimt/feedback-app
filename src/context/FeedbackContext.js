import { createContext, useState } from "react";
import swal from "sweetalert";
import { v4 as uuidv4 } from "uuid";
const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "This item is feedback item1",
      rating: 10,
    },
    {
      id: 2,
      text: "This item is feedback item2",
      rating: 9,
    },
    {
        id: 3,
        text: "This item is feedback item3",
        rating: 6,
      },
  ]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  //add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  //delete feedback
  const deleteFeedback = (id) => {
    showDeleteModal(id);
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
      timer: 3000,
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
  const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) =>
         item.id === id ? // condicion
         {  ...item, ...updItem } : // true
         item // false
        ))
        
  } 

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
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
