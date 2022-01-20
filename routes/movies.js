var express = require('express');
var router = express.Router();
var moviesController = require('../controllers/moviesController');

/* GET users listing. */
router.get('/', moviesController.list);

router.get('/add', moviesController.add);
router.post('/add', moviesController.create);

router.get('/detail/:id', moviesController.detail);

router.get('/edit/:id', moviesController.edit);
router.put('/edit/:id', moviesController.update);

router.get('/delete/:id', moviesController.delete);
router.delete('/delete/:id', moviesController.destroy);

router.get('/api', moviesController.listAPI);
router.get('/api/:id', moviesController.detailAPI);
router.post('/api/create', moviesController.storeAPI);
router.delete('/api/:id', moviesController.deleteAPI);
router.get('/api/search', moviesController.searchAPI);
router.put('/api/edit/:id', moviesController.updateAPI);

module.exports = router;
