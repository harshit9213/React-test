const Comments = ({
  comments,
  loadingComments,
  newComment,
  setNewComment,
  handleCreateComment,
  postId,
  handleDeleteComment,
  handleEditComment,
  handleUpdateComment,
  editingCommentId,
  editingCommentBody,
  setEditingCommentBody
}) => {
  return (
    <div>
      <div className="mb-5">
        <textarea
        className="w-full border p-4"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a new comment..."
        />
        <button className="text-[14px] underline" onClick={() => handleCreateComment(postId)}>Add Comment</button>
      </div>

      {loadingComments ? (
        <p>Loading comments...</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="mb-4">
            {editingCommentId === comment.id ? (
              <div>
                <textarea
                className="w-full border p-4"
                  value={editingCommentBody}
                  onChange={(e) => setEditingCommentBody(e.target.value)}
                />
                <button className="text-[14px] underline" onClick={handleUpdateComment}>Update</button>
              </div>
            ) : (
              <>
                <p><strong>{comment.name}:</strong> {comment.body}</p>
                <div className="flex gap-x-2 mt-2">
                <button className="text-[14px] underline" onClick={() => handleEditComment(comment)}>Edit</button>
                <button className="text-[14px] underline" onClick={() => handleDeleteComment(comment.id)}>Delete</button>
              </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;
