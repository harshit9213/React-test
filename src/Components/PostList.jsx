import Post from "./Post";

const PostList = ({
  posts,
  handlePostComments,
  selectedPostId,
  comments,
  loadingComments,
  newComment,
  setNewComment,
  handleCreateComment,
  handleDeleteComment,
  handleEditComment,
  handleUpdateComment,
  editingCommentId,
  editingCommentBody,
  setEditingCommentBody,
}) => {
  return (
    <div className="post-section__row">
      <div className="accordion text-left">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            handlePostComments={handlePostComments}
            isActive={selectedPostId === post.id}
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
        ))}
      </div>
    </div>
  );
};

export default PostList;
