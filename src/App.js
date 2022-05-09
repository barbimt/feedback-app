import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackData from "./data/FeedbackData";
import swal from "sweetalert";

function App() {
  const [feedback, setFeedback] = useState(FeedbackData);
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback])
  };

  const deleteFeedback = (id) => {
    // if (window.confirm("are you sure you want to delete?")) {
    //   setFeedback(feedback.filter((item) => item.id !== id));
    // }
    showModal(id)
  };

 const showModal = (id) => {
    swal({
      title: "Delete Feedback",
      text: "Are you sure you want to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your feedback has been deleted!", {
          icon: "success",

        });
        setFeedback(feedback.filter((item) => item.id !== id));
      } else {
        swal("Your feedback is safe!");
      }
    });
  }
  return (
    <>
      <Header />
      <div className="container">
        <FeedbackForm handleAdd={addFeedback} />
        <FeedbackStats feedback={feedback} />
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
      </div>
    </>
  );
}

export default App;
