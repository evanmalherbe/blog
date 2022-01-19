import React from "react";

// Import components
import Header from "./components/Header";
import RightPanel from "./components/RightPanel";
import LeftPanel from "./components/LeftPanel";
import Footer from "./components/Footer";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import custom stylesheet
import "./App.css";

// Create App class component
class App extends React.Component {
  constructor(props) {
    super(props);
    // Set initial state variables. Includes array to store to do list.
    this.state = {
      isLoaded: false,
      message: "",
      error: null,
    };
  }

  // Runs when page is first loaded.
  componentDidMount() {
    // If statement to check if data has been fetched already or not. Won't run twice.
    if (this.state.isLoaded === false) {
      fetch("/api")
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                message: result.message,
                isLoaded: true,
              },
              () => {
                console.log("componentDidMount has run.");
              }
            );
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );

      // End of if statement to check if data has been loaded yet.
    }
  }

  render() {
    const { error, isLoaded, message } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="app">
          <Header />
          <div className="breadCrumbs">
            <p>Home - Post</p>
          </div>
          <div className="bodyDiv">
            <LeftPanel />
            <div className="centerPanel">
              {" "}
              <p>
                {"« "}
                <strong>{message}</strong>
                {" »"}
              </p>
            </div>
            <RightPanel />
          </div>
          <Footer />

          {/* End of App div */}
        </div>
      );
      // End of if statement
    }

    // End of render
  }

  // End of App
}

// Export app to be used by other files
export default App;
