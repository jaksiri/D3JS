const data = [
  {
    location: "Nose",
    top: 32,
    left: 406,
    strikes: { total: 21305, day: 10709, night: 6383 },
    damage: { total: 1145, day: 539, night: 445 },
  },
  {
    location: "Windshield",
    top: 80,
    left: 406,
    strikes: { total: 24189, day: 12105, night: 7528 },
    damage: { total: 1037, day: 559, night: 346 },
  },
  {
    location: "LandingGear",
    top: 309,
    left: 406,
    strikes: { total: 8051, day: 4244, night: 3807 },
    damage: { total: 1012, day: 390, night: 430 },
  },
  {
    location: "Fuselage",
    top: 402,
    left: 406,
    strikes: { total: 17881, day: 8226, night: 9655 },
    damage: { total: 824, day: 367, night: 329 },
  },
  {
    location: "Engine1",
    top: 322,
    left: 286,
    strikes: { total: 9681, day: 4506, night: 1664 },
    damage: { total: 2515, day: 1173, night: 509 },
  },
  {
    location: "Engine2",
    top: 322,
    left: 531,
    strikes: { total: 7864, day: 3560, night: 1314 },
    damage: { total: 2023, day: 952, night: 378 },
  },
  {
    location: "Engine3",
    top: 418,
    left: 180,
    strikes: { total: 554, day: 238, night: 104 },
    damage: { total: 169, day: 71, night: 32 },
  },
  {
    location: "Engine4",
    top: 418,
    left: 633,
    strikes: { total: 334, day: 156, night: 52 },
    damage: { total: 74, day: 36, night: 11 },
  },
  {
    location: "Wing or Rotor",
    top: 418,
    left: 550,
    strikes: { total: 20746, day: 10849, night: 9897 },
    damage: { total: 4180, day: 2191, night: 1112 },
  },
  {
    location: "Tail",
    top: 765,
    left: 406,
    strikes: { total: 1956, day: 994, night: 480 },
    damage: { total: 727, day: 321, night: 226 },
  },
];

const VARIABLES = {
  width: 855,
  height: 977,
  padding: 400,
  offsetX: 35,
  offsetY: 35,
  scalingFactor: 100,
};

var day = true;

//Day-Night Toggle
document
  .getElementById("day-night-toggle")
  .addEventListener("change", function () {
    if (!this.checked) {
      //Change Strike and Damage Point Sizes
      points
        .select(".strikes-container")
        .select("circle")
        .transition()
        .duration("250")
        .attr("r", ({ strikes }) => `${strikes.day / VARIABLES.scalingFactor}`);
      points
        .select(".damage-container")
        .select("circle")
        .transition()
        .duration("250")
        .attr("r", ({ damage }) => `${damage.day / VARIABLES.scalingFactor}`);

      //Change Background
      bg.style("background-color", "#bde1ff8d").transition().duration("250");
      bgImg = d3
        .select("body")
        .append("rect")
        .attr("class", "bg-img")
        .transition()
        .duration("250")
        .style("background-image", "url(./day.png)");

      //Change Tooltip
      day = true;
    } else {
      //Change Strike and Damage Point Sizes
      points
        .select(".strikes-container")
        .select("circle")
        .transition()
        .duration("250")
        .attr(
          "r",
          ({ strikes }) => `${strikes.night / VARIABLES.scalingFactor}`
        );
      points
        .select(".damage-container")
        .select("circle")
        .transition()
        .duration("250")
        .attr("r", ({ damage }) => `${damage.night / VARIABLES.scalingFactor}`);

      //Change Background
      bg.style("background-color", "#3a51648d").transition().duration("250");
      bgImg = d3
        .select("body")
        .append("rect")
        .attr("class", "bg-img")
        .transition()
        .duration("250")
        .style("background-image", "url(./night.png)");
      //Change Tooltip
      day = false;
    }
  });

const container = d3.select("svg").classed("container", true);

const bg = d3.select("body").append("rect").attr("class", "background-fill");
const bgImg = d3
  .select("body")
  .append("rect")
  .attr("class", "bg-img")
  .style("background-image", "url(./day.png)");

const points = container
  .selectAll("g")
  .data(data)
  .join("g")
  .classed("points", true);

//Hover Popup
var div = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

//Strikes
const strikeCircle = points
  .append("g")
  .classed("strikes-container", true)
  .attr(
    "transform",
    ({ left, top }) =>
      `translate(${left + VARIABLES.offsetX}, ${top + VARIABLES.offsetY})`
  )
  .append("circle")
  .classed("strikes", true)
  .attr("r", ({ strikes }) => `${strikes.day / VARIABLES.scalingFactor}`);

//Damages
const dmgCircle = points
  .append("g")
  .classed("damage-container", true)
  .attr(
    "transform",
    ({ left, top }) =>
      `translate(${left + VARIABLES.offsetX}, ${top + VARIABLES.offsetY})`
  )
  .append("circle")
  .classed("damages", true)
  .attr("r", ({ damage }) => `${damage.day / VARIABLES.scalingFactor}`);

//Tooltip on Hover
points.on("mouseover", function (d, i) {
  div.transition().duration("120").style("opacity", "1");
  const tooltipContainer = div
    .html(i.location)
    .attr("class", "tooltip")
    .style("left", d.pageX + 10 + "px")
    .style("top", d.pageY - 15 + "px");

  if (day) {
    tooltipContainer
      .append("p")
      .attr("class", "tooltip-text")
      .text("Day Strikes: " + i.strikes.day);
    tooltipContainer
      .append("p")
      .attr("class", "tooltip-text")
      .text("Day Damages: " + i.damage.day);
  } else {
    tooltipContainer
      .append("p")
      .attr("class", "tooltip-text")
      .text("Night Strikes: " + i.strikes.night);
    tooltipContainer
      .append("p")
      .attr("class", "tooltip-text")
      .text("Night Damages: " + i.damage.night);
  }
});

points.on("mouseout", function (d, i) {
  d3.select(".tooltip").transition().duration("120").style("opacity", 0);
});
