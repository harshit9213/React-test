import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import PostList from "./Components/PostList";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentBody, setEditingCommentBody] = useState('');

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handlePostComments = (postId) => {
    setSelectedPostId(postId);
    setLoadingComments(true);

    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((response) => {
        setComments(response.data);
        setLoadingComments(false);
      })
      .catch((error) => {
        console.log("error fetching comment", error);
        setLoadingComments(false);
      });
  };

  // const handleCreateComment = (postId) => {
  //   const newCommentData = {
  //     postId: postId,
  //     body: newComment,
  //     name: "User", 
  //     email: "user@example.com", 
  //   };

  //   axios
  //     .post(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, newCommentData)
  //     .then((response) => {
  //       setComments([...comments, response.data]);
  //       setNewComment('');
  //     })
  //     .catch((error) => {
  //       console.error("Error creating comment:", error);
  //     });
  // };

  // const handleDeleteComment = (commentId) => {
  //   axios
  //     .delete(`https://jsonplaceholder.typicode.com/comments/${commentId}`)
  //     .then(() => {
  //       setComments(comments.filter((comment) => comment.id !== commentId));
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting comment:", error);
  //     });
  // };

  const handleCreateComment = (postId) => {
    const newCommentData = {
      postId: postId,
      body: newComment,
      name: "User", 
      email: "user@example.com", 
      id: comments.length ? comments[comments.length - 1].id + 1 : 1,
    };

    setComments([...comments, newCommentData]);
    setNewComment(''); 
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentBody(comment.body);
  };

  const handleUpdateComment = () => {
    axios
      .put(`https://jsonplaceholder.typicode.com/comments/${editingCommentId}`, {
        body: editingCommentBody,
      })
      .then((response) => {
        setComments(
          comments.map((comment) =>
            comment.id === editingCommentId ? { ...comment, body: editingCommentBody } : comment
          )
        );
        setEditingCommentId(null); 
        setEditingCommentBody('');
      })
      .catch((error) => {
        console.error("Error updating comment:", error);
      });
  };

  return (
    <div className="container">
      <h1 className="mb-5 text-[45px]">Posts</h1>
      {loading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <PostList
          posts={posts}
          handlePostComments={handlePostComments}
          selectedPostId={selectedPostId}
          comments={comments}
          loadingComments={loadingComments}
          newComment={newComment}
          setNewComment={setNewComment}
          handleCreateComment={handleCreateComment}
          handleDeleteComment={handleDeleteComment}
          handleEditComment={handleEditComment}
          handleUpdateComment={handleUpdateComment}
          editingCommentId={editingCommentId}
          editingCommentBody={editingCommentBody}
          setEditingCommentBody={setEditingCommentBody}
        />
      )}
    </div>
  );
}

export default App;
