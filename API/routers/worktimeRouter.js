const app = express();
const wtCtrl = require('../controllers/worktimeController');

const router = express.Router();
router.route('/api/worktime') 
  .post(wtCtrl.createWorkTime);