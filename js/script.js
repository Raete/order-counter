'use strict';

// FOOD
//------------------------------------------------------
var foods = Dishes.all();
var totalPriceElement = document.querySelector('.total_price'),
	discountPriceElement = document.querySelector('.discount_price'),
	discountElement = document.querySelector('.discount').textContent,
	burgerPrice = document.getElementById('burgerPrice').textContent,
	pastaPrice = document.getElementById('pastaPrice').textContent,
	pizzaPrice = document.getElementById('pizzaPrice').textContent,
	clearBtn = document.querySelector('.btn--clear');
var lengthFood = foods.length;

foods.forEach(function(food) {

	// load food price from localStorage
	Dishes.updateTotalPrice();
	// load food price from localStorage and make discount
	Dishes.updateDiscount(Dishes.getDiscount());
	// load food order from localStorage
	Dishes.updateDOM(food);
	// on click, increase order and total price
	food.addEventListener('click', function() {
		//order
		Dishes.increaseOrder( food );
		//price
		if (food.alt == 'burger'){
			Dishes.increaseTotalPrice(Dishes.getFoodPrice(burgerPrice))
			//burger price
		}
		if (food.alt == 'pasta'){
			Dishes.increaseTotalPrice(Dishes.getFoodPrice(pastaPrice))
			//pasta price
		}
		if (food.alt == 'pizza'){
			Dishes.increaseTotalPrice(Dishes.getFoodPrice(pizzaPrice))
			//pizza price
		}
		// discount
		Dishes.updateDiscount(Dishes.getDiscount());

	});

	// add gray effects on other foods/
	Dishes.addEvents(food, 'mouseover, mouseout', function(){
		var otherFood = _.without(foods, this);
		otherFood.forEach(function(item) {
			item.classList.toggle('desaturate');
		});
	});



});

// delete all data
clearBtn.addEventListener('click', function() {
	// clear data from local storage
	localStorage.clear();
	// delete data from website
	Dishes.updateTotalPrice();
	Dishes.updateDiscount(Dishes.getDiscount());

	foods.forEach(function(food) {
		Dishes.updateDOM(food);
	});
});
