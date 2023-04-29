# sequence-generator
=========
Sequence Generator for node app 

A small library that generates incremental ids for a given collection

## Installation

  `npm install generate-sequence`

## Usage
    first require following
    sequence = require('sequence-generator').sequenceGenerator("collectionId");

    then while adding data in a collection you can do following

     sequence.next(function(nextSeq){
            var userObj = {
                userid: nextSeq,
                fname: "riasat",
                lname: "raihan",
                password: "1234",
                email: "riasatraihan@gmail.com"
            };

            var user = new User(userObj);
            user.save(function(err){
                if(err) return console.log({message : "Error occured", error: err });

                //var response = {message: "New user created", data:user};
                //res.json(response)
                console.log({message: "New user created", data:user});
            });
        });
