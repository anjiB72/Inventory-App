// Initialise Firebase
  var config = {
    apiKey: "AIzaSyASCsUTfCdp-9JUwWo06DxYgRpF-GJFeXI",
    authDomain: "simple-inventory-ab01.firebaseapp.com",
    databaseURL: "https://simple-inventory-ab01.firebaseio.com",
    projectId: "simple-inventory-ab01",
    storageBucket: "simple-inventory-ab01.appspot.com",
    messagingSenderId: "374828408570"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

//jquery document ready
$(document).ready(function(){
	
//global variables
var inventory = [];
var inventoryItem;
var searchProduct = [];
var id;
var context = {};

//function that hides the home page when the small container element is selected
function hideHome(){
	var element = document.getElementById('home');
	element.classList.add('displayNone');
};

//function to retrieve products from database to display in table
function getProducts(){
		//calls the database just once and provides that instance of the results
		database.ref('products').once('value', function(results){	
		//stores all the result values in a variable called allProducts
		var allProducts = results.val();
		//loops through all items in the allProducts variable
		for (var item in allProducts){
			context = {
		        productCategory: allProducts[item].productCategory,
		        productID: allProducts[item].productId,
		        productName: allProducts[item].productName,
		        volumeSmall: allProducts[item].volumeSmall,
		        volumeMedium: allProducts[item].volumeMedium,
		        volumeLarge: allProducts[item].volumeLarge,
		        volumeXlarge: allProducts[item].volumeXlarge,
		        volumeSmallSock: allProducts[item].volumeSmallSock,
		        volumeMediumSock: allProducts[item].volumeMediumSock,
		        volumeSmallKid: allProducts[item].volumeSmallKid,
		        volumeMediumKid: allProducts[item].volumeMediumKid,
		        volumeLargeKid: allProducts[item].volumeLargeKid,
		        productPrice: allProducts[item].productPrice,
		        itemId: item
		      };
		  //populates the handlebar template for each item
	      var source = $("#entry-template").html();
	      var template = Handlebars.compile(source);
	      inventoryItem = template(context);
	      inventory.push(inventoryItem);
	    };

    	// append each item to the inventory table in the DOM
	    for (var i in inventory) {
	      $('#inventory-table').append(inventory[i]);
	    };
	}); //End of database.ref('products') once results function
}; //End of getProducts Function

function updateToDatabase(){
	//store the input values into variables
		var prodCat = $('#updateCat').val();
		var prodId = $('#updateId').val();
		var prodName = $("#updateProdName").val();
		var prodDesc = $('#updateDescription').val();
		var small = $('#updateSmall').val();
		var medium = $('#updateMedium').val();
		var large = $('#updateLarge').val();
		var xLarge = $('#updateXLarge').val();
		var smallSock = $('#updateSmallSock').val();
		var mediumSock = $('#updateMediumSock').val();
		var smallKid = $('#updateSmallKid').val();
		var mediumKid = $('#updateMediumKid').val();
		var largeKid = $('#updateLargeKid').val();
		var price = $('#updatePrice').val();

		//console.log(id);

		database.ref('products/' + id).set({
			productCategory: prodCat,
	    		productId: prodId,
	    		productName: prodName,
	    		productDescription: prodDesc,
	    		volumeSmall: small,
	    		volumeMedium: medium,
	    		volumeLarge: large,
	    		volumeXlarge: xLarge,
	    		volumeSmallSock: smallSock,
			volumeMediumSock: mediumSock,
			volumeSmallKid: smallKid,
			volumeMediumKid: mediumKid,
			volumeLargeKid: largeKid,
			productPrice: price
		});
					
}; //End of function



//MAIN PAGE SELECTION
	//Change background colour when mouse enters or leaves the small containers on screen
	$('.small-container').on('mouseenter', function(){
		$(this).css("background-color", "rgba(8, 103, 136, 1)");
	});
	
	$('.small-container').on('mouseleave', function(){
		$(this).css("background-color", "rgba(66, 75, 84, 1)");	
	});

	//select Add new product
	$('#addNewProd').click(function(){
	
		//display the form to add new product and hide the main container
		$('.main-container, #add').removeClass('displayNone');
		//calls hideHome function	
		hideHome();
	});
	
	//select update existing product
	$('#updateProduct').click(function(){

		//display form to update product
		$('.main-container, #update').removeClass('displayNone');
		//calls hideHome function	
		hideHome();
	});

	//select to view inventory
	$('#viewInventory').click(function(){

		//display form to update product
		$('.main-container, #inventory-list').removeClass('displayNone');
		//calls getProduct function
		getProducts();
		//calls hideHome function	
		hideHome();
	});


//ADD NEW PRODUCT
	//Sets size boxes to display depending on which product category is selected
	$('#prodCat').change(function(){

		//set product category value to a variable
		var productCat = $('#prodCat').val();
		
		//if else condition to display size inputs dependent on product category selected
		if (productCat === "Socks") {
			$('.sockSizes').removeClass("displayNone");
			$('.topSizes , .kidSizes').addClass('displayNone');
		} else if (productCat === "Kids") {
			$('.kidSizes').removeClass("displayNone");
			$('.topSizes , .sockSizes').addClass('displayNone');
		} else if (productCat === "Tops") {
			$('.topSizes').removeClass('displayNone');
			$('.kidSizes , .sockSizes').addClass('displayNone');
		} else {
			$('.topSizes , .sockSizes , .kidSizes').addClass('displayNone');
		};
	});

	//on submitting the add product form
	$('#add-product').on('submit', function(e){
		//prevent the page reload default
		e.preventDefault();

		//store the input values into variables
		var prodCat = $('#prodCat').val();
		var prodId = $('#prodId').val();
		var prodName = $("#prodName").val();
		var prodDesc = $('#description').val();
		var small = $('#small').val();
		var medium = $('#medium').val();
		var large = $('#large').val();
		var xLarge = $('#xLarge').val();
		var smallSock = $('#smallSock').val();
		var mediumSock = $('#mediumSock').val();
		var smallKid = $('#smallKid').val();
		var mediumKid = $('#mediumKid').val();
		var largeKid = $('#largeKid').val();
		var price = $('#price').val();

		//clear down input, UI experience
		$('#prodId').val('');
		$("#prodName").val('');
		$('#description').val('');
		$('#small').val('');
		$('#medium').val('');
		$('#large').val('');
		$('#xLarge').val('');
		$('#smallSock').val('');
		$('#mediumSock').val('');
		$('#smallKid').val('');
		$('#mediumKid').val('');
		$('#largeKid').val('');
		$('#price').val('');

		//create a section for products in database
		var productDetails = database.ref('products');

  		// use the set method to save data to products
  		productDetails.push({
			productCategory: prodCat,
			productId: prodId,
			productName: prodName,
			productDescription: prodDesc,
			volumeSmall: small,
			volumeMedium: medium,
			volumeLarge: large,
			volumeXlarge: xLarge,
			volumeSmallSock: smallSock,
			volumeMediumSock: mediumSock,
			volumeSmallKid: smallKid,
			volumeMediumKid: mediumKid,
			volumeLargeKid: largeKid,
			productPrice: price
  		}); // product details.push method end brackets
	});	//add product submit function end brackets	


//DELETE PRODUCT
	//Click event to delete a product from database and from table
	$('#inventory-table').on('click', '.delete', function (e) {
	  // Get the ID for the product we want to update
	  id = $(e.target).parents('tr').attr('data-id');
	  //removes row from table
	  $(e.target).parents('tr').remove();
	  //console.log(id);

	  // find product whose objectId is equal to the id we're searching with
	  var productReference = database.ref('products/' + id);
	  // Use remove method to remove the product from the database
  	  productReference.remove();
  	});  //end of delete product

//UPDATE PRODUCT
	//Retrieve product data from selected item on inventory table
	//on clicking the update icon in the table
	$('#inventory-table').on('click', '.update', function (e) {

	  // Get the ID for the product we want to update
	  id = $(e.target).parents('tr').data('id');
	  console.log(id);

	  //calls the database just once and provides that instance of the results
	  var ref = firebase.database().ref("products/" + id);
			ref.once("value")
			  .then(function(snapshot) {
			    var category = snapshot.child("productCategory").val(); 
			    var prodId = snapshot.child("productId").val();
			    var name = snapshot.child("productName").val(); 
			    var desc = snapshot.child("productDescription").val();
			    var volSm = snapshot.child("volumeSmall").val(); 
			    var volMed = snapshot.child("volumeMedium").val(); 
			    var volLg = snapshot.child("volumeLarge").val();
			    var volXlg = snapshot.child("volumeXLarge").val();
			    var volSmSk = snapshot.child("volumeSmallSock").val();
			    var medSk = snapshot.child("volumeMediumSock").val();
			    var smKid = snapshot.child("volumeSmallKid").val();
			    var medKid = snapshot.child("volumeMediumKid").val();
			    var lgKid = snapshot.child("volumeLargeKid").val();
			    var price = snapshot.child("productPrice").val();

			    context = {
			        updateCategory: category,
			        updateProdId: prodId,
			       	updateProdName: name,
			       	updateDescription: desc,
			        updateSmall: volSm,
			        updateMedium: volMed,
			        updateLarge: volLg,
			        updateXlarge: volXlg,
			        updateSmallSock: volSmSk,
			        updateMediumSock: medSk,
			        updateSmallKid: smKid,
			        updateMediumKid: medKid,
			        updateLargeKid: lgKid,
			        updatePrice: price,
			        itemId: id
		      	};
		      	console.log(context);
		       	var source = $("#updateProductForm").html();  
		      	var template = Handlebars.compile(source);
		    	var searchProductItem = template(context);
		   		searchProduct.push(searchProductItem); 

		      // append the product form to the existing item div and remove the displayNone class
	    	    $('.existingItem').append(searchProduct).removeClass('displayNone')
	    	    $('#inventory-list').addClass('displayNone');
	  		
				}); //ends snapshot function					
	   		 }); //Ends on click update retrieve product function

	//update amended item into database and display changes in inventory table
		$('.existingItem').on('submit', '.updateItem', function(e){
			e.preventDefault();
			//calls the updateToDatabase function
			updateToDatabase();
			//once database updated hide the existing item form page and remove searchProduct form
			$('.existingItem').empty().addClass('displayNone');
			searchProduct = [];
			id;
			//clear down the current inventory table
			$('#inventory-table').empty();
			inventory = [];
			context = {};
			inventoryItem = "";
			//console.log(inventory);
			//console.log(context);
			//console.log(inventoryItem);
			//display inventory table
			$('#inventory-list').removeClass('displayNone');
			//populate table with updated database products
			getProducts();
		}); // end of update to database
  	
}); //jquery document ready end brackets
