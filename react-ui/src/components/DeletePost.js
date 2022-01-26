import React from "react";

// Create DeletePost class component
class DeletePost extends React.Component {
  constructor(props) {
    super(props);
    // Set initial state variables.
    this.state = {
      isLoaded: false,
    };
  }

  componentDidMount(props) {
    // Learned how to use window.confirm here:
    // https://stackoverflow.com/questions/63311845/unexpected-use-of-confirm-no-restricted-globals

    if (
      window.confirm("Are you sure you want to delete this blog post?") === true
    ) {
      fetch("/deletepost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.postId,
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
                  "Post request to delete blog post sent. " + result.message
                );
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

      // End of if statement to confirm if user really wants to delete post
    }
    // End of componentdidmount
  }

  render() {
    return "";
  }
}

export default DeletePost;
