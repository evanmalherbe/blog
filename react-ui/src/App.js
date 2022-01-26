import React from "react";

// Import React Bootstrap components
import Button from "react-bootstrap/Button";

// Import components
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Register from "./components/Register";
import CreatePost from "./components/CreatePost";
import AdminArea from "./components/AdminArea";
import GetPosts from "./components/GetPosts";
import EditPost from "./components/EditPost";
import DeletePost from "./components/DeletePost";

// Import Components for React-Router (to display certain components based on the URL the user chooses)
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
      adminStatus: null,
      titlesArray: [],
      postsArray: [],
      idArray: [],
      authorArray: [],
      postId: null,
      postAuthor: null,
      postTitle: null,
      postBody: null,
      usersArray: [],
      pwordArray: [],
      adminStatusArray: [],
      editPostSubmitted: false,
      admin: null,
      selectedUser: null,
      dateCreatedArray: [],
    };

    // Binding to make "this" work correctly
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRegister = this.handleRegister.bind(this);

    this.loadPosts = this.loadPosts.bind(this);
    this.getLogins = this.getLogins.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleSavePost = this.handleSavePost.bind(this);
    this.handleEditPost = this.handleEditPost.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.callEditPost = this.callEditPost.bind(this);
    this.createWelcomeMsg = this.createWelcomeMsg.bind(this);
    this.updateSelectedUser = this.updateSelectedUser.bind(this);
  }

  updateSelectedUser(user) {
    this.setState({ selectedUser: user }, () =>
      console.log("selected user is now: " + this.state.selectedUser)
    );
  }

  callEditPost(postId, postTitle, postBody, postAuthor) {
    //let redirectUrl = "/EditPost";
    this.setState(
      {
        postId: postId,
        postTitle: postTitle,
        postBody: postBody,
        postAuthor: postAuthor,
      },
      () => {
        console.log(
          "Updated post info saved to state. Post title is: " +
            this.state.postTitle
        );
      }
    );
  }

  handleEditPost(postId, postTitle, postBody) {
    fetch("/updatepost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: postId,
        title: postTitle,
        post: postBody,
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
              console.log(
                "Post request to update blog post sent. " + result.message
              );
              this.reloadPage();
            }
          );
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error,
          });
        }
      );
  }

  handleDeletePost(id) {
    console.log("Got to handle delete post");

    this.setState(
      {
        postID: id,
      },
      () =>
        console.log("Post id saved to state. Post id is: " + this.state.postId)
    );

    // let callDeletePost = <Navigate to="/DeletePost" />;
    // return callDeletePost;

    // // Learned how to use window.confirm here:
    // // https://stackoverflow.com/questions/63311845/unexpected-use-of-confirm-no-restricted-globals

    // if (
    //   window.confirm("Are you sure you want to delete this blog post?") === true
    // ) {
    //   fetch("/deletepost", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       id: postId,
    //     }),
    //   })
    //     .then((res) => res.json())
    //     .then(
    //       (result) => {
    //         this.setState(
    //           {
    //             isLoaded: false,
    //           },
    //           () => {
    //             console.log(
    //               "Post request to delete blog post sent. " + result.message
    //             );
    //             this.reloadPage();
    //           }
    //         );
    //       },
    //       (error) => {
    //         this.setState({
    //           isLoaded: false,
    //           error,
    //         });
    //       }
    //     );

    //   // End of if statement to confirm if user really wants to delete post
    // }

    // End of handle delete post function
  }

  // Functions to save post title and blog post to state when user types them into "create post" form
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

      // Learned how to add a time stamp here:
      // https://stackoverflow.com/questions/9756120/how-do-i-get-a-utc-timestamp-in-javascript

      let date = new Date().toString();

      // Learned how to remove words from a string here:
      // https://stackoverflow.com/questions/10398931/how-to-remove-text-from-a-string

      date = date.replace(" (South Africa Standard Time)", "");

      fetch("/addpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          author: this.state.currentUser,
          title: this.state.postTitle,
          post: finalPost,
          datecreated: date,
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
                  "Blog post info sent via post. Reply is: " +
                    this.state.message
                );
                alert("Your blog post has been saved successfully.");
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
                admin: result.admin,
              },
              () => {
                console.log(
                  "Login details sent via post. Token is " +
                    this.state.token +
                    ". Admin Status is: " +
                    this.state.admin
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
                isLoaded: false,
                loggedIn: true,
                currentUser: result.currentUser,
                authMessage: result.message,
                adminStatus: result.adminStatus,
                username: null,
                password: null,
              },
              () => {
                console.log(
                  "handleAuth has run. Welcome, " +
                    this.state.currentUser +
                    "! Admin status is: " +
                    this.state.adminStatus +
                    ". Auth message says: " +
                    this.state.authMessage
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
        authMessage: null,
        message: null,
        token: null,
        username: null,
        password: null,
        currentUser: null,
        adminStatus: null,
        selectedUser: null,
      },
      () => {
        console.log("User logged out.");
      }
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

  // Retrieve blog posts from db - This function is called from child component "GetPosts.js"
  loadPosts(
    getIsLoaded,
    getTitlesArray,
    getPostsArray,
    getIdArray,
    getAuthorArray,
    getDateCreatedArray
  ) {
    this.setState({
      isLoaded: getIsLoaded,
      titlesArray: getTitlesArray,
      postsArray: getPostsArray,
      idArray: getIdArray,
      authorArray: getAuthorArray,
      dateCreatedArray: getDateCreatedArray,
    });

    // End of load Posts
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
      this.getLogins();
      console.log("Reload page has run. Logins fetched");

      // End of if statement to check if data has been loaded yet.
    }

    //End of reload page
  }

  // Check if user is logged in and whether they're admin or not, then create appropriate welcome message
  createWelcomeMsg(loggedIn, adminStatus, currentUser) {
    if (loggedIn) {
      // Learned to capitalise first letter of a string here:
      // https://flaviocopes.com/how-to-uppercase-first-letter-javascript/

      const name = currentUser;
      const nameCapitalised = name.charAt(0).toUpperCase() + name.slice(1);

      if (adminStatus === true) {
        return (
          <div className="loginStatusDiv">
            <p>Welcome, {nameCapitalised} (admin)!</p>
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
        return (
          <div className="loginStatusDiv">
            <p>Welcome, {nameCapitalised}!</p>
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
      }
    } else {
      return (
        <div className="loginStatusDiv">
          <p>No active logins.</p>
        </div>
      );
    }

    // End of createWelcomeMsg
  }

  // Runs when page is first loaded.
  componentDidMount() {
    if (this.state.isLoaded === false) {
      this.getLogins();
      console.log("componentDidMount has run. Logins fetched");
      // End of if statement to check if data has been loaded yet.
    }

    //End of component did mount
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
      usersArray,
      authorArray,
      dateCreatedArray,
      adminStatus,
      authMessage,
      postId,
      postAuthor,
      postTitle,
      postBody,
      selectedUser,
    } = this.state;

    let loginStatusMsg;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      // Creates appropriate login status message
      loginStatusMsg = this.createWelcomeMsg(
        loggedIn,
        adminStatus,
        currentUser
      );

      return (
        <div className="app">
          <BrowserRouter>
            <GetPosts
              isLoaded={this.state.isLoaded}
              loadPosts={this.loadPosts}
            />

            <Header loggedIn={loggedIn} adminStatus={adminStatus} />
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
                path="/DeletePost"
                element={<DeletePost postId={postId} />}
              />

              <Route
                exact={true}
                path="/"
                element={
                  <Home
                    updateSelectedUser={this.updateSelectedUser}
                    selectedUser={selectedUser}
                    titlesArray={titlesArray}
                    idArray={idArray}
                    postsArray={postsArray}
                    authorArray={authorArray}
                    message={message}
                    usersArray={usersArray}
                    dateCreatedArray={dateCreatedArray}
                  />
                }
              />

              <Route
                path="/Login"
                element={
                  <Login
                    authMessage={authMessage}
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
                    authMessage={authMessage}
                    handleTitle={this.handleTitle}
                    handlePost={this.handlePost}
                    handleSavePost={this.handleSavePost}
                    createPostActive={true}
                  />
                }
              />

              <Route
                path="/EditPost"
                element={
                  <EditPost
                    authMsg={authMessage}
                    id={postId}
                    title={postTitle}
                    post={postBody}
                    author={postAuthor}
                    handleTitle={this.handleTitle}
                    handlePost={this.handlePost}
                    handleEditPost={this.handleEditPost}
                  />
                }
              />

              <Route
                path="/AdminArea"
                element={
                  <AdminArea
                    updateSelectedUser={this.updateSelectedUser}
                    usersArray={usersArray}
                    selectedUser={selectedUser}
                    authMessage={authMessage}
                    adminStatus={adminStatus}
                    titlesArray={titlesArray}
                    idArray={idArray}
                    postsArray={postsArray}
                    authorArray={authorArray}
                    dateCreatedArray={dateCreatedArray}
                    handleTitle={this.handleTitle}
                    handlePost={this.handlePost}
                    handleEditPost={this.handleEditPost}
                    handleDeletePost={this.handleDeletePost}
                    callEditPost={this.callEditPost}
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

  // End of App class component
}

// Export app to be used by other files
export default App;
