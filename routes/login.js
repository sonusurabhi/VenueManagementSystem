
module.exports = {

   loginPage: (req, res) => {
        res.render('login.ejs', {
            title: 'Welcome to Venue CET',
            message: ''
        });
    },


    login: (req, res) => {
     let squery = "DELETE FROM `ldummy`";	
			                	db.query(squery, (err, result) =>
						{
                				if (err) {
                	        			  return res.status(500).send(err);
                	        		}console.log("Number of records deleted: " + result.affectedRows);
						});
		
        let message = '';
	let pass = req.body.pass;
        let username = req.body.username;
	if(username=='admin' && pass == 'admin'){
	res.redirect("/admin");
      }
	else{
 db.query('SELECT * FROM register WHERE username = ?',[username], function (error, results, fields) {
  if (error) {
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    // console.log('The solution is: ', results);
    if(results.length >0){
	
      if(results[0].pass == pass){
	let query = "INSERT INTO `ldummy` VALUES ( '" + results[0].id + "')";	
                	db.query(query, (err, result) =>
			{
                	if (err) {
                	          return res.status(500).send(err);
                	         }
          		});
	res.redirect("/home");
      }
      else{
        res.send({
          "code":204,
          "success":"Username and password does not match"
            });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"Username doesnot exist!"
          });
    }
	
	  }
  });}
}};
