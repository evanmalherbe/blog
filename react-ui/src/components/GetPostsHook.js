import { useState } from "react";

// // Retrieve blog posts from db
// export function GetPosts() {
//   console.log("Get posts has run");
//   let isLoaded;
//   let titlesArray = [];
//   let postsArray = [];
//   let idArray = [];
//   let authorArray = [];
//   let errorMsg = null;

//   fetch("/getposts")
//     .then((res) => res.json())
//     .then(
//       (result) => {
//         isLoaded = true;
//         titlesArray = result.titles;
//         postsArray = result.posts;
//         idArray = result.ids;
//         authorArray = result.authors;
//       },
//       (error) => {
//         isLoaded = true;
//         errorMsg = error;
//       }
//     );

//   console.log(
//     "isLoaded says: " + isLoaded + ", titles array says: " + titlesArray
//   );
//   return [isLoaded, titlesArray, postsArray, idArray, authorArray, errorMsg];
//   // End of Get Posts
// }

// Function to retrieve posts from db
export function GetPosts() {
  const [isLoaded, setIsLoaded] = useState(null);
  const [errorMsg, setError] = useState(null);
  const [titlesArray, setTitles] = useState(null);
  const [postsArray, setPosts] = useState(null);
  const [idArray, setIds] = useState(null);
  const [authorArray, setAuthors] = useState(null);

  fetch("/getposts")
    .then((res) => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setTitles(result.titles);
        setPosts(result.posts);
        setIds(result.ids);
        setAuthors(result.authors);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );

  return [isLoaded, titlesArray, postsArray, idArray, authorArray, errorMsg];
}
