document.addEventListener("DOMContentLoaded", function (event) {
	
	
	document.getElementById('logout').addEventListener('click',logout);
})




function logout()   
{
   	var url = "../controller/cLogout.php";

	fetch(url, {
	  method: 'GET',  
	})
	.then(res => res.json()).then(result => {
					    		
		   window.location.href="../index.html";
	})
	.catch(error => console.error('Error status:', error));	   
}