/**
 * Created by Zang on 2017/3/20.
 */

'use strict';

function Car(options) {
    this.color = options.color || 'silver';
    this.doors = options.doors || 4;
    this.state = options.state || 'brand new';
}

function Truck(options) {
    this.color = options.color || 'blue';
    this.wheelSize = options.wheelSize || 'large';
    this.state = options.state || 'used';
}

function VehicleFactory() {
}

VehicleFactory.prototype.vehivleClass = Car;
VehicleFactory.prototype.createVehicle = function (options) {
    if (options.type === 'Car') {
        this.vehivleClass = Car;
    }
    else {
        this.vehivleClass = Truck;
    }
    return new this.vehivleClass(options);
};

var vehicle = new VehicleFactory();

var carVehicle = vehicle.createVehicle({
    type: 'Car',
    doors: 2
});

var truckVehicle = vehicle.createVehicle({
    type: 'Truck',
    wheelSize: 'small'
});

// true
console.log(carVehicle instanceof Car);
// Car : color: "silver", doors: 2, state: "brand new"
console.log(carVehicle);
// true
console.log(truckVehicle instanceof Truck);
// Truck : color: "blue", wheelSize: "small", state: "used"
console.log(truckVehicle);