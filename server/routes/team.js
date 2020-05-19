const router = require('koa-router')()
const TeamController = require('../controllers/team')


router.prefix('/team')

router.post('/add', TeamController.addTeam);
router.post('/delete', TeamController.deleteTeam);
router.post('/update', TeamController.updateTeam);
router.post('/list', TeamController.list);
router.post('/myTeams', TeamController.myTeams);
router.post('/search', TeamController.search);
router.post('/join', TeamController.joinTeam);
router.post('/teammates', TeamController.getTeammates);

module.exports = router;
