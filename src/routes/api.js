const express = require("express");
const indexController = require("../controllers/indexController");
const router = express.Router();
const StudentController = require("../controllers/StudentController");
const JwtController = require("../controllers/JwtController");
const TokenVerifyMiddleware = require("../middleware/TokenVerifyMiddleware");
const TokenIssueController = require("../controllers/TokenIssueController");
const ProfileController = require('../controllers/ProfileController');
const TodoListController = require('../controllers/TodoListController')


//====Api Route===//
router.get("/index", indexController.Index);
router.post("/index-post", indexController.indexPost);

//===mongoose  Student Controller ===//
router.get("/student-lists", TokenVerifyMiddleware, StudentController.Index);
router.get("/student-ans", TokenVerifyMiddleware, StudentController.extra);
router.post("/student-store", TokenVerifyMiddleware, StudentController.store);
router.put("/student-update/:id", TokenVerifyMiddleware, StudentController.update);
router.delete("/student-delete/:id", TokenVerifyMiddleware, StudentController.destroy);

//===Jwt Token generate===//
router.get("/create-jwt-token", JwtController.createJwt);
router.get("/decode-jwt-token", JwtController.decodeJwt);

//===Token Issue===//
router.get("/token-issue", TokenIssueController.tokenIssue);

//====Profile Login Parts=====//
router.post('/register-profile', ProfileController.register);
router.post("/login-profile", ProfileController.login);

//====profile middleware router===//

router.get('/all-profiles', TokenVerifyMiddleware, ProfileController.allProfile);
router.get('/single-profile', TokenVerifyMiddleware, ProfileController.singleProfile);
router.post('/single-profile-update', TokenVerifyMiddleware, ProfileController.updateProfile);

//====Todo List Parts=====//
router.get('/read-todo', TokenVerifyMiddleware, TodoListController.readTodo);
router.get('/delete-todo', TokenVerifyMiddleware, TodoListController.deleteTodo);
router.post('/create-todo', TokenVerifyMiddleware, TodoListController.createTodo);
router.post('/update-todo', TokenVerifyMiddleware, TodoListController.updateTodo);
router.post('/complete-todo', TokenVerifyMiddleware, TodoListController.completeTodo);

module.exports = router;