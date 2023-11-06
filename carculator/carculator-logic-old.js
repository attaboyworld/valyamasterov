var carData = JSON.parse(data);
var calculatedPrices = [];
var ridePrice;

loadCarData = () => {

    // clearing result card output
    let outputParent = document.getElementById("result-container");
    while (outputParent.firstChild) {
        outputParent.removeChild(outputParent.firstChild);
    }

    calculatedPrices = [];
    sortedCarPrices = [];

    // values from calculator form inputs
    var distance = parseInt(document.getElementById("distance").value);
    var time = parseFloat(document.getElementById("time").value);
    var waitTime = parseFloat(document.getElementById("waittime").value);

    carData.forEach(element => {
        
        // values from car data JSON file
        var company = element.Company;
        var carModel = element.CarModel;
        var type = element.Type;
        var tariffName = element.TariffName;
        var riskRate = element.RiskRate;
        var reducedFinancialResponsibility = element.ReducedFinancialResponsibility;
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
        var TripStartFee = parseFloat(element.TripStartFee);

        var recordExists = false;

        // checking if record already exists
        calculatedPrices.forEach(x => {
            if (x[1] === company && x[2] === carModel){
                recordExists = true;
            }
        })

        // Bolt Drive Price Calculations
        if (company === "Bolt Drive") {
            if (time < 60 && recordExists === false) { // if ride time is less than 1h
                ridePrice = (km1 * distance) + (min1 * time) + (waitTime1MinDayTime * waitTime);
                ridePrice = Math.round(ridePrice * 100) / 100;
                if (ridePrice < minimumTripPrice) {
                    ridePrice = minimumTripPrice;
                }
                calculatedPrices.push([ridePrice, company, carModel]);
            } else if (time > 60 && time < 1440 && recordExists === false){ // if ride time is greater than 1h
                ridePrice = ((time % 60) * min1) + (Math.floor(time / 60) * h1) + (km1 * distance) + (waitTime1MinDayTime * waitTime);
                ridePrice = Math.round(ridePrice * 100) / 100;
                if (ridePrice < minimumTripPrice) {
                    ridePrice = minimumTripPrice;
                }
                calculatedPrices.push([ridePrice, company, carModel]);
            }
        }

        // Carguru Price Calculations
        if (company === "Carguru") {
            if (time < 60 && recordExists === false) { // if ride time is less than 1h
                ridePrice = (km1 * distance) + (min1 * time) + (waitTime1MinDayTime * waitTime);
                ridePrice = Math.round(ridePrice * 100) / 100;
                if (ridePrice < minimumTripPrice) {
                    ridePrice = minimumTripPrice;
                }
                    calculatedPrices.push([ridePrice, company, carModel]);
                } else if (time > 60 && time < 180 && recordExists === false){ // if ride time is greater than 1h
                    ridePrice = ((time % 60) * min1) + (Math.floor(time / 60) * h1) + (km1 * distance) + (waitTime1MinDayTime * waitTime);
                    ridePrice = Math.round(ridePrice * 100) / 100;
                    if (ridePrice < minimumTripPrice) {
                        ridePrice = minimumTripPrice;
                    }              
                    calculatedPrices.push([ridePrice, company, carModel]);
                } else if (time > 180 && h3 > 0 && recordExists === false) { // if ride time is greater than 3h
                ridePrice = ((time % 180) * min1) + (Math.floor(time / 180) * h3) + (km1 * distance) + (waitTime1MinDayTime * waitTime);
                ridePrice = Math.round(ridePrice * 100) / 100;
                    if (ridePrice < minimumTripPrice) {
                        ridePrice = minimumTripPrice;
                    }
                    calculatedPrices.push([ridePrice, company, carModel]);
            } 
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
        }
        const resultCard = document.createElement("div");
        resultCard.setAttribute("class", "result-output-card");
        resultCard.innerHTML = carImageDisplay + '<p> EUR ' + sortedCarPrices[i][0] + ' | ' + sortedCarPrices[i][1] + ' | ' + sortedCarPrices[i][2] + '</p>'
        const resultContainer = document.getElementById('result-container');
        resultContainer.appendChild(resultCard);
    }

    document.getElementById("result-container").scrollIntoView();

}

