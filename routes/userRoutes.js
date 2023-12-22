const express = require("express");
const userRouter = express.Router();
const Authentication = require('../middlewares/authenticate')
const {
    userResister,
    userLogin,
    userLogout,
    getUser,
    userProfileUpdate
} = require('../controllers/userControllers');


// Routes 
/**
 * @swagger
 * components:
 *  
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        
 *        - name
 *        - email
 *        - phone
 *        - password
 *      properties:
 *          name:  
 *             type: string
 *             description: user title
 *          email:
 *              type: string
 *              description: user email unique
 *          password:
 *              type: string
 *              description: user password becrypted
 *          
 *      example:
 *          
 *          name:  Test User1
 *          email: Test@gmail.com
 *          phone: 9227462129
 *          password: demopassword          
 *          createdAt: 2023-12-22T17:11:41.888Z
 *          updatedAt: 2023-12-22T17:13:13.339Z
 *    UserLogin:
 *      type: object
 *      required:
 *        
 *       
 *        - email
 *        - password
 *      properties:
 *          
 *          email:
 *              type: string
 *              description: user email unique
 *          password:
 *              type: string
 *              description: user password becrypted
 *          
 *      example:
 *          
 * 
 *          email: Test@gmail.com
 *      
 *          password: demopassword          
 *   
 *    UserTokenDeleted:
 *      type: object
 *      required:
 *        -message
 *      properties:
 *          message:
 *              type: string
 *              description: user email unique
 *      example:
 *          message:Token deleted
 *       
*/      


/**
 * @swagger
 * /api/user/register:
 *    post:
 *      summary: User Registeration
 *      tags: [User]
 *      
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'      
 *      responses:
 *        200:
 *          description: User Registered
 *          content:
 *            application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Blog'
 */
userRouter.post('/register',userResister);


/**
 * @swagger
 * /api/user/login:
 *    post:
 *      summary: User Login
 *      tags: [User]
 *      
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *                schema:
 *                  $ref: '#/components/schemas/UserLogin'   
 *      security: []                  
 *      responses:
 *        200:
 *          description: User Logged in
 *          content:
 *            application/json:
 *                schema:
 *                  type: array
 *                  item:
 *                      message: string
 *                      jwtoken: string
 * 
 */
userRouter.post('/login',userLogin);


/**
 * @swagger
 * /api/user/updateprofile:
 *    put:
 *      summary: User Update Profile
 *      tags: [User]
 *      security:
 *        - cookieAuth: []
 *      
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'   
 *                     
 *      responses:
 *        200:
 *          description: User Logged in
 *          content:
 *            application/json:
 *                schema:
 *                  type: array
 *                  item:
 *                     $ref: '#/components/schemas/User'
 */
userRouter.put('/updateprofile',Authentication,userProfileUpdate);


/**
 * @swagger
 * /api/user/logout:
 *    get:
 *      summary: User logout
 *      tags: [User]
 *      security:
 *        - cookieAuth: []
 *               
 *      responses:
 *        200:
 *          description: User Logged in
 *          content:
 *            application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                     $ref: '#/components/schemas/UserTokenDeleted'
 */
userRouter.get('/logout',Authentication,userLogout);
 

/**
 * @swagger
 * /api/user/getuser:   
 *    get:
 *      summary:  Get User 
 *      tags: [User]
 *      security:
 *        - cookieAuth: []           
 *      responses:
 *        200:
 *          description: User  object
 *          content:
 *            application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                     $ref: '#/components/schemas/User'
 */
userRouter.get('/getuser',Authentication,getUser);

module.exports = userRouter