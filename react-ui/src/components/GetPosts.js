import React from "react";

// Create GetPosts class component
class GetPosts extends React.Component {
  constructor(props) {
    super(props);
    // Set initial state variables.
    this.state = {
      isLoaded: props.isLoaded,
      titlesArray: [],
      postsArray: [],
      idArray: [],
      authorArray: [],
      error: null,
      dateCreatedArray: [],
      message: null,
    };
  }

  componentDidMount() {
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
              dateCreatedArray: result.datecreated,
              message: result.message,
            },
            () => {
              console.log("Db says: " + this.state.message);
              this.props.loadPosts(
                this.state.isLoaded,
                this.state.titlesArray,
                this.state.postsArray,
                this.state.idArray,
                this.state.authorArray,
                this.state.dateCreatedArray
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

export default GetPosts;
