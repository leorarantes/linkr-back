import commentsRepository from "../Repositories/commentsRepository.js";

export async function postComment (req, res) {
	const { user } = res.locals;
	const { postId, comment, authorId} = req.body;
	
	try {
		await commentsRepository.commentPubli(user.id, authorId, postId, comment)

		return res.sendStatus(201)
	} catch (e) {
		console.log(e);
    	return res.status(500).send("Error while commenting in post.");
	}
};

export async function getCommentsAmount(req, res) {
  const { postId } = req.params;

  try {
    const postRequest = await commentsRepository.getCommentsCount(postId);
    const commentAmount = postRequest.rows;

    return res.status(200).send(commentAmount);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

export async function getComments(req, res) {
  const { postId } = req.params;

  try {
    const postRequest = await commentsRepository.getComments(postId);
    const comments = postRequest.rows;

    const structuredComments = comments.map(comment => {
      let isFollower;
      if (comment.authorId === comment.followedId && comment.followerId === comment.commenterId) {
        isFollower = true;
      } else {
        isFollower = false;
      }
      return {
        id: comment.id,
        authorId: comment.authorId,
        postId: comment.postId,
        commenter: {
          id: comment.commenterId,
          username: comment.name,
          image: comment.photoLink,
          comment: comment.comment,
          isFollower
        }
      }
    })

    return res.status(200).send(structuredComments);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}