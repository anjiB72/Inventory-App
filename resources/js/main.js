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

	//Sets size boxes to display depending on which product category is selected
	$('#prodCat').change(function(){

		var productCat = $('#prodCat').val();

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

  		// use the set method to save data to the products
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