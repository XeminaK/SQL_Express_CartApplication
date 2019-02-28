"use strict";
const cart = {
    templateUrl: "app.html",
    controller: ["CartService", function(CartService) {
        const vm=this;
        CartService.getAllItems().then(response => {
            vm.cartItems = response.data;
        })
        vm.addItem = function(newItem) {
            CartService.addItem(newItem).then(response => {
                vm.cartItems = response.data;
                document.getElementById("input1").value = "";
                document.getElementById("input2").value = "";
                document.getElementById("input3").value = "";
            });
        };
        vm.removeItem = function(item) {
            CartService.deleteItem(item).then(response => {
                vm.cartItems = response.data;
                console.log(item);
            })
        };
        vm.editQuantity = function(item, newItem) {
            CartService.updateQuantity(item, newItem).then(response => {
                vm.cartItems = response.data;
             })
        };
    }]
}

angular.module("App").component("cart", cart);