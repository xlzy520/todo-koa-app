const router = require('koa-router')()
const TaskController = require('../controllers/task')


router.prefix('/task')


router.post('/add', TaskController.add);
router.get('/delete', TaskController.delete);
router.get('/update', TaskController.update);
router.get('/list', TaskController.list);

module.exports = router;
