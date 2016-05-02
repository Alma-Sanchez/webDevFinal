/*global d3 */

//        displayWeightGraph = function (pData, xScale, yScale) {
//            
//            var height = 600,
//                width = 700,
//                zeroBarSize = 1;
//            
//            d3.select("#graph").append("svg")
//                .attr("width", width)
//                .attr("height", height)
//                .selectAll("rect").data(pData.data)
//              // Add a rect for each data item.
//              .enter().append("rect")
//                .style("fill", function (d) {
//                    // Green for positive values, red for negative.
//                    return d.weight > 0 ? "steelblue" : "#ff0000";
//                })
//                .attr("width", xScale.rangeBand())
//                .attr("height", function (d) {
//                        // Scale the width to fit the svg width.
//                        return Math.abs(yScale(d.weight));
//                    })
//                .attr("x", function (d, i) {
//                    return xScale(i);
//                })
//                .attr("y", function (d) {
//                    // X position dependent on sign of weight.
//                    if (d.weight < 0) {
//                        return height / 2 + zeroBarSize;
//                    }
//                    return height / 2 - Math.abs(yScale(d.weight));
//                })
//                .on("click", function (d) {
//                    d3.select("#tdName").text(d.name);
//                    d3.select("#tdClass").text(d.effect.class);
//                    d3.select("#tdType").text(d.effect.type);
//                    d3.select("#tdWeight").text(d.weight);
//                    d3.select("#direction").text(d.intentDirection);
//                });
//
//            // Create the zero bar.
//            d3.select("svg").append("rect")
//                .attr("height", zeroBarSize)
//                .attr("width", width)
//                .attr("y", function () {
//                    return height / 2;
//                })
//                .attr("fill", "black");
//        },

var GraphManager = (function () {
    "use strict";
    var manager = {},               // The object to return.
        width,
        height,
        data;
    
    manager.setData = function (pDataArray) {
        data = pDataArray;
    };
        
    return manager;
}());