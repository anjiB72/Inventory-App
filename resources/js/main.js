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
		
		//set an empty array called inventory
		var inventory = [];

		//loops through all items in the allProducts variable
		for (var item in allProducts){

			var context = {
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

	      var source = $("#entry-template").html();
	      var template = Handlebars.compile(source);
	      var inventoryItem = template(context);
	      inventory.push(inventoryItem);
	  	};

    	// append each item to the inventory table in the DOM
	    for (var i in inventory) {
	      $('#inventory-table').append(inventory[i]);
	    };
	}); //End of database.ref('products') once results function
}; //End of getProducts Function

//jquery document ready
$(document).ready(function(){

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
		if (productCat === "socks") {
			$('#sockSizes').removeClass("displayNone");
			$('#topSizes , #kidSizes').addClass('displayNone');
		} else if (productCat === "kids") {
			$('#kidSizes').removeClass("displayNone");
			$('#topSizes , #sockSizes').addClass('displayNone');
		} else if (productCat === "tops") {
			$('#topSizes').removeClass('displayNone');
			$('#kidSizes , #sockSizes').addClass('displayNone');
		} else {
			$('#topSizes , #sockSizes , #kidSizes').addClass('displayNone');
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


}); //jquery document ready end brackets