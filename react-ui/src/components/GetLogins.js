import React from "react";

// Create GetLogins class component
class GetLogins extends React.Component {
  constructor(props) {
    super(props);
    // Set initial state variables.
    this.state = {
      isLoaded: props.isLoaded,
      usersArray: [],
      pwordArray: [],
      adminStatusArray: [],
      error: null,
    };
  }

  componentDidMount() {
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
            },
            () => {
              this.props.loadLogins(
                this.state.isLoaded,
                this.state.usersArray,
                this.state.pwordArray,
                this.state.adminStatusArray
              );
              console.log(
                "Admin status array says: " + this.state.adminStatusArray
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
    return <div></div>;
  }
}

export default GetLogins;
