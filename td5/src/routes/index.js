import { Router } from 'express';
import { getAllContacts, getContactById, updateContact, removeContact, addContact } from '../controllers/contactController.js';
import { registerUser, loginUser } from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();


/**
 * @openapi
 * /contacts:
 *   get:
 *     description: All contacts
 *     responses:
 *       '200':
 *         description: Returns all the contacts
 *       '500':
 *         description: Servor error
 *   post:
 *      description: Add a new contact
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          age:
 *                              type: integer
 *      responses:
 *          '201':
 *            description: Contact added with succes
 *          '400':
 *            description: Invalid data
 */
router.route('/contacts').all(requireAuth)
    .get(async (req, res) => {
        let response = await getAllContacts();
        if (response.success == true) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    })
    .post(async (req, res) => {
        let response = await addContact(req.body);
        if (response.success == true) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    });


/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Retrieve a contact by its ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID unique du contact
 *     responses:
 *       '200':
 *         description: Contact retrieved.
 *       '404':
 *         description: Contact not found.
 *   put:
 *     summary: Update a contact
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       '200':
 *         description: Contact updated.
 *       '404':
 *         description: Contact not found.
 *   delete:
 *     summary: Delete a contact
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Contact deleted.
 *       '404':
 *         description: Contact not deleted.
 */
router.route('/contacts/:id').all(requireAuth)
    .get(async (req, res) => {
        let response = await getContactById(req.params.id);
        if (response.success == true) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    })
    .put(async (req, res) => {
        let response = await updateContact(req.params.id, req.body.name, req.body.age);
        if (response.success == true) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    })
    .delete(async (req, res) => {
        let response = await removeContact(req.params.id);
        if (response.success == true) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    });

    /**
 * @openapi
 * /auth/register:
 *   post:
 *     description: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Registration successful
 *       '500':
 *         description: Server error
 */
router.route('/auth/register').post(registerUser);
/**
 * @openapi
 * /auth/login:
 *   post:
 *     description: Login user and return JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *       '401':
 *         description: Invalid email or password
 *       '500':
 *         description: Server error
 */
router.route('/auth/login').post(loginUser);

/**
 * @openapi
 * /:
 *   get:
 *     description: Vérifier l'état de l'api
 *     responses:
 *       '200':
 *         description: L'API fonctionne correctement
 */
router.get('/', function (req, res) {
    res.status(200).json({
        status: 'API is Working',
        message: 'Welcome!',
    });
});

export default router;
    