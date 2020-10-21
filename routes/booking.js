module.exports = {
    bookingPage: (req, res) => {
        let query = "SELECT b.id as id,b.vid as vid,r.username as username,v.venuename as venuename FROM `venue` as v,`booking` as b,`register` as r WHERE v.id=b.vid and b.uid=r.id ORDER BY b.id ASC"; // query database to get all the players
	console.log();
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('booking.ejs', {
                title: 'Welcome to Venue CET',
		book: result
            });
        });
    },
   booking: (req, res) => {
     
        let message = '';
	let filter = req.body.filter;
	console.log('inside booking.js');
	console.log(filter);
       
	
       let usernameQuery = "SELECT * FROM `venue` as v,`booking` as b,`register` as r WHERE v.id=b.vid and b.uid=r.id ";

        db.query(usernameQuery, (err, result) => {
            if (err) {
               return res.status(500).send(err);
            }
           
        });
}
};

