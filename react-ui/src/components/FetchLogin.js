import React from "react";

// Create FetchLogin class component
class FetchLogin extends React.Component {
  constructor(props) {
    super(props);
    // Set initial state variables.
    this.state = {
      token: null,
      error: null,
    };

    this.fetchLogin = this.fetchLogin.bind(this);
  }

  fetchLogin() {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.props.username,
        password: this.props.password,
        users: this.props.usersArray,
        pwords: this.props.pwordArray,
        admin: this.props.adminStatusArray,
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
              this.props.handleAuth(this.state.token);
            }
          );
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  }

  componentDidMount() {
    console.log("Got to fetch login component.");

    this.fetchLogin();
    // End of componentdidmount
  }

  render() {
    return "";
  }
}

export default FetchLogin;
