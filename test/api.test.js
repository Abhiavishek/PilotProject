const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); 
const expect = chai.expect;

chai.use(chaiHttp);

describe('API Routes', () => {
  const sampleTask = {
    _id: '651a87159e2526ff038e'
    , 
    title: 'Test Task',
    description: 'This is a test task',
    status: 'In Progress',
  };

  describe('GET /api/tasks', () => {
    it('should return a list of tasks', (done) => {
      chai
        .request(server)
        .get('http://localhost:3001/api/tasks') 
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /api/tasks', () => {
    it('should add a new task', (done) => {
      chai
        .request(server)
        .post('http://localhost:3001/api/tasks') 
        .send(sampleTask)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('title', sampleTask.title);
          expect(res.body).to.have.property('description', sampleTask.description);
          expect(res.body).to.have.property('status', sampleTask.status);
          done();
        });
    });

  });

  describe('PUT /api/tasks/:id', () => {
    it('should update an existing task', (done) => {
      chai
        .request(server)
        .put(`http://localhost:3001/api/tasks/${sampleTask._id}`) 
        .send(sampleTask)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('title', sampleTask.title);
          expect(res.body).to.have.property('description', sampleTask.description);
          expect(res.body).to.have.property('status', sampleTask.status);
          done();
        });
    });

  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task', (done) => {
      chai
        .request(server)
        .delete(`http://localhost:3001/api/tasks/${sampleTask._id}`) 
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message', 'Task deleted successfully');
          done();
        });
    });

  });
});
