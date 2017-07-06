$(function () {
    var batData = window.__BATMAN_DATA__;
    var superData = window.__SUPERMAN_DATA__["items"];
    var dataArr = [];

    parseData();
    buildUi();
    displayControl();

    function parseData() {
        for(var i in superData){
            var obj = {};
            for(var j in superData[i]){
                obj[j] = superData[i][j];
            }
            dataArr.push(obj);
        }

        for(var i in batData) {
            var obj = {};
            obj["address"] = i;
            obj["price"] = batData[i]["cost"].replace(/,/g, '');
            obj["beds"] = batData[i]["beds"];
            obj["baths"] = batData[i]["baths"];
            obj["sqft"] = batData[i]["sq_ft"];
            obj["thumb"] = batData[i]["img"];
            obj["url"] = batData[i]["url"];
            dataArr.push(obj);
        }
    }
    function buildUi() {
        $(".container").append("<div class='pt-3 pb-3'><h3>Awesome Listing Widget</h3><button class='btn btn-green' id='price'>Price</button> <button class='btn btn-green' id='beds'>Beds</button> <button class='btn btn-green' id='sqft'>Sq. ft.</button> </div>");
        //default sort by price
        dataArr.sort(function(a,b) {
            return parseInt(a["price"]) - parseInt(b["price"]);
        });
        $("#price").addClass('active');
        var container = document.createElement("div");
        container.id = "dataContainer";
        container.className += "row";
        setTimeout(buildList,0);
        $(".container").append(container);
    }
    function buildList() {
        var container = $("#dataContainer");
        container.empty();
        for (var i in dataArr){
            var str = "<div class='col-sm-6 col-12 pb-5'><div class='card item'>";
            str += "<div class='row'>";
            str += "<div class='col-lg-4 col-12'><a href = '"+ dataArr[i]["url"] + "'><img class='thumb' src ='" + dataArr[i]["thumb"] + "'/></a></div>";
            str += "<div class='col-lg-8 col-12'>";
            if(dataArr[i]["built"] !== undefined){
                str += "<p class='built'>Built in " + dataArr[i]["built"] + "</p>";
            }
            str += "<h3 class='text-primary pt-3'>" + dataArr[i]["address"] + "</h3>";
            str += "<h2>$" + parseInt(dataArr[i]["price"],10).toLocaleString() + "</h2>";
            str += "<p>" + dataArr[i]["beds"] + " beds • " + dataArr[i]["baths"] + " baths • " + dataArr[i]["sqft"] + " sq ft";
            str += "</div></div>";
            str += "</div></div>";
            container.append(str);
        }
    }
    function displayControl() {
        $("button").on("click", function () {
            var i = this.id;
            dataArr.sort(function(a,b) {
                return parseInt(a[i]) - parseInt(b[i]);
            });
            setTimeout(buildList,0);
            $(this).addClass('active').siblings().removeClass('active');
        });
    }
});