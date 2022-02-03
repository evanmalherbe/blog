import { useState, useEffect } from "react";

// Function to fetch posts from db
export default function GetPosts2(url) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [titlesArray, setTitles] = useState(null);
  const [postsArray, setPosts] = useState(null);
  const [idArray, setIds] = useState(null);
  const [authorArray, setAuthors] = useState(null);
  const [dateCreatedArray, setDates] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setTitles(result.titles);
          setPosts(result.posts);
          setIds(result.ids);
          setAuthors(result.authors);
          setDates(result.datecreated);
          setMessage(result.message);

          console.log("Db says: " + message);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        }
      );
  }, []);

  return {
    isLoaded,
    titlesArray,
    postsArray,
    idArray,
    authorArray,
    dateCreatedArray,
    error,
    message,
  };
}

//   async function getData(url) {
//     try {
//       const res = await fetch(url);
//       const data = await res.json();

//       setTitles(data.titles);
//       setPosts(data.posts);
//       setIds(data.ids);
//       setAuthors(data.authors);
//       setDates(data.datecreated);
//       setMessage(data.message);
//     } catch (err) {
//       console.log(err);
//       setIsLoaded(true);
//       setError(err);
//     }
//   }

//   useEffect(() => {
//     getData(url);
//   }, []);

//   return {
//     isLoaded,
//     titlesArray,
//     postsArray,
//     idArray,
//     authorArray,
//     dateCreatedArray,
//     error,
//     message,
//   };
// }

//Export component to be used in other files
//export default GetPosts2;

// import React from "react";

// // Create GetPosts class component
// class GetPosts extends React.Component {
//   constructor(props) {
//     super(props);
//     // Set initial state variables.
//     this.state = {
//       isLoaded: props.isLoaded,
//       titlesArray: [],
//       postsArray: [],
//       idArray: [],
//       authorArray: [],
//       error: null,
//       dateCreatedArray: [],
//       message: null,
//     };
//   }

//   componentDidMount() {
//     fetch("/getposts")
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           this.setState(
//             {
//               isLoaded: true,
//               titlesArray: result.titles,
//               postsArray: result.posts,
//               idArray: result.ids,
//               authorArray: result.authors,
//               dateCreatedArray: result.datecreated,
//               message: result.message,
//             },
//             () => {
//               console.log("Db says: " + this.state.message);
//               this.props.loadPosts(
//                 this.state.isLoaded,
//                 this.state.titlesArray,
//                 this.state.postsArray,
//                 this.state.idArray,
//                 this.state.authorArray,
//                 this.state.dateCreatedArray
//               );
//             }
//           );
//         },
//         (error) => {
//           this.setState({
//             isLoaded: true,
//             error,
//           });
//         }
//       );
//     // End of componentdidmount
//   }

//   render() {
//     return <div></div>;
//   }
// }

// export default GetPosts;
