import express from 'express';
import * as usersController from '../controllers/users';

const router = express.Router();

const directoryData = {
  directory: [
      {
        name: 'Variables',
        isQuestion: false,
        id: '1',
        children: [
          {
            name: 'Question A',
            isQuestion: true,
            completed: false,
            id: '2'
          }, {
            name: 'Control Structures',
            isQuestion: false,
            completed: false,
            id: '3',
            children: [{
              name: 'for loop',
              isQuestion: true,
              completed: false,
              id: 'a'
            }, {
              name: 'for each loop',
              isQuestion: true,
              completed: false,
              id: 'b'
            }, {
              name: 'while loop',
              isQuestion: true,
              completed: true,
              id: 'c'
            }
            ]
          }, {
            name: 'Question 5',
            isQuestion: true,
            completed: false,
            id: '5'
          }]
      }, {
      name: 'Question 5',
      isQuestion: true,
      completed: true,
      id: '5'
    }]
}

/**
 * This route calls an async method to retrieve users from a fictional database.
 * Since NodeJS 8.0, there is native support for async/await.
 */
router.get('/', async (req, res) => {
    console.log('get all')

    return res.status(200).json(directoryData)
    /*
    try {
        const users = await usersController.getAll();
        return users.length ? res.status(200).json(users) : res.status(204).end();
    } catch (e) {
        return res.status(500).end(e.message);
    }
    */
});

/**
 * This route shows the use of url parameters to retrieve a single user by its id.
 */
router.get('/:id', (req, res) => {
    console.log('get id')
    const user = usersController.getById(parseInt(req.params.id, 10));
    return user ? res.status(200).json(user) : res.status(204).end();
});

export default router;
