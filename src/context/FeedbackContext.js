import {createContext, useState} from 'react'
import swal from "sweetalert";
import { v4 as uuidv4 } from "uuid";
const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: "This item is from context",
            rating: 10
        }
    ])

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback]);
      };

    const deleteFeedback = (id) => {
        showModal(id);
      };
    
      const showModal = (id) => {
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


    return <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        addFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;