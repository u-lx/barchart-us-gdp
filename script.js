  let w = 1000;
  let h = 500;
  let padding = 80;


const svg = d3.select('svg')
  .attr("width", w)
  .attr('height', h)

const tooltip = d3.select('.info')
  .append('div')
  .attr('id', 'tooltip')
  .style('visibility', 'hidden')
  .text('-')

const tooltipB = d3.select('.info')
  .append('div')
  .attr('id', 'tooltip')
  .style('visibility', 'hidden')
  .text('-')

  fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(response => response.json())
    .then(data => {

      let json = data;
      let values = data.data;
      let dates = values.map(elem => new Date(elem[0]))

// Create Scales
      const xAxisScale = d3.scaleTime()
      .domain([d3.min(dates), d3.max(dates)])
      .range([padding, w-padding])

      const xScale = d3.scaleLinear()
      .domain([0, values.length])
      .range([padding, w-padding]);

      const yScale = d3.scaleLinear()
      .domain([0, d3.max(values, data => data[1])])
      .range([h-padding, padding])

// Draw Bars
      svg.selectAll('rect')
      .data(values)
      .enter()
      .append('rect')
      .attr('class','bar')
      .attr('x', (d,i) => xScale(i))
      .attr('y', d => yScale(d[1]))
      .attr('width', ((w-(2*padding)) / values.length))
      .attr('height', d => (h-padding) - yScale(d[1]))
      .attr('data-date', d=>d[0])
      .attr('data-gdp', d=>d[1])
      .on('mouseover', (e,d) => {

        tooltip.style('visibility','visible')
        .text(d[0])
        tooltipB.style('visibility','visible')
        .text('$'+d[1]+' Billion')

        document.getElementById('tooltip').setAttribute('data-date', d[0])
      })
      .on('mouseout', (e,d)=>{
        tooltip.style('visibility','hidden')
        tooltipB.style('visibility','hidden')
      })



// Draw Axes
      const xAxis = d3.axisBottom(xAxisScale);
      svg.append('g')
      .attr('transform', "translate(0," +(h-padding)+")")
      .attr('id', 'x-axis')
      .call(xAxis)

      const yAxis = d3.axisLeft(yScale)
        .tickFormat(d => `$${d}`)
        
      svg.append('g')
     .attr('transform',"translate("+padding+",0)")
     .attr('id', 'y-axis')
     .call(yAxis)



    })
