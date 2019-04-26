// Initialize Firebase
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

//MAIN PAGE SELECTION
	//
	$('.small-container').on('mouseenter', function(){
		$(this).css("background-color", "rgba(8, 103, 136, 1)");
	});
	
	$('.small-container').on('mouseleave', function(){
		$(this).css("background-color", "rgba(66, 75, 84, 1)");	
	});

	//select Add new product
	$('#addNewProd').click(function(){
	
		//display form to add new product
		$('.main-container, #add').removeClass('displayNone');
		$('#home').addClass('displayNone');
	});
	

	//select update existing product
	$('#updateProduct').click(function(){

		//display form to update product
		$('.main-container, #update').removeClass('displayNone');
		$('#home').addClass('displayNone');
	});

	//select to view inventory
	$('#viewInventory').click(function(){

		//display form to update product
		$('.main-container, #inventory-list').removeClass('displayNone');
		$('#home').addClass('displayNone');
	});


//ADD NEW PRODUCT
	//Sets size boxes to display depending on which product category is selected
	$('#prodCat').change(function(){

		//set product category value to a variable
		var productCat = $('#prodCat').val();

		//if else conditions to display size inputs dependent on product category
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
		var price = $('#price').val();

		//clear down input, UI experience
		$('#prodId').val('');
		$("#prodName").val('');
		$('#description').val('');
		$('#small').val('');
		$('#medium').val('');
		$('#large').val('');
		$('#xLarge').val('');
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
    		productPrice: price
  		});
	});		


});