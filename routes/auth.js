import express from 'express';
import { register, login } from '../controllers/authController.js';
import { protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { createUserSchema } from '../schemas/userSchema.js';

const router = express.Router();


router.post('/register',  validate(createUserSchema), register);
router.post('/login', login);

// Example protected route
/** @swagger
 * /profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the profile of the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/profile', protect, (req, res) => {
  res.json(req.user);
});

export default router;
