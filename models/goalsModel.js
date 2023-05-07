const nedb = require('nedb');

class GoalsDAO {
    constructor(dbFilePath) {
        if(dbFilePath) {
            this.db = new nedb({filename: dbFilePath, autoload: true});
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db=new nedb();
        }
    }

    init() { 

        // seeding the database with documents
        this.db.insert({
            goal_type: "Fitness",
            goal: "i want to do 10 push ups a day",
            duration: "1 week",
            achieved: "not yet"
        });
        //to assist with debugging
    console.log("db fitness goal entry ");

        this.db.insert({
            goal_type: "Nutrition",
            goal: "i want to eat 5 fruit and veg a day",
            duration: "1 week",
            achieved: "not yet"
        });

        //to assist with debugging
    console.log("db nutrition goal entry");
        
        this.db.insert({
            goal_type: "Lifestyle",
            goal: "i want to practice positive thinking",
            duration: "1 week",
            achieved: "not yet"
        });

    console.log("db lifestyle goal entry");    
    
    }

    addGoals(goal_type, goal, duration, achieved) {
        const add = this;
        add.db.insert(goal, function(err, doc){
            var goal = {
                goal_type: goal_type,
                goal: goal,
                duration : duration,
                achieved : achieved,
            }
            if (err){
                console.log('error inserting document',goal);
            } else {
                console.log('Document inserted into the database', doc);
            }
        });
    }

    getAllGoals(){
        return new Promise((resolve,reject)=>{
            this.db.find({}, function(err, goals){
                if (err) {
                    reject(err);
                } else {
                    resolve(goals);

                    console.log('function all() returns: ', goals);
                }
            })
        })
    }

    getFitnessGoals(){
        return new Promise((resolve,reject)=> {
            this.db.find({goal_type: 'Fitness'}, function(err, goals){
                if(err) {
                    reject(err);
                } else {
                    resolve(goals);

                    console.log('getFitnessGoals() returns: ', goals);
                }
            })
        })
    }

    getNutritionGoals(){
        return new Promise((resolve,reject)=> {
            this.db.find({goal_type: 'Nutrition'}, function(err, goals){
                if(err) {
                    reject(err);
                } else {
                    resolve(goals);

                    console.log('getNutritionGoals() returns: ', goals);
                }
            })
        })
    }

    getLifestyleGoals(){
        return new Promise((resolve,reject)=> {
            this.db.find({goal_type: 'Lifestyle'}, function(err, goals){
                if(err) {
                    reject(err);
                } else {
                    resolve(goals);

                    console.log('getLifestyleGoals() returns: ', goals);
                }
            })
        })
    }


}



module.exports= GoalsDAO;