import { useState } from "react";

// Import custom stylesheet
import "../App.css";

// Function to display Centre Panel
function ReloadPage(props) {
  const [message, setMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(props.isLoaded);
  const [error, setError] = useState(null);

  // If statement to check if data has been fetched already or not. Won't run twice.
  if (props.isLoaded === false) {
    fetch("/api")
      .then((res) => res.json())
      .then(
        (result) => {
          setMessage(result.message);
          setIsLoaded(true);
          console.log("Reload page has run.");

          // Call reload function in parent component (app.js) with parameters
          this.props.reload(error, isLoaded, message);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          // Call reload function in parent component (app.js) with parameters
          this.props.reload(error, isLoaded, message);
        }
      );

    // End of if statement to check if data has been loaded yet.
  }

  return message;
}

export default ReloadPage;
