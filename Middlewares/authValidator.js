import sessionsRepository from "../Repositories/sessionsRepository.js";
import usersRepository from "../Repositories/usersRepository.js";

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.status(401).send("No token.");

    try {
        const sessionQuery = await sessionsRepository.checkToken(token);
        if (sessionQuery.rowCount === 0) return res.status(401).send("No session.");
        const [session] = sessionQuery.rows;

        const now = parseFloat((Date.now() / 60000).toFixed(1));
        const timeDifference = now - session.lastStatus;
        if (timeDifference > 60) {
            await sessionsRepository.expireSession(session.id);
            return res.status(401).send("Session expired.");
        }

        const user = await usersRepository.getUserById(session.userId);
        if (user.rowCount === 0) return res.sendStatus(400);

        await sessionsRepository.updateSessions(session.id);

        res.locals.user = user.rows[0];

        next();
    } catch (error) {
        console.log("token", error);
        res.status(500).send("Error checking token.");
    }
}

export default validateToken;