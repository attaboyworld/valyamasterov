var carData = JSON.parse(data);
var calculatedPrices = [];
var ridePrice;

loadCarData = () => {

    // clearing result card output
    let outputParent = document.getElementById("resultContainer");
    while (outputParent.firstChild) {
        outputParent.removeChild(outputParent.firstChild);
    }

    calculatedPrices = [];
    sortedCarPrices = [];

    // values from calculator form inputs
    var distance = parseFloat(document.getElementById("totalDistance").innerHTML);
    var time = parseInt(document.getElementById("totalTime").innerHTML);
    var waitTime = parseInt(document.getElementById("totalWait").innerHTML);
    var totalNightWaitTime = parseInt(document.getElementById("totalWaitNight").innerHTML);

    var cityBeeCarsSaved = []; // this is used to remove duplicates for CityBee later on

    carData.forEach(element => {

        // values from car data JSON file
        var company = element.Company;
        var carModel = element.CarModel;
        var carType = element.CarType;
        var fuelType = element.Type;
        var tariffName = element.TariffName;
        var min1 = parseFloat(element.Min1);
        var km1 = parseFloat(element.Km1);
        var h1 = parseFloat(element.H1);
        var h3 = parseFloat(element.H3);
        var day1 = parseFloat(element.Day1);
        var day2 = parseFloat(element.Day2);
        var day3 = parseFloat(element.Day3);
        var day7 = parseFloat(element.Day7);
        var day7 = parseFloat(element.Day14);
        var minimumTripPrice = parseFloat(element.MinimumTripPrice);
        var tripStartFee = parseFloat(element.TripStartFee);

        // Fixing missing wrong car model names for Teslas
        if (company === "OXDrive" || company === "Beast") {
            if (carModel !== "Tesla Model 3 Standard Range +") {
                carModel = "Tesla " + carModel;
            }
        }

        // Fiqsy Calculations
        if (company === "Fiqsy") {
            var totalTime = time + waitTime;
            minimumTripPrice = 2.50;

            // Renault Zoe
            var calcBreakDown = ""; tariffName = "Hour Package"; min1 = 0.28; h1 = 9.70; day1 = 47;

            if ((day1 * 60) / h1 <= totalTime && day1 < h3 + h1 * 2 + (totalTime - 300) * min1) {
                ridePrice = h1 * 5;
                calcBreakDown = "Day Package (" + day1 + "€)";
                if (distance > 100) {
                    ridePrice += 0.16 * (distance - 100);
                    calcBreakDown += " + Extra km (100km included in package) (0.16€ * " + distance-100 + "km)";
                } 
            } else if ((h1 * 5) / min1 <= totalTime && h1 * 5 < h1 * 4 + (totalTime - 300) * min1) {
                ridePrice = h1 * 5;
                calcBreakDown = "1 Hour Package (" + h1 + "€) * 5";
                if (totalTime > 300) {
                    ridePrice += min1 * (totalTime - 300);
                    calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 300) + "min)";
                }
            } else if ((h1 * 4) / min1 <= totalTime && h1 * 4 < h1 * 3 + (totalTime - 240) * min1) {
                ridePrice = h1 * 4;
                calcBreakDown = "1 Hour Package (" + h1 + "€) * 4";
                if (totalTime > 240) {
                    ridePrice += min1 * (totalTime - 240);
                    calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 240) + "min)";
                }
            } else if ((h1 * 3) / min1 <= totalTime && h1 * 3 < h1 * 2 + (totalTime - 180) * min1) {
                ridePrice = h1 * 3;
                calcBreakDown = "1 Hour Package (" + h1 + "€) * 3";
                if (totalTime > 180) {
                    ridePrice += min1 * (totalTime - 180);
                    calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 180) + "min)";
                }
            } else if ((h1 * 2) / min1 <= totalTime && h1 * 2 < h1 + (totalTime - 60) * min1) {
                ridePrice = h1 * 2;
                calcBreakDown = "1 Hour Package (" + h1 + "€) * 2";
                if (totalTime > 120) {
                    ridePrice += min1 * (totalTime - 120);
                    calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 120) + "min)";
                }
            } else if (h1 / min1 <= totalTime) {
                ridePrice = h1;
                calcBreakDown = "1 Hour Package (" + h1 + "€)";
                if (totalTime > 60) {
                    ridePrice += min1 * (totalTime - 60);
                    calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 60) + "min)";
                }
            } else {
                ridePrice = (totalTime * min1);
                calcBreakDown = "(" + totalTime + "min" + " * " + min1 + "€)";
                tariffName = "Pay As You Go";
            }
            if (ridePrice < minimumTripPrice) {
                ridePrice = minimumTripPrice;
                calcBreakDown = "Minimum trip price: " + minimumTripPrice + "€";
            }
            calculatedPrices.push([ridePrice.toFixed(2), company, "Renault Zoe", tariffName, "Hatchback", "Electric", calcBreakDown]);
        
        }

        // Citybee Calculations
        if (company === "Citybee" && carModel !== "Toyota Yaris Cross" && carModel !== "VW T-Roc" && carModel !== "Toyota Rav4" && carModel !== "Hyundai i20" && carModel !== "Renault Clio" && carModel !== "Skoda Fabia" && carModel !== "Toyota Yaris" && carModel !== "Renault Captur" && carModel !== "Renault Captur" && carModel !== "Toyota Corolla Crossover" && carModel !== "VW Tiguan Diesel" && carModel !== "Nissan Juke" && carModel !== "MAN TGE") {
            // Citybee hardcoded prices
            if (carModel === "VW T-Cross" || carModel === "Seat Ateca" || carModel === "Opel Crossland" || carModel === "VW Taigo" || carModel === "Toyota C-HR" || carModel === "Opel Mokka" || carModel === "Ford Focus Wagon" || carModel === "Ford Puma" || carModel === "Peugeot 308" || carModel === "Ford Focus" || carModel === "Toyota Corolla" || carModel === "Toyota Corolla Touring" || carModel === "Renault Arkana" || carModel === "Skoda Kamiq") {
                min1 = 0.12; h1 = 4.99; day1 = 19.99; km1 = 0.26;
            } else if (carModel === "Nissan Qashqai" || carModel === "Jeep Compass" || carModel === "VW T-Roc R-Line" || carModel === "BMW 118i" || carModel === "Ford Kuga" || carModel === "Skoda Karoq") {
                min1 = 0.17; h1 = 6.99; day1 = 23.99; km1 = 0.28;
            } else if (carModel === "Kia Sportage" || carModel === "VW Tiguan") {
                min1 = 0.22; h1 = 11.99; day1 = 39.99; km1 = 0.29;
            } else if (carModel === "Renault Master" || carModel === "Ford Transit") {
                min1 = 0.16; h1 = 8.90; day1 = 39.90; km1 = 0.28;
            }

            var calcBreakDown = "";
            var totalTime = time + waitTime;
            minimumTripPrice = 2.29;
            tripStartFee = 0.50;
            tariffName = "Pay as you go";

            if (((day1) / h1) * 60 <= totalTime && day1 < h1 * 5 + (totalTime - 300) * min1) {
                ridePrice = tripStartFee + day1 + (distance * km1);
                calcBreakDown = "Trip start fee (0.50€) + 1 Day (" + day1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
            } else if ((h1 * 5) / min1 <= totalTime && h1 * 5 < h1 * 4 + (totalTime - 240) * min1) {
                ridePrice = tripStartFee + (h1 * 5) + (distance * km1);
                calcBreakDown = "Trip start fee (0.50€) + 5 * 1 Hour (" + h1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
                if (totalTime > 300) {
                    ridePrice += min1 * (totalTime - 300);
                    calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 300) + "min)";
                }
            } else if ((h1 * 4) / min1 <= totalTime && h1 * 4 < h1 * 3 + (totalTime - 180) * min1) {
                ridePrice = tripStartFee + (h1 * 4) + (distance * km1);
                calcBreakDown = "Trip start fee (0.50€) + 4 * 1 Hour (" + h1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
                if (totalTime > 240) {
                    ridePrice += min1 * (totalTime - 240);
                    calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 240) + "min)";
                }
            } else if ((h1 * 3) / min1 <= totalTime && h1 * 3 < h1 * 2 + (totalTime - 120) * min1) {
                ridePrice = tripStartFee + (h1 * 3) + (distance * km1);
                calcBreakDown = "Trip start fee (0.50€) + 3 * 1 Hour (" + h1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
                if (totalTime > 180) {
                    ridePrice += min1 * (totalTime - 180);
                    calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 180) + "min)";
                }
            } else if ((h1 * 2) / min1 <= totalTime && h1 * 2 < h1 + (totalTime - 60) * min1) {
                ridePrice = tripStartFee + (h1 * 2) + (distance * km1);
                calcBreakDown = "Trip start fee (0.50€) + 2 * 1 Hour (" + h1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
                if (totalTime > 120) {
                    ridePrice += min1 * (totalTime - 120);
                    calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 120) + "min)";
                }
            } else if (h1 / min1 <= totalTime) {
                ridePrice = tripStartFee + h1 + (distance * km1);
                calcBreakDown = "Trip start fee (0.50€) + 1 Hour (" + h1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
                if (totalTime > 60) {
                    ridePrice += min1 * (totalTime - 60);
                    calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 60) + "min)";
                }
            } else {
                ridePrice = tripStartFee + (totalTime * min1) + (distance * km1);
                calcBreakDown = "Trip start fee (0.50€) + (" + totalTime + "min" + " * " + min1 + "€) + (" + distance + "km" + " * " + km1 + "€)";
            }
            if (ridePrice < minimumTripPrice) {
                ridePrice = minimumTripPrice;
                calcBreakDown = "Minimum trip price: " + minimumTripPrice + "€";
            }

            if (!cityBeeCarsSaved.includes(carModel)) {
                calculatedPrices.push([ridePrice.toFixed(2), company, carModel, tariffName, carType, fuelType, calcBreakDown]);
                cityBeeCarsSaved.push(carModel);
            }
        }

        // Bolt Drive Price Calculations
        if (company === "Bolt Drive") {

            // wait time and drive time price is identical, day/night time doesnt affect the price, combining it into single variable
            var totalTime = time + waitTime;
            var calcBreakDown = "";

            if (((day1) / h1) * 60 <= totalTime && day1 < h1 * 5 + (totalTime - 300) * min1) {
                ridePrice = day1 + (distance * km1);
                calcBreakDown = "1 Day (" + day1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
            } else if ((h1 * 5) / min1 <= totalTime && h1 * 5 < h1 * 4 + (totalTime - 240) * min1) {
                ridePrice = (h1 * 5) + (distance * km1);
                calcBreakDown = "5 * 1 Hour (" + h1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
                if (totalTime > 300) {
                    ridePrice += min1 * (totalTime - 300);
                    calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 300) + "min)";
                }
            } else if ((h1 * 4) / min1 <= totalTime && h1 * 4 < h1 * 3 + (totalTime - 180) * min1) {
                ridePrice = (h1 * 4) + (distance * km1);
                calcBreakDown = "4 * 1 Hour (" + h1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
                if (totalTime > 240) {
                    ridePrice += min1 * (totalTime - 240);
                    calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 240) + "min)";
                }
            } else if ((h1 * 3) / min1 <= totalTime && h1 * 3 < h1 * 2 + (totalTime - 120) * min1) {
                ridePrice = (h1 * 3) + (distance * km1);
                calcBreakDown = "3 * 1 Hour (" + h1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
                if (totalTime > 180) {
                    ridePrice += min1 * (totalTime - 180);
                    calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 180) + "min)";
                }
            } else if ((h1 * 2) / min1 <= totalTime && h1 * 2 < h1 + (totalTime - 60) * min1) {
                ridePrice = (h1 * 2) + (distance * km1);
                calcBreakDown = "2 * 1 Hour (" + h1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
                if (totalTime > 120) {
                    ridePrice += min1 * (totalTime - 120);
                    calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 120) + "min)";
                }
            } else if (h1 / min1 <= totalTime) {
                ridePrice = h1 + (distance * km1);
                calcBreakDown = "1 Hour (" + h1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
                if (totalTime > 60) {
                    ridePrice += min1 * (totalTime - 60);
                    calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 60) + "min)";
                }
            } else {
                ridePrice = (totalTime * min1) + (distance * km1);
                calcBreakDown = "(" + totalTime + "min" + " * " + min1 + "€) + (" + distance + "km" + " * " + km1 + "€)";
            }
            if (ridePrice < minimumTripPrice) {
                ridePrice = minimumTripPrice;
                calcBreakDown = "Minimum trip price: " + minimumTripPrice + "€";
            }
            calculatedPrices.push([ridePrice.toFixed(2), company, carModel, tariffName, carType, fuelType, calcBreakDown]);
        }

        // Carguru Price Calculations
        if (company === "Carguru") {

            var totalTime = time + waitTime - totalNightWaitTime;
            console.log(totalNightWaitTime);
            var calcBreakDown = "";

            if (tariffName.trim() === "Basic") {

                if (distance > 100) {
                    adjustedDistance = distance - 100;
                } else {
                    adjustedDistance = 0;
                }

                if ((day1 * 180) / h3 <= totalTime && day1 < h3 + h1 * 2 + (totalTime - 300) * min1) {
                    ridePrice = day1 + (adjustedDistance * km1);
                    calcBreakDown = "1 Day (" + day1 + "€) + " + "(" + adjustedDistance.toFixed() + "km¹" + " * " + km1 + "€)" + "<br>¹<i>Daily 100km included in tariff</i>";
                } else if ((h3 + h1 * 2) / min1 <= totalTime && h3 + h1 * 2 < h3 + h1 + (totalTime - 240) * min1) {
                    ridePrice = h3 + h1 * 2 + (adjustedDistance * km1);
                    calcBreakDown = "3 Hours (" + h3 + "€) + " + "2 * 1 Hour (" + h1 + "€)" + " + (" + adjustedDistance.toFixed() + "km¹" + " * " + km1 + "€)";
                    if (totalTime > 300) {
                        ridePrice += min1 * (totalTime - 300);
                        calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 300) + "min)";
                    }
                    calcBreakDown += "<br>¹<i>Daily 100km included in tariff</i>";
                } else if ((h3 + h1) / min1 <= totalTime && h3 + h1 < h3 + (totalTime - 180) * min1) {
                    ridePrice = h3 + h1 + (adjustedDistance * km1);
                    calcBreakDown = "3 Hours (" + h3 + "€) + " + "1 Hour (" + h1 + "€)" + " + (" + adjustedDistance.toFixed() + "km¹" + " * " + km1 + "€)";
                    if (totalTime > 240) {
                        ridePrice += min1 * (totalTime - 240);
                        calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 240) + "min)";
                    }
                    calcBreakDown += "<br>¹<i>Daily 100km included in tariff</i>";
                } else if (h3 / min1 <= totalTime && h3 < h1 * 2 + (totalTime - 120) * min1) {
                    ridePrice = h3 + (adjustedDistance * km1);
                    calcBreakDown = "3 Hours (" + h3 + "€)" + " + (" + adjustedDistance.toFixed() + "km¹" + " * " + km1 + "€)";
                    if (totalTime > 180) {
                        ridePrice += min1 * (totalTime - 180);
                        calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 180) + "min)";
                    }
                    calcBreakDown += "<br>¹<i>Daily 100km included in tariff</i>";
                } else if ((h1 * 2) / min1 <= totalTime && h1 * 2 < h1 + (totalTime - 60) * min1) {
                    ridePrice = (h1 * 2) + (adjustedDistance * km1);
                    calcBreakDown = "2 * 1 Hour (" + h1 + "€)" + " + (" + adjustedDistance.toFixed() + "km¹" + " * " + km1 + "€)";
                    if (totalTime > 120) {
                        ridePrice += min1 * (totalTime - 120);
                        calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 120) + "min)";
                    }
                    calcBreakDown += "<br>¹<i>Daily 100km included in tariff</i>";
                } else if (h1 / min1 <= totalTime) {
                    ridePrice = h1 + (adjustedDistance * km1);
                    calcBreakDown = "1 Hour (" + h1 + "€)" + " + (" + adjustedDistance.toFixed() + "km¹" + " * " + km1 + "€)";
                    if (totalTime > 60) {
                        ridePrice += min1 * (totalTime - 60);
                        calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 60) + "min)";
                    }
                    calcBreakDown += "<br>¹<i>Daily 100km included in tariff</i>";
                } else {
                    ridePrice = (totalTime * min1) + (adjustedDistance * km1);
                    calcBreakDown = "(" + totalTime + "min" + " * " + min1 + "€) + (" + adjustedDistance.toFixed() + "km¹" + " * " + km1 + "€)<br>¹<i>Daily 100km included in tariff</i>";
                }

                if (totalNightWaitTime > 0) {
                    calcBreakDown += "<br>Free Night Time Wait (" + totalNightWaitTime + "min)";
                }

                if (ridePrice < minimumTripPrice) {
                    ridePrice = minimumTripPrice;
                    calcBreakDown = "Minimum trip price: " + minimumTripPrice + "€";
                }
                calculatedPrices.push([ridePrice.toFixed(2), company, carModel, tariffName.trim(), carType, fuelType, calcBreakDown]);
            }

            if (tariffName.trim() === "Split Basic") {
                if ((day1 * 60) / h1 <= totalTime && day1 < h1 * 5 + (totalTime - 300) * min1) {
                    ridePrice = day1 + (distance * km1);
                    calcBreakDown = "1 Day (" + day1 + "€) + " + "(" + distance.toFixed() + "km" + " * " + km1 + "€)";
                } else if (h1 * 5 / min1 <= totalTime && h1 * 5 < h1 * 4 + (totalTime - 240) * min1) {
                    ridePrice = h1 * 5 + (distance * km1);
                    calcBreakDown = "5 * 1 Hour (" + h1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
                    if (totalTime > 300) {
                        ridePrice += min1 * (totalTime - 300);
                        calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 300) + "min)";
                    }
                } else if (h1 * 4 / min1 <= totalTime && h1 * 4 < h1 * 3 + (totalTime - 180) * min1) {
                    ridePrice = h1 * 4 + (distance * km1);
                    calcBreakDown = "4 * 1 Hour (" + h1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
                    if (totalTime > 240) {
                        ridePrice += min1 * (totalTime - 240);
                        calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 240) + "min)";
                    }
                } else if (h1 * 3 / min1 <= totalTime && h1 * 3 < h1 * 2 + (totalTime - 120) * min1) {
                    ridePrice = (h1 * 3) + (distance * km1);
                    calcBreakDown = "3 * 1 Hour (" + h1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
                    if (totalTime > 180) {
                        ridePrice += min1 * (totalTime - 180);
                        calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 180) + "min)";
                    }
                } else if ((h1 * 2) / min1 <= totalTime && h1 * 2 < h1 + (totalTime - 60) * min1) {
                    ridePrice = (h1 * 2) + (distance * km1);
                    calcBreakDown = "2 * 1 Hour (" + h1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
                    if (totalTime > 120) {
                        ridePrice += min1 * (totalTime - 120);
                        calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 120) + "min)";
                    }
                } else if (h1 / min1 <= totalTime) {
                    ridePrice = h1 + (distance * km1);
                    calcBreakDown = "1 Hour (" + h1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
                    if (totalTime > 60) {
                        ridePrice += min1 * (totalTime - 60);
                        calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 60) + "min)";
                    }
                } else {
                    ridePrice = (totalTime * min1) + (distance * km1);
                    calcBreakDown = "(" + totalTime + "min" + " * " + min1 + "€) + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
                }

                if (totalNightWaitTime > 0) {
                    calcBreakDown += "<br>Free Night Time Wait (" + totalNightWaitTime + "min)";
                }

                if (ridePrice < minimumTripPrice) {
                    ridePrice = minimumTripPrice;
                    calcBreakDown = "Minimum trip price: " + minimumTripPrice + "€";
                }
                calculatedPrices.push([ridePrice.toFixed(2), company, carModel, tariffName.trim(), carType, fuelType, calcBreakDown]);
            }
        }



        // OXDrive Price Calculations
        if (company === "OXDrive") {

            // wait time and drive time price is identical, day/night time doesnt affect the price, combining it into single variable
            var totalTime = time + waitTime;
            var calcBreakDown = "";

            if ((day1 / h1) * 60 <= totalTime && day1 < h1 * 6 + (totalTime - 360) * min1) {
                ridePrice = day1 + (distance * km1);
                calcBreakDown = "1 Day (" + day1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
            } else if ((h1 * 6) / min1 <= totalTime && h1 * 6 < h1 * 5 + (totalTime - 300) * min1) {
                ridePrice = (h1 * 6) + (distance * km1);
                calcBreakDown = "6 * 1 Hour (" + h1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
                if (totalTime > 360) {
                    ridePrice += min1 * (totalTime - 360);
                    calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 360) + "min)";
                }
            } else if ((h1 * 5) / min1 <= totalTime && h1 * 5 < h1 * 4 + (totalTime - 240) * min1) {
                ridePrice = (h1 * 5) + (distance * km1);
                calcBreakDown = "5 * 1 Hour (" + h1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
                if (totalTime > 300) {
                    ridePrice += min1 * (totalTime - 300);
                    calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 300) + "min)";
                }
            } else if ((h1 * 4) / min1 <= totalTime && h1 * 4 < h1 * 3 + (totalTime - 180) * min1) {
                ridePrice = (h1 * 4) + (distance * km1);
                calcBreakDown = "4 * 1 Hour (" + h1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
                if (totalTime > 240) {
                    ridePrice += min1 * (totalTime - 240);
                    calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 240) + "min)";
                }
            } else if ((h1 * 3) / min1 <= totalTime && h1 * 3 < h1 * 2 + (totalTime - 120) * min1) {
                ridePrice = (h1 * 3) + (distance * km1);
                calcBreakDown = "3 * 1 Hour (" + h1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
                if (totalTime > 180) {
                    ridePrice += min1 * (totalTime - 180);
                    calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 180) + "min)";
                }
            } else if ((h1 * 2) / min1 <= totalTime && h1 * 2 < h1 + (totalTime - 60) * min1) {
                ridePrice = (h1 * 2) + (distance * km1);
                calcBreakDown = "2 * 1 Hour (" + h1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
                if (totalTime > 120) {
                    ridePrice += min1 * (totalTime - 120);
                    calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 120) + "min)";
                }
            } else if (h1 / min1 <= totalTime) {
                ridePrice = h1 + (distance * km1);
                calcBreakDown = "1 Hour (" + h1 + "€)" + " + (" + distance.toFixed() + "km" + " * " + km1 + "€)";
                if (totalTime > 60) {
                    ridePrice += min1 * (totalTime - 60);
                    calcBreakDown += " + (" + min1 + "€ * " + (totalTime - 60) + "min)";
                }
            } else {
                ridePrice = (totalTime * min1) + (distance * km1);
                calcBreakDown = "(" + totalTime + "min" + " * " + min1 + "€) + (" + distance + "km" + " * " + km1 + "€)";
            }
            calculatedPrices.push([ridePrice.toFixed(2), company, carModel, tariffName, carType, fuelType, calcBreakDown]);
        }
    });

    sortedCarPrices = calculatedPrices.sort((a, b) => a[0] - b[0]);

    // loading images
    for (let i = 0; i < sortedCarPrices.length; i++) {
        var carImageDisplay = "";
        var logoImageDisplay = "";

        switch (sortedCarPrices[i][2]) {
            case "Toyota Yaris": carImageDisplay = "<img src=" + "images/cars/toyota-yaris.png" + ">"; break;
            case "Audi A1": carImageDisplay = "<img src=" + "images/cars/audi-a1.png" + ">"; break;
            case "Peugot 208": carImageDisplay = "<img src=" + "images/cars/peugeot-208.png" + ">"; break;
            case "Skoda Fabia": carImageDisplay = "<img src=" + "images/cars/skoda-fabia.png" + ">"; break;
            case "Toyota Corolla": carImageDisplay = "<img src=" + "images/cars/toyota-corolla.png" + ">"; break;
            case "Audi A3": carImageDisplay = "<img src=" + "images/cars/audi-a3.png" + ">"; break;
            case "Hyundai Bayon": carImageDisplay = "<img src=" + "images/cars/hyundai-bayon.png" + ">"; break;
            case "Peugeot 2008": carImageDisplay = "<img src=" + "images/cars/peugeot-2008.png" + ">"; break;
            case "Audi Q2": carImageDisplay = "<img src=" + "images/cars/audi-q2.png" + ">"; break;
            case "Toyota Yaris Cross": carImageDisplay = "<img src=" + "images/cars/toyota-yaris-cross.png" + ">"; break;
            case "VW T-Cross": carImageDisplay = "<img src=" + "images/cars/vw-t-cross.png" + ">"; break;
            case "Toyota C-HR": carImageDisplay = "<img src=" + "images/cars/toyota-c-hr.png" + ">"; break;
            case "Opel Crossland": carImageDisplay = "<img src=" + "images/cars/opel-crossland.png" + ">"; break;
            case "Audi A5": carImageDisplay = "<img src=" + "images/cars/audi-a5.png" + ">"; break;
            case "Audi A4": carImageDisplay = "<img src=" + "images/cars/audi-a4.png" + ">"; break;
            case "Audi A4": carImageDisplay = "<img src=" + "images/cars/audi-a4.png" + ">"; break;
            case "BMW 4 Convertible": carImageDisplay = "<img src=" + "images/cars/bmw-4-convertible.png" + ">"; break;
            case "VW T-Roc Cabrio": carImageDisplay = "<img src=" + "images/cars/vw-t-roc-cabrio.png" + ">"; break;
            case "Audi e-tron": carImageDisplay = "<img src=" + "images/cars/audi-e-tron.png" + ">"; break;
            case "Toyota Land Cruiser": carImageDisplay = "<img src=" + "images/cars/toyota-land-cruiser.png" + ">"; break;
            case "VW Crafter": carImageDisplay = "<img src=" + "images/cars/vw-crafter.png" + ">"; break;
            case "Toyota Rav4": carImageDisplay = "<img src=" + "images/cars/toyota-rav4.png" + ">"; break;
            case "Nissan Qashqai": carImageDisplay = "<img src=" + "images/cars/nissan-qashqai.png" + ">"; break;
            case "VW Passat": carImageDisplay = "<img src=" + "images/cars/vw-passat.png" + ">"; break;
            case "Nissan Juke": carImageDisplay = "<img src=" + "images/cars/nissan-juke.png" + ">"; break;
            case "Tesla Model 3 Standard Range +": carImageDisplay = "<img src=" + "images/cars/tesla-model-3.png" + ">"; break;
            case "Tesla Model 3 Long Range": carImageDisplay = "<img src=" + "images/cars/tesla-model-3.png" + ">"; break;
            case "Tesla Model 3 Performance": carImageDisplay = "<img src=" + "images/cars/tesla-model-3.png" + ">"; break;
            case "Tesla Model Y Standard Range": carImageDisplay = "<img src=" + "images/cars/tesla-model-y.png" + ">"; break;
            case "Tesla Model Y Long Range": carImageDisplay = "<img src=" + "images/cars/tesla-model-y.png" + ">"; break;
            case "Tesla Model Y Performance": carImageDisplay = "<img src=" + "images/cars/tesla-model-y.png" + ">"; break;
            case "Tesla Model S Standard Range": carImageDisplay = "<img src=" + "images/cars/tesla-model-y.png" + ">"; break;
            case "Tesla Model Y Long Range": carImageDisplay = "<img src=" + "images/cars/tesla-model-s.png" + ">"; break;
            case "Tesla Model S Performance": carImageDisplay = "<img src=" + "images/cars/tesla-model-s.png" + ">"; break;
            case "Tesla Model X Performance": carImageDisplay = "<img src=" + "images/cars/tesla-model-x.png" + ">"; break;
            case "Skoda Kamiq": carImageDisplay = "<img src=" + "images/cars/skoda-kamiq.png" + ">"; break;
            case "BMW 118i": carImageDisplay = "<img src=" + "images/cars/bmw-118i.png" + ">"; break;
            case "Jeep Compass": carImageDisplay = "<img src=" + "images/cars/jeep-compass.png" + ">"; break;
            case "Ford Focus Wagon": carImageDisplay = "<img src=" + "images/cars/ford-focus-wagon.png" + ">"; break;
            case "Ford Focus": carImageDisplay = "<img src=" + "images/cars/ford-focus.png" + ">"; break;
            case "VW Taigo": carImageDisplay = "<img src=" + "images/cars/vw-taigo.png" + ">"; break;
            case "Seat Ateca": carImageDisplay = "<img src=" + "images/cars/seat-ateca.png" + ">"; break;
            case "Peugeot 308": carImageDisplay = "<img src=" + "images/cars/peugeot-308.png" + ">"; break;
            case "Skoda Karoq": carImageDisplay = "<img src=" + "images/cars/skoda-karoq.png" + ">"; break;
            case "Ford Puma": carImageDisplay = "<img src=" + "images/cars/ford-puma.png" + ">"; break;
            case "Toyota Corolla Touring": carImageDisplay = "<img src=" + "images/cars/toyota-corolla-touring.png" + ">"; break;
            case "Opel Mokka": carImageDisplay = "<img src=" + "images/cars/opel-mokka.png" + ">"; break;
            case "VW T-Roc R-Line": carImageDisplay = "<img src=" + "images/cars/vw-t-roc-r-line.png" + ">"; break;
            case "Kia Sportage": carImageDisplay = "<img src=" + "images/cars/kia-sportage.png" + ">"; break;
            case "Ford Kuga": carImageDisplay = "<img src=" + "images/cars/ford-kuga.png" + ">"; break;
            case "Renault Arkana": carImageDisplay = "<img src=" + "images/cars/renault-arkana.png" + ">"; break;
            case "VW Tiguan": carImageDisplay = "<img src=" + "images/cars/vw-tiguan.png" + ">"; break;
            case "Renault Master": carImageDisplay = "<img src=" + "images/cars/renault-master.png" + ">"; break;
            case "Ford Transit": carImageDisplay = "<img src=" + "images/cars/ford-transit.png" + ">"; break;
            case "Renault Zoe": carImageDisplay = "<img src=" + "images/cars/renault-zoe.png" + ">"; break;
        }

        switch (sortedCarPrices[i][1]) {
            case "Carguru": logoImageDisplay = "<img src=" + "images/logos/carguru-logo.png" + ">"; break;
            case "Citybee": logoImageDisplay = "<img src=" + "images/logos/citybee-logo.png" + ">"; break;
            case "Bolt Drive": logoImageDisplay = "<img src=" + "images/logos/bolt-logo.png" + ">"; break;
            case "OXDrive": logoImageDisplay = "<img src=" + "images/logos/oxdrive-logo.png" + ">"; break;
            case "Fiqsy": logoImageDisplay = "<img src=" + "images/logos/fiqsy-logo.png" + ">"; break;
        }



        const resultCard = document.createElement("div");
        resultCard.setAttribute("class", "resultOutputCard");

        resultCard.innerHTML = '<div class="resultHeader">' + '<p class="carModel">' + sortedCarPrices[i][2] + '</p>' + '<div class="serviceLogo">' + logoImageDisplay + '</div>' + '</div>'
            + '<div class="resultBody">' + '<div class="carImage">' + carImageDisplay + '</div>' + '<div class="carPrice">' + '<p class="price">' + sortedCarPrices[i][0] + '€</p>' + '<p class="breakdown">' + sortedCarPrices[i][6] + '</p>' + '</div>' + '</div>'
            + '<div class="resultFooter">' + '<div class="tagContainer">' + '<div class="tag">' + sortedCarPrices[i][4] + '</div>' + '<div class="tag">' + sortedCarPrices[i][5] + '</div>' + '<div class="packageTag">' + sortedCarPrices[i][3] + '</div>' + '</div>' + '</div>';

        const resultContainer = document.getElementById('resultContainer');
        resultContainer.appendChild(resultCard);
    }

    document.getElementById("resultContainer").scrollIntoView();

}

