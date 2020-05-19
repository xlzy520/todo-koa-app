const router = require('koa-router')()
const TagController = require('../controllers/tag')


router.prefix('/tag')

router.post('/create', TagController.createTag);
router.get('/delete', TagController.deleteTag);
router.get('/update', TagController.updateTag);
router.get('/list', TagController.list);

module.exports = router;
