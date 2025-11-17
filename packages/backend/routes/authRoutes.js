
import express from 'express';
import { AuthController } from "../controllers/authController.js";

export default function authRoutes(getController) {
    const router = express.Router();

    router.post('/login', (req, res, next) => {
        getController(AuthController).loginUser(req, res, next);
    });

    return router;
}