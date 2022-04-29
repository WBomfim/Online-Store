const setProductComments = (productId) => {
  if (!JSON.parse(localStorage.getItem(productId))) {
    localStorage.setItem(productId, JSON.stringify([]));
  } else {
    JSON.parse(localStorage.getItem(productId));
  }
};

const readUserComment = (productId) => JSON.parse(localStorage.getItem(productId));
const addComment = (productId, comments, evaluations, emails) => {
  let handleComment = [];
  if (comments || evaluations) {
    const newComment = {
      comment: comments,
      evaluation: evaluations,
      email: emails,
    };
    handleComment.push(newComment);
    handleComment = handleComment
      .concat(JSON.parse(localStorage.getItem(productId) || ','));
  }
  localStorage.setItem(productId, JSON.stringify(handleComment));
};

const getUserComment = (productId) => readUserComment(productId);

export { setProductComments, addComment, getUserComment };
