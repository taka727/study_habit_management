const request = require('supertest');
const app = require('../index');

describe('Tasks API', () => {
  describe('GET /tasks', () => {
    it('should return all tasks', async () => {
      const res = await request(app)
        .get('/tasks')
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('GET /tasks/:id', () => {
    it('should return a specific task', async () => {
      const res = await request(app)
        .get('/tasks/1')
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data).toHaveProperty('id');
    });

    it('should return 404 for non-existent task', async () => {
      await request(app)
        .get('/tasks/999999')
        .expect(404);
    });
  });
});
