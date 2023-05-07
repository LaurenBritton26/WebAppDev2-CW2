const express = require('express');
const router = express.Router();
const controller = require('../controllers/wellnessControllers.js');
const {login} = require('../auth/auth');
const {verify} = require('../auth/auth');

router.get('/', controller.home_page);
router.get('/homepage', controller.home_page);
router.get('/about', controller.about);
router.get('/login',controller.show_login_page);
router.get('/register', controller.show_register_page);
router.get('/nutrition', verify, controller.nutrition);
router.get('/fitness', verify, controller.fitness);
router.get('/lifestyle', verify, controller.lifestyle);
router.get('/newGoal', verify, controller.show_new_goals);
router.get('/fitnessGoals', controller.show_fitness_goals);
router.get('/nutritionGoals', controller.show_nutrition_goals);
router.get('/lifestyleGoals', controller.show_lifestyle_goals);
router.get('/logout', verify, controller.logout);
router.get('/goalAdded', controller.goalAdded)

router.post('/register', controller.post_new_user);
router.post('/login', login, controller.handle_login);
router.post('/newGoal', controller.post_newGoal);

router.use(function(req,res) {
   res.status(404);
  res.type('text/plain');
  res.send('404 Not Found');
})

router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
   res.send('Internal Server Error');
})


module.exports = router;