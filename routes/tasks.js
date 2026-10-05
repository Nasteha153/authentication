import express from 'express';
import {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';
import { protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { taskValidationSchema } from '../schemas/taskSchema.js';

const router = express.Router();

router.use(protect);
/** @swagger
 * /tasks:
 *   get:
 *     summary: Get user's tasks
 *     description: Retrieve all tasks for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/', getMyTasks);
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in progress, completed]
 *               dueDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created
 */

router.post('/', validate(taskValidationSchema), createTask);
router.put('/:id', validate(taskValidationSchema), updateTask);
router.delete('/:id', deleteTask);

export default router;
