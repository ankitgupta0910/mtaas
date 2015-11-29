var mysql=require('./mysql');

exports.newProject = function(req, res){
	console.log("for creating new project ");
	
	var ad_email = req.param("ad_email");
	var platform = req.param("platform");
	var app_name = req.param("app_name");
	var description = req.param("description");
	var no_of_testers = req.param("no_of_testers");
	var language_preference = req.param("language_preference");
	var project_testing_type = req.param("project_testing_type");
	var project_bugdet = req.param("project_bugdet");
	var Project_duration = req.param("Project_duration");
	var project_access_area = req.param("project_access_area");
	var report_access_area = req.param("report_access_area");
	var project_status='P';
	
		var myquery = "insert into app_project_setup (ad_email,platform,app_name,description,no_of_testers,language_preference,project_testing_type,project_bugdet,Project_duration,project_access_area,report_access_area,project_status) values ('"+ad_email+"', '"+platform+"','"+app_name+"','"+description+"','"+no_of_testers+"','"+language_preference+"','"+project_testing_type+"','"+project_bugdet+"','"+Project_duration+"','"+project_access_area+"','"+report_access_area+"','"+project_status+"')";
		mysql.fetchData(function(err,results){
			if(err)
				{
					throw err;
				}
			else
				{
				console.log(results);
				res.send({"status":200});
				}	
			
		},myquery);

} ;
	
	
//////////////Find tester///////////////////////////////	
exports.findTester = function(req, res){
	
	console.log("Inside findTester ");
	
	var ad_email = req.param("ad_email");
	var app_name = req.param("app_name");
	
	console.log("ad_email: "+ad_email);
	console.log("app_name: "+app_name);
	
	var myquery= "select * from app_project_setup where app_name= '"+app_name+"' and ad_email= '"+ad_email+"'";
	
	mysql.fetchData(function(err,results){
		if(err)
			{
				throw err;
			}
		else
			{
				console.log(results);
				var no_of_testers=results[0].no_of_testers;
				console.log(no_of_testers);
				
				var myquery2="select u.*,t.* from users u, testers_data t where u.email=t.email_id and t.status='AV' order by rating desc limit "+no_of_testers+" " ;
				
				mysql.fetchData(function(err,results){
					if(err)
						{
							throw err;
						}
					else
						{
						console.log(results);
						res.send({"status":200,"detail":results});
						}	
					
				    },myquery2);
			}
	},myquery);
};


///////////////////////Accept Tester////////////////////////////////////
exports.acceptTester = function(req, res){

	var ap_email = req.param("ap_email");
	var app_name = req.param("app_name");
//	var count= req.param("count"); //count of tester's got selected
	var data= req.param("data");
//	var num_of_testers;  //total number of tester's needed for the project
	var project_id;
	var i=0;
//	
//	
    var q1= "select * from app_project_setup where app_name= '"+app_name+"' and ap_email= '"+ap_email+"'";
	
	mysql.fetchData(function(err,results){
		if(err)
			{
				throw err;
			}
		else
			{
				console.log(results);
				//num_of_testers=results[0].no_of_testers;
				project_id=results[0].project_id;
				
				//console.log("num_of_testers: "+num_of_testers);
				console.log("project_id :"+project_id);
			}
	  
	},q1);
//	
//	
////	var q2= "select count(*) from tester_selection_temp where project_id= '"+project_id+"' and ap_email= '"+ap_email+"'";
////	
////	mysql.fetchData(function(err,results){
////		if(err)
////			{
////				err;
////			   
////			}
////		else
////			{
////			
////			   if(results)
////			
////				console.log(results);
////				var project_id=results[0].project_id;
////				console.log("project_id :"+project_id);
////				
////				var q3="select * from  app_workflow  where project_id='"+project_id+"'";
//				
	            while(i in data){
	            	
	            var tr_email=data[i].email_id;
	            var selected=data[i].selected;
		            if (selected=='true'){
		            var ap_status='Y';
		            var tr_status='P';
		             }
		             else{
		             var ap_status='N';
		 	         var tr_status= null; 
		            	 
		             }
					var q3="insert into tester_selection_temp(sl_id,project_id,tr_email,ap_email,ap_status,tr_status) values ('"+project_id+"', '"+tr_email+"','"+ap_email+"','"+ap_status+"','"+tr_status+"')";
					mysql.fetchData(function(err,results){
						if(err)
							{
								throw err;
							}
						else
							{
							console.log(results);
							//res.send({"status":200});
							}	
						
					    },q3);
				
				i++
               }
//			}
//	},q2);
//	
//
};
//
//
//
/////////////////////////Billing//////////////////////////////////
//
////exports.billing = function(req,res){
////	
////	console.log("Inside findTester ");
////	
////	var ad_email = req.param("ad_email");
////	var app_name = req.param("app_name");
////	
////	console.log(ad_email);
////	console.log(app_name);
////	
////	var myquery= "select * from app_project_setup where app_name= '"+app_name+"' and ad_email= '"+ad_email+"'";
////	
////	mysql.fetchData(function(err,results){
////		if(err)
////			{
////				throw err;
////			}
////		else
////			{
////				console.log(results);
////				var project_id=results[0].project_id;
////				console.log("project_id :"+project_id);
////				
////				var myquery2="select * from  app_workflow  where project_id='"+project_id+"'";
////				
////				mysql.fetchData(function(err,results){
////					if(err)
////						{
////							throw err;
////						}
////					else
////						{
////						console.log(results);
////						res.send({"status":200,"detail":results});
////						}	
////					
////				    },myquery2);
////			}
////	},myquery);
////};