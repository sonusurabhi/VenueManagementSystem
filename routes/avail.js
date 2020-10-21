var moment = require('moment');
const fs = require('fs');
module.exports = {
    availPage: (req, res) => {
     let query = "SELECT * FROM `venue` WHERE id not in (SELECT vid FROM `unavailable`)";
		
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/avail');
            }
            res.render('avail.ejs', {
                title: 'Locus CET',
		message: '',
		avail: result
            });
        });
	
    },

    avail: (req, res) => {

           
        let usernameQuery = "SELECT * FROM `venue` WHERE venuename = '" + venuename + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
	});
},
          detailPage: (req, res) => {
        let id = req.params.id;
        let query = "SELECT * FROM `venue` WHERE id = '" + id + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('detail.ejs', {
                title: 'Detail',
                desc: result,
                message: ''
            });
        });
    },
    detail: (req, res) => {
        let id = req.params.id;
	let faci=req.body.faci;
	let event=req.body.event;
	let bookcode=req.body.bookcode;
	var uid;
	var bdate;var bst;var bet;
	let query3 = "INSERT INTO `booking` (vid, faci, event, bookcode) VALUES ('" + id + "', '" + faci + "', '" + event + "','" + bookcode + "')";	
                	db.query(query3, (err, result) =>
			{
                	if (err) {
                	          return res.status(500).send(err);
                	         }
		
          		});
        let query1 = "SELECT * FROM `ldummy`";
        db.query(query1, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
		uid=result[0].uid;
	let query5 = "UPDATE `booking` SET uid = '" + uid + "' WHERE bookcode = '" + bookcode + "'";	
                	db.query(query5, (err, result) =>
			{
                	if (err) {
                	          return res.status(500).send(err);
                	         }
		
          		});	
        });
      
           let query2 = "SELECT * FROM `hdummy` ";
        db.query(query2, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
	 bdate = moment(result[0].sdate).format('YYYY-MM-DD');
          
	    bst = result[0].st;
	    bet = result[0].et; 
	
	let query4 = "UPDATE `booking` SET date = '" + bdate + "', stime = '" + bst + "', etime = '" + bet + "' WHERE bookcode = '" + bookcode + "'";	
                	db.query(query4, (err, result) =>
			{
                	if (err) {
                	          return res.status(500).send(err);
                	         }
		
          		});	
        });

	
}
    
};


