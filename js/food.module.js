'use strict';
// CHOOSE A FOOD
//------------------------------------------------------

var Dishes = (function() {

	// grab foods
	var foods = document.querySelectorAll('.img_set img');
	foods = Array.prototype.slice.call( foods ); // Array.from( foods );

	// return all
	var getAllFoods = function() {
		return foods;
	}

	// foods order
	var getKeyFrom = function( food ) {
		return 'counter' + _.capitalize( food.alt );
	}

	// get food order from localStorage
	var getOrder= function( food ) {
		return +localStorage.getItem( getKeyFrom(food) ) || 0;
	}

	// set food order to localStorage
	var setOrder = function( food, order ) {
		localStorage.setItem( getKeyFrom(food), order);
	}

	// update foods order DOM element
	var updateFood = function( food ) {
		var order = getOrder(food);
		food.nextElementSibling.textContent = order;
	}

	// increase order for food, both dom and localStorage
	var increaseOrder = function( food ) {
		var order = getOrder(food) + 1;

		setOrder(food, order);
		updateFood(food);
	}

	// multiple eventListener
	var addEvents = function(element, handle, fn) {
		var e = handle.split(', ');
		for (var i = 0, l = e.length; i < l; i++) {
			element.addEventListener(e[i], fn, false);
		}
	}

	// TOTAL PRICE
	// get food price from localStorage
	var getPrice = function() {
		return +localStorage.getItem( 'totalPrice' ) || 0;
	};

	// set food price to localStorage
	var setPrice = function(price) {
		localStorage.setItem('totalPrice', price);
	};

	// update price DOM element
	var updateTotalPrice = function() {
		var price = +localStorage.getItem( 'totalPrice' ) || 0;

		totalPriceElement.textContent = Counter.money(price);
	};

	// increase Total price
	var increaseTotalPrice = function(itemPrice) {
		var price = getPrice();

		price = price + itemPrice;
		price = price;

		setPrice(price);
		updateTotalPrice()
	};

	// get item price from DOM element
	var getFoodPrice = function(foodName) {
		var foodPrice = parseFloat(foodName.replace(/\,/g, '.'));
		return foodPrice;
	};

	// DISCOUNT PRICE
	var updateDiscount = function(discount) {
		var totalPrice = Dishes.getPrice();
		var discountPrice = Counter.discount(totalPrice, discount);

		discountPriceElement.textContent = Counter.money(discountPrice);
	};

	//get discount from DOM element
	var getDiscount = function() {
		var txt = discountElement;
		var numb = txt.match(/\d/g);
		numb = +numb.join("");
		return numb;
	};

	//delete value in DOM
	var deleteCounters = function(food) {
		food.nextElementSibling.textContent = 0;
	};

	// public functions
	return {
		all: getAllFoods,
		addEvents: addEvents,
		// order functions
		getOrder: getOrder,
		setOrder: setOrder,
		updateDOM: updateFood,
		increaseOrder: increaseOrder,
		// price functions
		updateTotalPrice: updateTotalPrice,
		increaseTotalPrice: increaseTotalPrice,
		getFoodPrice: getFoodPrice,
		getPrice: getPrice,
		// discount functions
		updateDiscount: updateDiscount,
		getDiscount: getDiscount,

		deleteCounters: deleteCounters
	}

}());

// COUNTER MONEY
//------------------------------------------------------

var Counter = (function() {

// currency
	var money = function(number) {
		return number.toLocaleString(undefined, {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		})
	};

// discount
	var discount = function(price, discount) {
		var dic = (price / 100) * discount;
		var finalPrice = price - dic;
		return Counter.money(finalPrice);
	}

	return {
		money: money,
		discount: discount
	}

}());
