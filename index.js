const express = require('express')

const server = express();

server.use(express.json());

const projects = [
  
];

server.get('/api', (req, res) => {
  return res.json({"msg": "api rest working"})
})

server.get('/', (req, res) => {
  return res.redirect('/api')
})


/**
 * Middleware check if project dont exists
 */
function checkIfProjectDontExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Project not found' });
  }

  return next();
}

/**
 * Middleware check if project dont exists
 */
function checkIfProjectExists(req, res, next) {
  const { id } = req.body;
  const project = projects.find(p => p.id === id);

  if (project) {
    return res.status(400).json({ error: 'Project already exists' });
  }

  return next();
}

//create new project
server.post('/projects', checkIfProjectExists, (req, res) => {
  
  const { id, title } = req.body

  const project = {
    id,
    title,
    tasks: []
  }
  
  projects.push(project)

  return res.json(project)
})


//update a project
server.put('/projects/:id', checkIfProjectDontExists, (req, res) => {
  
  const { id } = req.params
  const { title } = req.body

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(projects)
  
})

/**
 * Route params: id;
 * Add a new task to project; 
 */
server.post('/projects/:id/tasks', checkIfProjectDontExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

//show all projects
server.get('/projects', (req, res) => {
  return res.json(projects)
})

//show a especific project 
server.get('/projects/:id', checkIfProjectDontExists, (req, res) => {
  
  const { id } = req.params

  const project = projects.find((project) => {
    return project.id === parseInt(id)      
  })

  return res.json(project)
})

//delete a project
server.delete('/projects/:id', checkIfProjectDontExists, (req, res) => {  

  const { id } = req.params

  const projectIndex = projects.findIndex(p => p.id == id);
  
  projects.splice(projectIndex, 1)

  return res.send()
})

server.listen(3000, () => {
  console.log('Server working on port: 3000')
})

