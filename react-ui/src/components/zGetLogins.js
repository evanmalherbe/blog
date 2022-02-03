import React from "react";

// Create GetLogins class component
class GetLogins extends React.Component {
  constructor(props) {
    super(props);
    // Set initial state variables.
    this.state = {
      isLoaded: false,
      usersArray: [],
      pwordArray: [],
      adminStatusArray: [],
      error: null,
      message: null,
    };
  }

  componentDidMount() {
    console.log("Get logins has run");
    fetch("/getlogins")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState(
            {
              isLoaded: true,
              usersArray: result.users,
              pwordArray: result.pwords,
              adminStatusArray: result.admin,
              message: result.message,
            },
            () => {
              this.props.loadLogins(
                this.state.isLoaded,
                this.state.usersArray,
                this.state.pwordArray,
                this.state.adminStatusArray,
                this.state.message
              );
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

    // End of componentdidmount
  }

  render() {
    return "";
  }
}

export default GetLogins;
