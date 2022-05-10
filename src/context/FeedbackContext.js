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
        },
        {
            id: 2,
            text: "This item is feedback item",
            rating: 10
        }
    ])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    //add feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback]);
      };

      //delete feedback
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

      //set item to be updated
      const editFeedback = (item) => {
          setFeedbackEdit(
              {
                  item,
                  edit: true
              }
          )
      } 


    return <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;