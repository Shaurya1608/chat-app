import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { ChatsPartner, getAllContacts, getMessagesByuserId, sendMessage } from "../controllers/message.controller.js";
import { arcjectMiddleware } from "../middleware/arcjet.middleware.js";

const router = express.Router();

//apply arcjet middleware and protectRoute middleware to all message routes so that my every request below will go through
//theese middlewares first arcjet to rate limit and bot detect and protectRoute to check authentication

router.use(arcjectMiddleware,protectRoute);
router.get('/contacts',getAllContacts);
router.get('/chats',ChatsPartner);
router.get('/:id',getMessagesByuserId);
router.post('/send/:id',sendMessage);

export default router;