const GoalsDAO = require('../models/goalsModel');
const goalsDAO = require('../models/goalsModel');
const userDAO = require('../models/userModel');

const db = new goalsDAO();
db.init();

exports.show_login_page = function(req,res) {
    res.render("user/login", {
        'title' : " Wellness Insight | Login"
    });
};

exports.handle_login = function(req, res) {
    res.render("welcome", {
            "user" : "username"
        });
    };

exports.home_page = function(req,res) {
    res.render("home", {
        'title' : 'Wellness Insight | Homepage',
        
    });
};

exports.show_new_goals = function(req, res) {
    res.render("newGoal", {
        "title": "Wellness Insight | New Goal",
        "user": "username",
    });
};

exports.show_register_page = function(req,res) {
    res.render("user/register", {
        'title' : "Wellness Insight | Register"
    });
};

exports.about = function(req,res) {
    res.render("about", {
        'title' : "Wellness Insight | About Us",
        
    });
};

exports.post_new_goal = function(req,res) {
    console.log("processing post_new_goal controller");
    if (!req.body.goal_type){
        response.status(400).send("Goals must have a goal type");
        return;
    }
    db.addGoals(req.body.goal_type, req.body.goal, req.body.duration, req.body.achieved);
    res.redirect("/loggedIn");
}


exports.show_fitness_goals = function (req, res) {
    let fitness = req.params.fitness;
    db.getFitnessGoals(fitness)
      .then((fitnessGoals) => {
        res.render("fitnessGoals", {
          title: "Wellness Insight | Fitness Goals",
          fitnessGoals : fitnessGoals,
        });
      })
      .catch((err) => {
        console.log("Error: ");
        console.log(JSON.stringify(err));
      });
  };

  exports.show_nutrition_goals = function (req, res) {
    let nutrition = req.params.nutrition;
    db.getNutritionGoals(nutrition)
      .then((nutritionGoals) => {
        res.render("nutritionGoals", {
          title: "Wellness Insight | Nutrition Goals",
          nutritionGoals: nutritionGoals,
        });
      })
      .catch((err) => {
        console.log("Error: ");
        console.log(JSON.stringify(err));
      });
  };

  exports.show_lifestyle_goals = function (req, res) {
    let lifestyle = req.params.lifestyle;
    db.getLifestyleGoals(lifestyle)
      .then((lifestyleGoals) => {
        res.render("lifestyleGoals", {
          title: "Wellness Insight | Lifestyle Goals",
          lifestyleGoals : lifestyleGoals,
        });
      })
      .catch((err) => {
        console.log("Error: ");
        console.log(JSON.stringify(err));
      });
  };

  exports.post_new_user = function (req, res) {
    const user = req.body.username;
    const password = req.body.pass;
  
    if (!user || !password) {
      res.send(401, "no user or no password");
      return;
    }
    userDAO.lookup(user, function (err, u) {
      if (u) {
        res.status(401).send("User exists:", user);
        return;
      }
      userDAO.create(user, password);
      console.log("register user", user, "password", password);
      res.redirect("/login");
    });
  };

  exports.post_newGoal = function (req, res){
   
      console.log("processing new goal");
      if (!req.body.goal_type) {
         response.status(400).send("Entries must have a goal type.");
         return;
      }
      db.addGoals(req.body.goal_type, req.body.goal, req.body.duration, req.body.achieved);
      res.redirect("/goalAdded");
  };
   
  
  
exports.goalAdded = function(req,res) {
  res.render("goalAdded", {
      'title' : "Wellness Insight | Goal Added"
  })
}



exports.nutrition = function(req,res) {
    res.render("nutrition", {
        'title' : "Wellness Insight | Nutrition",
        'user' : 'user',
    })
}

exports.fitness = function(req,res) {
    res.render("fitness", {
        'title' : "Wellness Insight | Fitness",
        'user' : 'user'
    })
}

exports.lifestyle = function(req,res) {
    res.render("lifestyle", {
        'title' : "Wellness Insight | Lifestyle",
        'user' : 'user'
    })
}

exports.getFitnessGoals = function(req,res) {
    res.redirect("/fitnessGoals");
    db.getFitnessGoals();
}

exports.getNutritionGoals = function(req,res) {
    res.redirect("/nutritionGoals");
    db.getNutritionGoals();
}

exports.getLifestyleGoals = function(req,res) {
    res.redirect("/lifestyleGoals");
    db.getLifestyleGoals();
}


exports.logout = function(req, res) {
    res
        .clearCookie("jwt")
        .status(200)
        .redirect("/login");
    }




