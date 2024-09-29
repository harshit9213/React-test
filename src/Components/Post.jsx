import Comments from "./Comments";

const Post = ({
  post,
  handlePostComments,
  isActive,
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
  setEditingCommentBody
}) => {
  const toggleAccordion = () => {
    handlePostComments(post.id);
  };

  return (
    <div className="accordion-item border [&:not(:last-child)]:mb-5">
      <h3 className={`accordion-header flex justify-between p-4 cursor-pointer ${isActive ? "active" : ""}`} onClick={toggleAccordion}>
        {post.title}
        <div className="icon">
               <svg
                 width="24"
                 height="24"
                 xmlns="http://www.w3.org/2000/svg"
                 fill-rule="evenodd"
                 clip-rule="evenodd"
               >
                 <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" />
               </svg>
             </div>
      </h3>

      {isActive && (
        <div className={`accordion-content p-4 ${isActive ? "active" : ""}`}>
          <h4 className="mb-3 text-[20px] font-semibold">Comments</h4>
          <Comments
            comments={comments}
            loadingComments={loadingComments}
            newComment={newComment}
            setNewComment={setNewComment}
            handleCreateComment={handleCreateComment}
            postId={post.id}
            handleDeleteComment={handleDeleteComment}
            handleEditComment={handleEditComment}
            handleUpdateComment={handleUpdateComment}
            editingCommentId={editingCommentId}
            editingCommentBody={editingCommentBody}
            setEditingCommentBody={setEditingCommentBody}
          />
        </div>
      )}
    </div>
  );
};

export default Post;
