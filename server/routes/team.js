const router = require('koa-router')()
const TeamController = require('../controllers/team')


router.prefix('/team')

router.post('/add', TeamController.addTeam);
router.get('/delete', TeamController.deleteTeam);
router.get('/update', TeamController.updateTeam);
router.get('/list', TeamController.list);
router.get('/join', TeamController.joinTeam);
router.get('/teammates', TeamController.getTeammates);

module.exports = router;
