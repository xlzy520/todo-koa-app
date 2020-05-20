const router = require('koa-router')()
const TaskController = require('../controllers/task')


router.prefix('/task')


router.post('/add', TaskController.add);
router.post('/delete', TaskController.delete);
router.post('/update', TaskController.update);
router.post('/list', TaskController.list);
router.post('/getFourDay', TaskController.getFourDay);
router.post('/get7Day', TaskController.get7Day);

module.exports = router;
