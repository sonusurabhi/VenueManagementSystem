const fs = require('fs');
module.exports = {
    addPlayerPage: (req, res) => {
        res.render('add-player.ejs', {
            title: 'Welcome to Venue CET',
            message: ''
        });
    },
    addPlayer: (req, res) => {
        //if (!req.files) {
          //  return res.status(400).send("No files were uploaded.");
        //}

        let message = '';
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
	let mob = req.body.mob; 
        //let position = req.body.position;
        let email = req.body.email;
	let addr = req.body.addr;
	let pass = req.body.pass;
	let pass1 = req.body.pass1;
        let username = req.body.username;
       //let uploadedFile = req.files.image;
        //let image_name = uploadedFile.name;
        //let fileExtension = uploadedFile.mimetype.split('/')[1];
        //image_name = username + '.' + fileExtension;

        let usernameQuery = "SELECT * FROM `register` WHERE username = '" + username + "'";

        db.query(usernameQuery, (err, result) => {
            //if (err) {
             //   return res.status(500).send(err);
            //}
            if (result.length > 0) {
                message = 'Username already exists';
                res.render('add-player.ejs', {
		    message,
                    title: 'Welcome to Venue CET'
                });
            } 
	else 
	{
		if(pass==pass1)
		{
	        	let query = "INSERT INTO `register` (first_name, last_name, username, email, mob, addr, pass) VALUES ('" +
           first_name + "', '" + last_name + "', '" + username + "', '" + email + "', '" + mob + "', '" + addr + "', '" + pass + "')";	
                	db.query(query, (err, result) =>
			{
                	if (err) {
                	          return res.status(500).send(err);
                	         }
		
                	res.redirect('/');
          		});
		}
		else
		{
			 message = 'password mismatch';
                res.render('add-player.ejs', {
		    message,
                    title: 'Welcome to Venue CET'
                });
		}
	
            }
        });
    }};
  /*  editPlayerPage: (req, res) => {
        let playerId = req.params.id;
        let query = "SELECT * FROM `players` WHERE id = '" + playerId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-player.ejs', {
                title: 'Edit  Player',
                players: result[0],
                message: ''
            });
        });
    },
    editPlayer: (req, res) => {
        let playerId = req.params.id;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let position = req.body.position;
        let number = req.body.number;

        let query = "UPDATE `players` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `position` = '" + position + "', `number` = '" + number + "' WHERE `players`.`id` = '" + playerId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deletePlayer: (req, res) => {
        let playerId = req.params.id;
        let getImageQuery = 'SELECT image from `players` WHERE id = "' + playerId + '"';
        let deleteUserQuery = 'DELETE FROM players WHERE id = "' + playerId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        });*/
    



