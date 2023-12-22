const express = require("express");

const router = express.Router();

const Authentication = require('../middlewares/authenticate')


const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getUsersBlogs,
} = require("../controllers/blogControllers");


// Routes 
/**
 * @swagger
 * components:
 *  
 *  schemas:
 *    Blog:
 *      type: object
 *      required:
 *       
 *        - title
 *        - description
 *        
 *      properties:
 *          title:  
 *             type: string
 *             description: Blog title
 *          description:
 *              type: string
 *              description: Blog description
 *         
 *      example:
 *         
 *         
 *          title:  Test blog update test  1
 *          description: Test blog description update test 1          
 *         
*/      



/**
 * @swagger
 * /api/blog:
 *    get:
 *      summary: Returns all the blogs
 *      responses:
 *        200:
 *          description: blog lists
 *          content:
 *            application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Blog'
 */
router.get("/", getBlogs);

/**
 *  @swagger
 * components:
 *    securitySchemes:
 *      cookieAuth:          
 *         type: apikey
 *         in: cookie
 *         name: jwtoken   
 * security:
 *    - cookieAuth: []   
 */

/**
 * @swagger
 * /api/blog/{id}:
 *    get:
 *      security:
 *        - cookieAuth: []
 *      summary: Returns Blog by id
 *      tags: [Blog]
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *              type: string
 *              required: true
 *              description: the blog id
 *      responses:
 *        200:
 *          description: blog lists
 *          content:
 *            application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Blog'
 */
router.get("/:id",Authentication, getBlog);


/**
 * @swagger
 * /api/blog:
 *    post:
 *      security:
 *        - cookieAuth: []
 *      summary: Create Blog 
 *      tags: [Blog]
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Blog'   
 *      responses:
 *        200:
 *          description: blog 
 *          content:
 *            application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Blog'
 */
router.post("/",Authentication, createBlog);


/**
 * @swagger
 * /api/blog/{id}:
 *    put:
 *      security:
 *        - cookieAuth: []
 *      summary: Update Blog by id
 *      tags: [Blog]
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *              type: string
 *              required: true
 *              description: the blog id
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Blog'   
 *      responses:
 *        200:
 *          description: blog 
 *          content:
 *            application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Blog'
 */
router.put("/:id",Authentication, updateBlog);


/**
 * @swagger
 * /api/blog/{id}:
 *    delete:
 *      security:
 *        - cookieAuth: []
 *      summary: Delete Blog by id
 *      tags: [Blog]
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *              type: string
 *              required: true
 *              description: the blog id
 *      responses:
 *        200:
 *          description: blog 
 *          content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  item:
 *                    $ref: '#/components/schemas/Blog'
 */
router.delete("/:id",Authentication, deleteBlog);

module.exports = router;
//https://aditya17003blog.azurewebsites.net/api-docs