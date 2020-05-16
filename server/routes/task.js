const router = require('koa-router')()
const TaskController = require('../controllers/task')


router.prefix('/task')


router.post('/add', TaskController.add);
router.post('/delete', TaskController.delete);
router.post('/update', TaskController.update);
router.post('/list', TaskController.list);

module.exports = router;
