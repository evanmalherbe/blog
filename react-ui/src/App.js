import React from "react";

// Import React Bootstrap components
import Button from "react-bootstrap/Button";

// Import components
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Register from "./components/Register";
// import ReloadPage from "./components/ReloadPage";
import CreatePost from "./components/CreatePost";

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
    // Set initial state variables.
    this.state = {
      isLoaded: false,
      message: null,
      authMessage: null,
      error: null,
      username: null,
      password: null,
      loggedIn: false,
      token: null,
      currentUser: null,
      titlesArray: [],
      postsArray: [],
      idArray: [],
      authorArray: [],
      postTitle: null,
      postBody: null,
      usersArray: [],
      pwordArray: [],
      adminStatusArray: [],
    };

    // Binding to make "this" work correctly
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
    this.reload = this.reload.bind(this);

    this.getPosts = this.getPosts.bind(this);
    this.getLogins = this.getLogins.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleSavePost = this.handleSavePost.bind(this);
  }

  // Functions to save post title and blog post to state when user types them in to create post form
  handleTitle(event) {
    let value = event.target.value;
    let title = value.trim();
    this.setState(
      {
        postTitle: title,
      },
      () => {
        console.log("Post title saved: " + this.state.postTitle);
      }
    );
  }

  handlePost(event) {
    let value = event.target.value;
    let post = value.trim();
    this.setState(
      {
        postBody: post,
      },
      () => {
        console.log("Post body saved to state");
      }
    );
  }

  handleSavePost(event) {
    if (this.state.postTitle !== null || this.state.postBody !== null) {
      // Add "///" to end of post to help separate posts later (commas in post body where making it difficult to separate posts into an array, so this is what I came up with)
      let finalPost = this.state.postBody + "///";

      fetch("/addpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          author: this.state.currentUser,
          title: this.state.postTitle,
          post: finalPost,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                message: result.message,
              },
              () => {
                document.forms["createPostForm"].reset();
                console.log(
                  "Blog post info sent via post. Reply is " + this.state.message
                );

                alert("Blog post saved.");
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
      this.setState(
        {
          isLoaded: false,
        },
        () => {
          console.log("Post title or post body field is blank.");
          alert(
            "Post title or post body field is blank. Please fill in, then click the 'Save Post' button."
          );
          this.reloadPage();
        }
      );
      // End of if statement to check that username and password fields are not empty
    }
  }

  // ---------------------------------------------------------------- //

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
          users: this.state.usersArray,
          pwords: this.state.pwordArray,
          admin: this.state.adminStatusArray,
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

  // Used to get state info from ReloadPage component
  reload(error, isLoaded, message) {
    this.setState(
      {
        message: message,
        isLoaded: isLoaded,
        error: error,
      },
      () => {
        console.log("Reload has run.");
      }
    );
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
                isLoaded: false,
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
        username: null,
        password: null,
        currentUser: null,
      },
      () => console.log("User logged out.")
    );
  }

  /* Register new user. Saves their login details to db and makes it so they can only access their own to do 
  list */
  handleRegister(event) {
    if (this.state.username !== null && this.state.password !== null) {
      fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          admin: false,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                isLoaded: false,
              },
              () => {
                console.log("Registration details sent via post.");
                alert(
                  "New user, " +
                    this.state.username +
                    ", registered. Please log in."
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
      this.setState(
        {
          isLoaded: false,
        },
        () => {
          console.log("Username and password fields blank.");
          alert(
            "Please enter your new username and password, then click 'Register' again."
          );
          this.reloadPage();
        }
      );
      // End of if statement to check that state variables "username" and "password" are not null
    }
    // End of handleregister function
  }

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

  // Retrieve blog posts from db
  getPosts() {
    console.log("Get posts has run");
    fetch("/getposts")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState(
            {
              isLoaded: true,
              titlesArray: result.titles,
              postsArray: result.posts,
              idArray: result.ids,
              authorArray: result.authors,
            }
            // () => {
            //   console.log("Posts say: " + this.state.postsArray);
            //   console.log("titles say: " + this.state.titlesArray);
            //   console.log("ids say: " + this.state.idArray);
            //   console.log("authors say: " + this.state.authorArray);
            // }
          );
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );

    // End of Get Posts
  }

  // Retrieve login details from db
  getLogins() {
    console.log("Get logins has run");
    fetch("/getlogins")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            usersArray: result.users,
            pwordArray: result.pwords,
            adminStatusArray: result.admin,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );

    // End of Get logins
  }

  // Reloads page
  reloadPage() {
    if (this.state.isLoaded === false) {
      this.getPosts();
      this.getLogins();
      console.log("Reload page has run.");
      // End of if statement to check if data has been loaded yet.
    }
    // // If statement to check if data has been fetched already or not. Won't run twice.
    // if (this.state.isLoaded === false) {
    //   fetch("/api")
    //     .then((res) => res.json())
    //     .then(
    //       (result) => {
    //         this.setState(
    //           {
    //             message: result.message,
    //             isLoaded: true,
    //           },
    //           () => {
    //             console.log("Reload page has run.");
    //           }
    //         );
    //       },
    //       (error) => {
    //         this.setState({
    //           isLoaded: true,
    //           error,
    //         });
    //       }
    //     );

    //   // End of if statement to check if data has been loaded yet.
    // }
  }

  // Runs when page is first loaded.
  componentDidMount() {
    if (this.state.isLoaded === false) {
      this.getPosts();
      this.getLogins();
      console.log("componentDidMount has run.");
      // End of if statement to check if data has been loaded yet.
    }
    // // If statement to check if data has been fetched already or not. Won't run twice.
    // if (this.state.isLoaded === false) {
    //   fetch("/api")
    //     .then((res) => res.json())
    //     .then(
    //       (result) => {
    //         this.setState(
    //           {
    //             message: result.message,
    //             isLoaded: true,
    //           },
    //           () => {
    //             console.log("componentDidMount has run.");
    //           }
    //         );
    //       },
    //       (error) => {
    //         this.setState({
    //           isLoaded: true,
    //           error,
    //         });
    //       }
    //     );

    //   // End of if statement to check if data has been loaded yet.
    // }
  }

  render() {
    const {
      error,
      isLoaded,
      message,
      currentUser,
      loggedIn,
      titlesArray,
      postsArray,
      idArray,
      authorArray,
    } = this.state;

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

              {/* Display login status message. Contents differ according to whether user is logged in or 
              not */}
              {loginStatusMsg}
            </div>
            <Routes>
              <Route
                exact={true}
                path="/"
                element={
                  <Home
                    titlesArray={titlesArray}
                    idArray={idArray}
                    postsArray={postsArray}
                    authorArray={authorArray}
                    message={message}
                  />
                }
              />
              titlesArray: [], postsArray: [], idArray: [], authorArray: [],
              <Route
                path="/Login"
                element={
                  <Login
                    handleLogin={this.handleLogin}
                    handleUsername={this.handleUsername}
                    handlePassword={this.handlePassword}
                  />
                }
              />
              <Route
                path="/Register"
                element={
                  <Register
                    handleUsername={this.handleUsername}
                    handlePassword={this.handlePassword}
                    handleRegister={this.handleRegister}
                  />
                }
              />
              <Route
                path="/CreatePost"
                element={
                  <CreatePost
                    handleTitle={this.handleTitle}
                    handlePost={this.handlePost}
                    handleSavePost={this.handleSavePost}
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
