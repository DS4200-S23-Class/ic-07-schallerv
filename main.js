const HEIGHT = 400;
const WIDTH = 400;
const MARGIN = {left: 50, right: 50, top: 50, bottom: 50}

const FRAME = 
d3.select("vis")
  .append("svg")
    .attr("height", HEIGHT)
    .attr("width", WIDTH)
    .attr("class", "frame");

const data = [55000, 48000, 27000, 66000, 90000]

// find max y
const MAX_Y = d3.max(data, (d) => { return d; }); 
console.log("Max Y: " +MAX_Y);  

// Now, define scale functions that maps our data values 
// (domain) to pixel values (range)
const Y_SCALE = d3.scaleLinear() // linear scale because we have 
                              // linear data 
                  .domain([0, (MAX_Y + 10000)]) // add some padding  
                  .range([0, WIDTH]); 

console.log("Input: 40000, Y_SCALE output: " + Y_SCALE(40000));

// Now, we can use X_SCALE to plot our points
FRAME3.selectAll("points")  
    .data(data)  
    .enter()       
    .append("circle")  
      .attr("cy", (d) => { return (Y_SCALE(d) + MARGINS.top); }) 
      .attr("cx", MARGINS.left) 
      .attr("r", 20)
      .attr("class", "point"); 

// We can also use X_SCALE to add an axis to the vis  
FRAME3.append("g") // g is a "placeholder" svg
      .attr("transform", "translate(" + MARGINS.top + 
            "," + (HEIGHT + MARGINS.left) + ")") //moves axis 
                                                    // within margins 
      .call(d3.axisBottom(Y_SCALE).ticks(4)) // function for generating axis  
        .attr("font-size", '20px'); // set font size