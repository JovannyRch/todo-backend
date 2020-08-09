const { Router } = require('express');
const { allMyTodos, createTodo, completTodo, deleteTodo } = require('../controllers/todos');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidators');

const router = Router();


//JWT validator
router.use(jwtValidator);


//Create a Task
router.post('/',
    [
        check('description', 'Description field is required').not().isEmpty(),
        fieldValidator
    ]
    , createTodo
);

//Update a Task
router.put('/:uid',
    [
        check('isDone', 'Done field is required').not().isEmpty(),
        fieldValidator,
    ],
    completTodo
);

//Delete todo
router.delete("/:uid", deleteTodo);

//Load all todos
router.get('/', allMyTodos);


module.exports = router;