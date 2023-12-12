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
    var time = parseFloat(document.getElementById("totalTime").innerHTML);
    var waitTime = parseFloat(document.getElementById("totalWait").innerHTML);

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
        var h2 = parseFloat(element.H2);
        var h3 = parseFloat(element.H3);
        var day1 = parseFloat(element.Day1);
        var day2 = parseFloat(element.Day2);
        var day3 = parseFloat(element.Day3);
        var day7 = parseFloat(element.Day7);
        var day7 = parseFloat(element.Day14);
        var day30 = parseFloat(element.Day30);
        var dailyKmIncludedWeekdays = parseFloat(element.DailyKmIncludedWeekdays);
        var dailyKmIncludedFrSun = parseFloat(element.DailyKmIncludedFrSun);
        var kmIncludedInTarif = parseFloat(element.KmIncludedInTarif);
        var additionalMin = parseFloat(element.AdditionalMin);
        var additionalKm = parseFloat(element.Additionalkm);
        var waitTime1MinDayTime = parseFloat(element.WaitTime1MinDayTime);
        var pricePerKmDayTime = parseFloat(element.PricePerKmDayTime);
        var pricePerKmNightTime = parseFloat(element.PricePerKmNightTime);
        var waitTime1MinNightTime = parseFloat(element.WaitTime1MinNightTime);
        var minimumTripPrice = parseFloat(element.MinimumTripPrice);
        var tripStartFee = parseFloat(element.TripStartFee);

        // Bolt Drive Price Calculations
        if (company === "Bolt Drive") {

            // wait time and drive time price is identical, day/night time doesnt affect the price, combining it into single variable
            var totalTime = time + waitTime;
            var calcBreakDown = "";

            if (((day1) / h1) * 60 <= totalTime && h1 * 6 < h1 * 5 + (totalTime - 300) * min1) {
                ridePrice = day1 + (distance * km1);
            } else if ((h1 * 5) / min1 <= totalTime && h1 * 5 < h1 * 4 + (totalTime - 240) * min1) {
                ridePrice = (h1 * 5) + (distance * km1);
                if (totalTime > 300) {
                    ridePrice += min1 * (totalTime - 300);
                }
            } else if ((h1 * 4) / min1 <= totalTime && h1 * 4 < h1 * 3 + (totalTime - 180) * min1) {
                ridePrice = (h1 * 4) + (distance * km1);
                if (totalTime > 240) {
                    ridePrice += min1 * (totalTime - 240);
                }
            } else if ((h1 * 3) / min1 <= totalTime && h1 * 3 < h1 * 2 + (totalTime - 120) * min1) {
                ridePrice = (h1 * 3) + (distance * km1);
                if (totalTime > 180) {
                    ridePrice += min1 * (totalTime - 180);
                }
            } else if ((h1 * 2) / min1 <= totalTime && h1 * 2 < h1 + (totalTime - 60) * min1) {
                ridePrice = (h1 * 2) + (distance * km1);
                if (totalTime > 120) {
                    ridePrice += min1 * (totalTime - 120);
                }
            } else if (h1 / min1 <= totalTime) {
                ridePrice = h1 + (distance * km1);
                if (totalTime > 60) {
                    ridePrice += min1 * (totalTime - 60);
                }
            } else {
                ridePrice = (totalTime * min1) + (distance * km1);
                calcBreakDown = "(" + totalTime + "min" + " * " + min1 + ") + (" + distance + "km" + " * " + km1 + ")";
            }
            if (ridePrice < minimumTripPrice) {
                ridePrice = minimumTripPrice;
            }
            calculatedPrices.push([ridePrice.toFixed(2), company, carModel, tariffName, carType, fuelType, calcBreakDown]);
        }

        // OXDrive Price Calculations
        if (company === "OXDrive") {

            // wait time and drive time price is identical, day/night time doesnt affect the price, combining it into single variable
            var totalTime = time + waitTime;
            var calcBreakDown = "";

            if ((day7 / day1) * 1440 <= totalTime && day7 < (day1 * Math.floor(totalTime / 1440)) * min1) {
                ridePrice = day7 + (distance * km1);
            } else if ((day1 / h1) * 60 <= totalTime && day1 < h1 * 6 + (totalTime - 360) * min1) {
                ridePrice = day1 + (distance * km1) + (day1 * Math.floor(totalTime / 1440));
            } else if ((h1 * 6) / min1 <= totalTime && h1 * 6 < h1 * 5 + (totalTime - 300) * min1) {
                ridePrice = (h1 * 6) + (distance * km1);
                if (totalTime > 360) {
                    ridePrice += min1 * (totalTime - 360);
                }
            } else if ((h1 * 5) / min1 <= totalTime && h1 * 5 < h1 * 4 + (totalTime - 240) * min1) {
                ridePrice = (h1 * 5) + (distance * km1);
                if (totalTime > 300) {
                    ridePrice += min1 * (totalTime - 300);
                }
            } else if ((h1 * 4) / min1 <= totalTime && h1 * 4 < h1 * 3 + (totalTime - 180) * min1) {
                ridePrice = (h1 * 4) + (distance * km1);
                if (totalTime > 240) {
                    ridePrice += min1 * (totalTime - 240);
                }
            } else if ((h1 * 3) / min1 <= totalTime && h1 * 3 < h1 * 2 + (totalTime - 120) * min1) {
                ridePrice = (h1 * 3) + (distance * km1);
                if (totalTime > 180) {
                    ridePrice += min1 * (totalTime - 180);
                }
            } else if ((h1 * 2) / min1 <= totalTime && h1 * 2 < h1 + (totalTime - 60) * min1) {
                ridePrice = (h1 * 2) + (distance * km1);
                if (totalTime > 120) {
                    ridePrice += min1 * (totalTime - 120);
                }
            } else if (h1 / min1 <= totalTime) {
                ridePrice = h1 + (distance * km1);
                if (totalTime > 60) {
                    ridePrice += min1 * (totalTime - 60);
                }
            } else {
                ridePrice = (totalTime * min1) + (distance * km1);
                calcBreakDown = "(" + totalTime + "min" + " * " + min1 + ") + (" + distance + "km" + " * " + km1 + ")";
            }
            calculatedPrices.push([ridePrice.toFixed(2), company, carModel, tariffName, carType, fuelType]);
        }

        // Beast Price Calculations
        if (company === "Beast" && tariffName !== "Beast+") {

            // wait time and drive time price is identical, day/night time doesnt affect the price, combining it into single variable
            var totalTime = time + waitTime;

            if (day1 / min1 <= totalTime) {
                ridePrice = tripStartFee + day1;
            } else {
                ridePrice = tripStartFee + (totalTime * min1);
            }
            calculatedPrices.push([ridePrice.toFixed(2), company, carModel, tariffName, carType, fuelType, calcBreakDown]);
        }

    });

    sortedCarPrices = calculatedPrices.sort((a, b) => a[0] - b[0]);

    // loading images
    for (let i = 0; i < sortedCarPrices.length; i++) {
        var carImageDisplay = "";
        switch(sortedCarPrices[i][2]){
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
                case "Model 3 Long Range": carImageDisplay = "<img src=" + "images/cars/tesla-model-3.png" + ">"; break;
                case "Model 3 Performance": carImageDisplay = "<img src=" + "images/cars/tesla-model-3.png" + ">"; break;
                case "Model Y Standard Range": carImageDisplay = "<img src=" + "images/cars/tesla-model-y.png" + ">"; break;
                case "Model Y Long Range": carImageDisplay = "<img src=" + "images/cars/tesla-model-y.png" + ">"; break;
                case "Model Y Performance": carImageDisplay = "<img src=" + "images/cars/tesla-model-y.png" + ">"; break;
                case "Model S Standard Range": carImageDisplay = "<img src=" + "images/cars/tesla-model-y.png" + ">"; break;
                case "Model Y Long Range": carImageDisplay = "<img src=" + "images/cars/tesla-model-s.png" + ">"; break;
                case "Model S Performance": carImageDisplay = "<img src=" + "images/cars/tesla-model-s.png" + ">"; break;
                case "Model X Performance": carImageDisplay = "<img src=" + "images/cars/tesla-model-x.png" + ">"; break;
        }

        const resultCard = document.createElement("div");
        resultCard.setAttribute("class", "resultOutputCard");

        resultCard.innerHTML = 
        '<div class="carImage">' + carImageDisplay + '<div class="tagContainer">' + '<div class="tag">' + sortedCarPrices[i][4] + '</div>' + '<div class="tag">' + sortedCarPrices[i][5] + '</div>' + '</div>' + '</div>'
        + '<div class="carInfo">' + '<p>' + sortedCarPrices[i][1] + '<br>' + "<span> (" + sortedCarPrices[i][3] + ')<br></span>' + sortedCarPrices[i][2] + '<br><br> <b>EUR ' + sortedCarPrices[i][0] + '</b><br>' + sortedCarPrices[i][6] + '</p></div>';
        
        const resultContainer = document.getElementById('resultContainer');
        resultContainer.appendChild(resultCard);
    }

    document.getElementById("resultContainer").scrollIntoView();

}

