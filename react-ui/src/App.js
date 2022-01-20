import React from "react";

// Import React Bootstrap components
import Button from "react-bootstrap/Button";

// Import components
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Footer from "./components/Footer";

// Import Components for React-Router (to display certain components based on the URL the user chooses)
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
      authMessage: null,
      error: null,
      username: null,
      password: null,
      loggedIn: false,
      token: null,
      currentUser: null,
    };

    // Binding to make "this" work correctly
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
  }

  // Take user login details and create JWT token, then call "handleAuth" function to authenticate user
  handleLogin(event) {
    if (this.state.username !== null && this.state.password !== null) {
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                token: result.message,
              },
              () => {
                console.log(
                  "Login details sent via post. Token is " + this.state.token
                );
                this.handleAuth();
              }
            );
          },
          (error) => {
            this.setState({
              error,
            });
          }
        );
    } else {
      this.setState(
        {
          isLoaded: false,
        },
        () => {
          console.log("Username and password fields blank.");
          alert(
            "Please enter your username and password, then click 'Login' again."
          );
          this.reloadPage();
        }
      );
      // End of if statement to check that username and password fields are not empty
    }

    // End of handlelogin function
  }

  /* Takes token created in "handleLogin" function and authenticates user */
  handleAuth() {
    let token = this.state.token;
    if (token !== undefined && token !== "Incorrect login!" && token !== null) {
      fetch("/resource", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                isLoaded: true,
                loggedIn: true,
                currentUser: result.currentUser,
                authMessage: result.message,
                username: null,
                password: null,
              },
              () => {
                console.log(
                  "handleAuth has run. Welcome, " + this.state.currentUser
                );
                this.reloadPage();
              }
            );
          },
          (error) => {
            this.setState({
              error,
            });
          }
        );
    } else {
      /* Learned to clear/reset form here:
      https://stackoverflow.com/questions/3786694/how-to-reset-clear-form-through-javascript */

      document.forms["loginForm"].reset();
      alert("Incorrect login details. Please try again.");
      console.log("Invalid token. Not logged in.");

      this.reloadPage();
    }
    // End of handleauth function
  }

  handleLogout(event) {
    this.setState(
      {
        loggedIn: false,
        username: "",
        password: "",
      },
      () => console.log("User logged out.")
    );
  }

  handleRegister(event) {}

  // Functions to save username and password to state when user types them in to login form in header
  handleUsername(event) {
    let value = event.target.value;
    let user = value.trim();
    this.setState(
      {
        username: user,
      },
      () => {
        console.log("Username saved: " + this.state.username);
      }
    );
  }

  handlePassword(event) {
    let value = event.target.value;
    let pwd = value.trim();
    this.setState({
      password: pwd,
    });
  }
  // --------------------------------------------------------- //

  // Reloads page
  reloadPage() {
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
                console.log("Reload page has run.");
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
    const { error, isLoaded, message, currentUser, loggedIn } = this.state;
    let loginStatusMsg;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      if (this.state.loggedIn) {
        loginStatusMsg = (
          <div className="loginStatusDiv">
            <p>Welcome, {currentUser}!</p>
            <Button
              className="logoutButton"
              variant="primary"
              type="button"
              onClick={this.handleLogout}
            >
              Logout
            </Button>
          </div>
        );
      } else {
        loginStatusMsg = (
          <div className="loginStatusDiv">
            <p>No active logins.</p>
          </div>
        );
      }

      return (
        <div className="app">
          <BrowserRouter>
            <Header loggedIn={loggedIn} />
            <div className="underHeader">
              <div className="breadCrumbs">
                <p>Home - Post</p>
              </div>
              {loginStatusMsg}
            </div>
            <Routes>
              <Route
                exact={true}
                path="/"
                element={<Home message={message} />}
              />
              <Route
                path="/Login"
                element={
                  <Login
                    handleLogin={this.handleLogin}
                    handleUsername={this.handleUsername}
                    handlePassword={this.handlePassword}
                    handleRegister={this.handleRegister}
                  />
                }
              />
            </Routes>
          </BrowserRouter>
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
