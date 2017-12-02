const {Router} = require('express')
const path = require('path');
const PostsController = require('./controllers/posts')
const UsersController = require('./controllers/users')
const SessionsController = require('./controllers/sessions')
const EventsController = require('./controllers/events')
const multer = require('multer')

const upload = multer({dest: path.join(__dirname, 'public', 'uploads')});

const root = Router()
const posts = Router()
const users = Router()
const session = Router()
const events = Router()
//User Routes
root.use('/users', users)
users.get('/new', UsersController.new)
users.post('/', UsersController.create)

//Posts Routes
root.use('/posts', posts)
posts.get('/', PostsController.index)
posts.get('/new', PostsController.new)
posts.post('/', upload.array('photo'), PostsController.create)
posts.get('/:id', PostsController.show)
posts.get('/:id/edit', PostsController.edit)
posts.delete('/:id', PostsController.destroy)
posts.patch('/:id', upload.array('photo'), PostsController.update)

// Session Routes
root.use('/session', session)
session.get('/new', SessionsController.new)
session.post('/', SessionsController.create)
session.delete('/', SessionsController.destroy)

// Events Routes
root.use('/events', events)
events.get('/', EventsController.index)
events.get('/new', EventsController.new)
events.post('/', EventsController.create)
events.get('/:id', EventsController.show)
events.post('/:id', EventsController.joinGroup)


module.exports = root;
