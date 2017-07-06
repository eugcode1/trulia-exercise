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
        $("body").append("<div> <button class='btn btn-primary' id='price'>Price</button> <button class='btn btn-primary' id='beds'>Beds</button> <button class='btn btn-primary' id='sqft'>Sq. ft.</button> </div>");
        //default sort by price
        dataArr.sort(function(a,b) {
            return parseInt(a["price"]) - parseInt(b["price"]);
        });
        var container = document.createElement("div");
        container.id = "dataContainer";
        setTimeout(buildList,0);
        $("body").append(container);
    }
    function buildList() {
        var container = document.getElementById("dataContainer");
        container.innerHTML = '';
        for (var i in dataArr){
            var div = document.createElement("div");
            for (var j in dataArr[i]) {
                div.innerHTML += "<div>" + dataArr[i][j] + "</div>";
            }
            div.innerHTML += "******";
            container.appendChild(div);
        }

    }
    function displayControl() {
        $("button").on("click", function () {
            var i = this.id;
            dataArr.sort(function(a,b) {
                return parseInt(a[i]) - parseInt(b[i]);
            });
            setTimeout(buildList,0);
        });

    }
});