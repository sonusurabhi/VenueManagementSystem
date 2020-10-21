const fs = require('fs');
module.exports = {
    adminPage: (req, res) => {
        let query = "SELECT * FROM `venue` ORDER BY id ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/admin');
            }
            res.render('admin.ejs', {
                title: 'Locus CET',
		message: '',
		venue: result
            });
        });
    },

    admin: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let venuename = req.body.venuename;
        let manager = req.body.manager;
        let number = req.body.number;
	let descr = req.body.descr;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = venuename + '.' + fileExtension;

        let usernameQuery = "SELECT * FROM `venue` WHERE venuename = '" + venuename + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Venuename already exists';
                res.render('admin.ejs', {
		    message,
                    title: 'Locus CET'
                });
            } else {
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // send venue details to the database
                        let query = "INSERT INTO `venue` (venuename, manager, number, image, descr) VALUES ('" +
                            venuename + "', '" + manager + "','" + number + "', '" + image_name + "','" + descr + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/admin');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('admin.ejs', {
                        message,
                        title: 'Locus CET'
                    });
                }
            }
        });
    },
    editPlayerPage: (req, res) => {
        let id = req.params.id;
        let query = "SELECT * FROM `venue` WHERE id = '" + id + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-player.ejs', {
                title: 'Edit',
                venue: result[0],
                message: ''
            });
        });
    },
    editPlayer: (req, res) => {
        let id = req.params.id;
        let venuename = req.body.venuename;
        let manager = req.body.manager;
        let number = req.body.number;

        let query = "UPDATE `venue` SET `venuename` = '" + venuename + "', `manager` = '" + manager + "', `number` = '" + number + "' WHERE `venue`.`id` = '" + id + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/admin');
        });
    },
    deletePlayer: (req, res) => {
        let id = req.params.id;
        let getImageQuery = 'SELECT image from `venue` WHERE id = "' + id + '"';
        let deleteUserQuery = 'DELETE FROM `venue` WHERE id = "' + id + '"';

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
                    res.redirect('/admin');
                });
            });
        });
    }
};


