var moment = require('moment');
const fs = require('fs');
module.exports = 
{
	homePage: (req, res) => 
	{
	        res.render('home.ejs', {
	            title: 'Welcome to Venue CET',
	            message: ''
	        });
	},
  	home: (req, res) => 
	{ let squery = "DELETE FROM `unavailable`";	
			                	db.query(squery, (err, result) =>
						{
                				if (err) {
                	        			  return res.status(500).send(err);
                	        		}console.log("Number of records deleted: " + result.affectedRows);
						});	
		let querys = "DELETE FROM `hdummy`";	
			                	db.query(querys, (err, result) =>
						{
                				if (err) {
                	        			  return res.status(500).send(err);
                	        		}console.log("Number of records deleted: " + result.affectedRows);
						});	
	        let message = '';	
		let sdate = req.body.sdate;
		var st = req.body.st;
		var et = req.body.et;
		var n;
		var i;
		var flag=0;
		var arr = []; 
	        let usernameQuery = "SELECT * FROM `booking`";
		let usernameQuery2 = "SELECT count(*) as c FROM `booking`";
		let usernameQuery4 = "SELECT * FROM `venue` WHERE id not in (SELECT vid FROM `unavailable`)";
		db.query(usernameQuery2, (err, result) => {
            		if (err) {}
	    		n=result[0].c;
		    	console.log(result);
        	});
		var t = new Date();var curdt = moment(t).format('YYYY-MM-DD');console.log(curdt);
		if(sdate<curdt)
		{
			res.send({
        	  	"Error":"Date should be greater than current date"
            		});
		}
		else if(st > et)
		{
			res.send({
        	  	"Error":"Start time should be less than End time"
            		});
		}
		else if(st < '08:00:00' || et > '17:00:00')
		{
			res.send({
	                "Error":"Working hour is 08:00:00 to 17:00:00"
            		});
		}
		else
		{
			let query1 = "INSERT INTO `hdummy` VALUES ( '" + sdate + "','" + st + "','" + et + "')";	
                	db.query(query1, (err, result) =>
			{
                	if (err) {
                	          return res.status(500).send(err);
                	         }
          		});
       			db.query(usernameQuery, (err, result,field) => {
            			if (err) 
               				return res.status(500).send(err);
				for(i=0;i<n;i++)
				{
					var dt = moment(result[i].date).format('YYYY-MM-DD');
					console.log(i);
					if(dt==sdate)
					{	
						console.log('Dates same');
					if (result[i].stime > st && result[i].stime >= et || result[i].etime <= st && result[i].etime < et) 						{
						//console.log('You can book');
						
					}
					else
					{
						let query5 = "DELETE FROM `unavailable`";	
			                	db.query(query5, (err, result) =>
						{
                				if (err) {
                	        			  return res.status(500).send(err);
                	        		}
		
                				//res.redirect('/home');
          					});
						let query = "INSERT INTO `unavailable` (vid) VALUES ( '" + result[i].vid + "')";	
			                	db.query(query, (err, result) =>
						{
                				if (err) {
                	        			  return res.status(500).send(err);
                	        		}
		
                				//res.redirect('/home');
          					});
					}
           				
						flag=1;
						
					}     
		
				}
				if(flag==0)
				{ 
					console.log('Dates are different');
				}
				else
				{
					console.log(arr);
				}
				
			});
			db.query(usernameQuery4,(err, result,field) => {
            			if (err) 
               				return res.status(500).send(err);
				console.log(result);
				res.redirect('/avail');
			});
			
		}
	}
};

