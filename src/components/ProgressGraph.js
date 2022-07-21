import React, {useEffect, useRef} from 'react'
import * as d3 from 'd3';
import axios from 'axios'
import '../css/ProgressGraph.css'
import { svg } from 'd3';
function ProgressGraph() {
    const svgRef = useRef()
    var margin = {top: 20, right: 10, bottom: 20, left: 10};
    var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    useEffect(() => {
        axios.get('http://localhost:5000/workoutData', {
            params: {
                date: "all"
            }
        }).then((res)=>{
            const newData = res.data.map((el) => {
                const [month, day, year] = el.date.split('-')
                return {
                    date: new Date(+year, +month - 1, +day),
                    dateString: el.date,
                    activeVal: el.activeVal,
                    sets: +el.sets,
                    reps: +el.reps,
                    pr: +el.pr
                }
            }).sort((a,b)=> a.date-b.date)

            console.log(newData)
            let xScale = d3.scaleTime().domain([d3.min(newData, (function(d) {
                return d.date})), d3.max(newData, (function(d) { return d.date}))])
            .range([margin.left+60, width-margin.right])

            let yScale = d3.scaleLinear().domain([0, d3.max(newData, (function(d) {return d.pr*1}))])
            .range([height-10, 50])

            let line = d3.line().x(function(d) { return xScale(d.date)}).y(function(d) { return yScale(d.pr)})

            var xAxis = d3.axisBottom(xScale)

            var xAxisGrid = d3.axisBottom(xScale).tickSize(-height+60).tickFormat('')

            var yAxisGrid = d3.axisLeft(yScale).tickSize(-width+40).tickFormat('')

            var yAxis = d3.axisLeft(yScale)
            
            let svg = d3.select(svgRef.current)
            svg.append("g").attr("class", "graph").append("path").style("fill", "none").style("stroke", "red")
            .style("stroke-width", "4")
            .datum(newData).attr("class", "line")
            .attr("d", line);

            svg.append('g')
            .attr('class', 'x axis-grid')
            .attr('transform', `translate(0, ${height-10})`)
            .call(xAxisGrid);
            
            svg.append('g')
            .attr('class', 'y axis-grid')
            .attr('transform', `translate(${margin.left+60}, 0)`)
            .call(yAxisGrid)
            

            var hoverDiv = d3.select(".overall").append("div")
            .attr("class", "tooltip")	
            .style("display", "grid")			
            .style("opacity", 0)

            svg.append("g").attr("class", "titleContainer").append("text")
            .attr("class", "titleText").attr("x", width/2)
            .attr("y", margin.top)
            .attr("text-anchor", "middle")
            .style("font-size", "25px")
            .text("Progress Graph")

            svg.append("g").attr("class", "xAxisContainer").append("text")
            .attr("class", "xAxisText").attr("x", width/2)
            .attr("y", height+30)
            .attr("text-anchor", "middle")
            .style("font-size", "15px")
            .text("Workout Dates")

            svg.append("g").attr("class", "yAxisContainer").append("text")
            .attr("class", "yAxisText").attr("x", -height/2)
            .attr("y", 30)
            .attr("text-anchor", "middle")
            .style("font-size", "15px")
            .attr('transform',"rotate(-90)")
            .text("PRs")
            


            var circles = svg.selectAll("circle").data(newData).enter().append("circle")
            .attr("cx", function(d){return xScale(d.date)})
            .attr("cy", function(d){return yScale(d.pr)})
            .attr("r", 8)
            .style("fill", "red")

            circles
            .on("mouseover", function(event, data) {
                const e = circles.nodes();
                const ind = e.indexOf(this);
                d3.select(this).transition()
                        .duration(1)
                        .attr("r", 10);
                d3.select(this).style("cursor", "crosshair");
                let changeText = ''
                let percentColor = "#ffc40c"
                if (ind === 0) {
                    changeText = 'First PR'
                } else {
                    let percentChange = ((newData[ind].pr - newData[ind-1].pr) / newData[ind-1].pr)*100
                    percentChange = percentChange.toFixed(2)
                    if (percentChange < 0) {
                        changeText = `${Math.abs(percentChange)}% Decrease`
                        percentColor = "red"
                    } else if (percentChange > 0) {
                        changeText = `${percentChange}% Increase`
                        percentColor = "green"
                    } else {
                        changeText = "PR has not changed"
                    }
                }
                hoverDiv.transition()		
                .duration(200)		
                .style("opacity", .9);
                hoverDiv.html(`<div>${data.dateString}</div>
                <div className='tipWeight'>PR: ${data.pr}</div>
                <div className='tipPercent' style='color:${percentColor}'>${changeText}</div>`)
                .style("left", `${xScale(data.date)+16}px`)		
                .style("top", `${yScale(data.pr)+450}px`)
            }).on("mouseout", function(event){
                d3.select(this).transition()
                        .duration(1)
                        .attr("r", 8);
                d3.select(this).style("cursor", "default");
                hoverDiv.transition()		
                .duration(20)		
                .style("opacity", 0);
            })

            svg.append("g").attr('class', 'xAxis').attr("transform", `translate(0,${height-10})`)
            .call(xAxis)

            svg.append("g").attr('class', 'yAxis').attr("transform", "translate(70,0)")
            .call(yAxis)


        })
    }, [])
    return (
    <div className="overall">
        <svg width={width+margin.left+margin.right} height={height+margin.top+margin.bottom} ref={svgRef} className="graphContainer">

        </svg>
    </div>
    )
}
export default ProgressGraph