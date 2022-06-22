import followsRepository from "../Repositories/followsRepository.js";

export async function followUser(req, res) {
    try {
        const { user } = res.locals;
        const { followedId } = req.params;

        const { rows: follows } = await followsRepository.getFollow(user.id, parseInt(followedId));
        if (follows.length > 0) return res.sendStatus(404);

        await followsRepository.followUser(user.id, followedId);

        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.status(500).send("Error while following user.");
    }
}

export async function unfollowUser(req, res) {
    try {
        const { user } = res.locals;
        const { followedId } = req.params;

        const { rows: follows } = await followsRepository.getFollow(user.id, parseInt(followedId));
        if (follows.length === 0) return res.sendStatus(404);

        await followsRepository.unfollowUser(user.id, followedId);

        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.status(500).send("Error while unfollowing user.");
    }
}