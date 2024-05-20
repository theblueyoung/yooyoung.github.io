
let config = { // / enable responsiveness, allowing the plot to adjust its size based on the container.
    responsive: true,
};

const unpack = (data, key) => data.map(row => row[key]) // unpack function, got the codes from week 5 tutorial slide


// Chart 1. Trends in K-pop Interest Over Time

// plotly function that parses data from CSV file
Plotly.d3.csv('charts/chart1_trends.csv', chart1_csv => { //loading data

    const year_X = unpack(chart1_csv, 'year'); //extracting data
    const popularity_Y = unpack(chart1_csv, 'popularity'); //extracting data

    const trends_chart_data = [ // build the first chart, got the codes from week5 tutorial slide
        {
            x: year_X,
            y: popularity_Y,
            type: 'scatter',
            mode: 'lines',
            line: {
                color: "#000000",
            },
            hoverlabel: {
                font: { family: 'Verdana', size: 14 }, // styling the hover label to enhance readability
            },
        },
    ];

    const trends_chart_layout = {
        title: {
            text: '<i>Trends in K-pop Interest Over Time</i>',
            font: {
                family: 'Verdana',
                color: '#000000',
                size: 16,
            },
        },
        // width: 1000,
        // height: 800,
        xaxis: {
            title: '<i>Years</i>', // making Italics. Plotly doesn't directly support italicising through the layout options. Therefore, I'm using HTML tags within the title strings. used ChatGPT
            titlefont: {
                family: 'Verdana',
                color: '#000000',
                size: 10,
            },
            tickfont: {
                family: 'Verdana',
                color: '#000000',
                size: 10,
            },
        },
        yaxis: {
            title: '<i>Popularity</i>',
            titlefont: {
                family: 'Verdana',
                color: '#000000',
                size: 10,
            },
            // standoff: 10, // space between title and tick labels, used ChatGPT  -< not working....?
            tickfont: {
                family: 'Verdana',
                color: '#000000',
                size: 10,
            },
        },
        plot_bgcolor: '#BDE7FF', // set the plot background color to black
        paper_bgcolor: '#BDE7FF', // transparent background for whole chart
    };

    // plotting the Chart 1
    Plotly.newPlot('chart1_trends_plot', trends_chart_data, trends_chart_layout, config);
});



//Chart 2. Global Popularity of K-pop on YouTube 

Plotly.d3.csv('charts/chart2_global YouTube search trends.csv', function(err, rows){
    if (err) throw err;

    // define an array containing years from 2008 to 2023
    let years = ['2008', '2009', '2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023'];  // define years

    // define data object for the choropleth plot
    let data = [{
        type: 'choropleth', // specify plot type
        locations: unpack(rows, 'Country Code'), // extract country codes from data
        z: unpack(rows, '2008'), // extract data values for the year 2008
        text: unpack(rows, 'Country Code'), // set text to display for each data point
        colorscale: [[0, 'pink'], [1, 'red']], // define colorscale for the plot
        colorbar: {
            title: '<i>Popularity</i>',
            titlefont: {
                size: 10,
                family: 'Verdana',
                color: '#000000',
            }
        },
    }];

    // define frames for slider
    let frames = years.map(year => ({
        name: year,
        data: [{ z: unpack(rows, year) }]
    }));
    
    // define layout settings for the plot
    let layout = { // got the code from week 6 tutorial and my studio task 5 activity
        title: {
            text: '<i>Global Popularity of K-pop on YouTube</i>',
            font: {
                family: 'Verdana',
                color: '#000000',
                size: 16,
            },
        },
        // width: 600, // set the width of the plot
        // height: 500, // set the height of the plot 
      
        geo: { 
            projection: {
                type: 'orthographic'
                  // type: 'robinson',
                  //type: 'orthographic'
            },
            bgcolor:'FFEAFD', // background color of the globe
            showland: true,  // display land masses
            landcolor:'white', // display white color when there is no value in the country code
            showocean: true, // display ocean
            oceancolor:'#4f42b5', // color of ocean
            domain: { // set the width and height of the map to 100% of the available space. used ChatGPT
                x: [0.2, 0.9], // set the map to the center
                y: [0, 1],    
            }
        },
        sliders: [{ // created a slider to demonstrate the changes in popularity over the years. got frim week 8 tutorial and also used ChatGPT
            steps: years.map(year => ({ // define steps for each year
                label: year,
                method: 'animate', // set method to animate
                args: [[year], { // define arguments for animation
                    mode: 'immediate', //set animation mode
                    transition: { duration: 0 } // set transition duration
                }]
            })),
            active: 0, // set initial frame
            transition: { duration: 0 }, // set transition duration
            x: 0.3, // set slider position
            y: 0.05,
            len: 0.5, // set the length of the slider 
            bgcolor: '#FF52C5',  // color of the slider track
            font: { color: '#000000' }, // set the color of the slider text
            currentvalue: { // customize appearance of current value label
                visible: true, // show the current value
                prefix: 'Current Year: ', // prefix for the current value label
                xanchor: 'center', // center the current value label horizontally
                font: {
                    size: 13, // font size of the current value label
                    color: '#000000' // color of the current value label
                }
            }
        }],
        updatemenus: [{ // define buttons for animation control
            type: 'buttons', // det button type
            showactive: false, // hide active buttons
            x: 0.3, // set button position
            y: 0.1,
            xanchor: 'right', // anchor buttons to the right
            yanchor: 'top', // anchor buttons to the top
            direction: 'left', // arrange buttons from left to right
            pad: {t: 60, r: 20}, // set padding
            buttons: [{ // define 'Play' button
                label: 'Play', // set button label
                method: 'animate', // set method to animate
                args: [null, { // define arguments for animation
                    frame: {duration: 300, redraw: true}, // set frame duration and redraw option
                    fromcurrent: true, // start animation from current frame
                    mode: 'immediate', // set animation mode
                    transition: {duration: 0} // set transition duration
                }]
            }, { // define 'Pause' button
                label: 'Pause', // set button label
                method: 'animate', // set method to animate
                args: [[null], { // define arguments for animation
                    frame: {duration: 0, redraw: true}, // set frame duration and redraw option
                    mode: 'immediate', // set animation mode
                    transition: {duration: 0} // set transition duration
                }]
            }]
        }],
        paper_bgcolor: '#FFEAFD', // set plot background color to black and make it transparent
        plot_bgcolor: 'FFEAFD', // set chart background color to black and make it transparent 
    };
    
    // plotting the Chart 2
    Plotly.newPlot('chart2_choropleth_plot', data, layout).then(function() {
        Plotly.addFrames('chart2_choropleth_plot', frames); // frames to the plot for animation
    });
});



// Chart 3. Impact on Billboard Rankings

Plotly.d3.csv('charts/chart3_billboard rankings.csv', (chart3_csv) => { // loading data

    const chart_data = chart3_csv.map(row => ({ // map each row of CSV data to an object with properties for date, year, rank, and artist
        date: row['Chart date'],
        year: parseInt(row['Year']), // extract year from CSV row and convert to integer. used ChatGPT
        rank: parseInt(row['Rank']), // extract year from CSV row and convert to integer. used ChatGPT
        artist: row['Artist']
    }));

    const scatter_chart_data = [];
    const addedArtists = new Set(); // set to keep track of added artists 

    chart_data.forEach(item => {
        const artistName = item.artist.includes('feat') ? item.artist.split(' feat')[0].trim() : item.artist; // extract main artist name if it includes 'feat'
        let markerColor = '#ffbfdf'; // default color
        switch (artistName) { // wanted to represent each artist's scatter color differently. used ChatGPT
            case 'Wonder Girls':
                markerColor = '#D299FF';
                break;
            case 'Psy':
                markerColor = '#FF0000';
                break;
            case 'CL':
                markerColor = '#00FFFB';
                break;
            case 'BTS':
                markerColor = '#A020F0';
                break;
            case 'Pinkfong':
                markerColor = 'yellow';
                break;
            case 'Twice':
                markerColor = '#DC7D54';
                break;
            case 'NewJeans':
                markerColor = '#237AFF';
                break;

            case 'Blackpink':
                markerColor = '#ff59c7';
                break;
            case 'Taeyang':
                markerColor = '#2AFF00';
                break;
            case 'Fifty Fifty':
                markerColor = '#ffffff';
                break;
            case 'Stray Kids':
                markerColor = '#7B0000';
                break;
            case 'Le Sserafim':
                markerColor = '#C3DDFF';
                break;
            case 'Illit':
                markerColor = '#FE920F';
                break;
        }

        const cleanArtistName = artistName.includes('BTS') ? 'BTS' : artistName.includes('Blackpink') ? 'Blackpink' : artistName; // intended to display individual artist rankings of a specific K-pop group as a group in the legend. used Chat GPT
        if (!addedArtists.has(cleanArtistName)) {
            scatter_chart_data.push({
                x: [item.date],
                y: [item.rank],
                mode: 'markers',
                type: 'scatter',
                name: cleanArtistName,
                text: [item.artist], // show full artist name when hovering
                marker: {
                    color: markerColor, // set marker color
                    size: 8,
                },
                hoverlabel: {
                    bgcolor: '#FFFFFF', // set hover label background color
                    font: {
                        family: 'Verdana', // set hover label font family
                        size: 10 // set hover label font size
                    }
                }
            });
            addedArtists.add(cleanArtistName); // add artist to set
        } else {
            // artist already added, find existing trace and update its data
            const existingTrace = scatter_chart_data.find(trace => trace.name === cleanArtistName);
            existingTrace.x.push(item.date);
            existingTrace.y.push(item.rank);
            existingTrace.text.push(item.artist); // update hover text
        }
    });

    scatter_chart_data.forEach(trace => { // sort scatter_chart_data based on the rank in descending order
        trace.x = trace.x.reverse();
        trace.y = trace.y.reverse();
        trace.text = trace.text.reverse();
    });

    const scatter_chart_layout = {
        title: {
            text: '<i>Artist Rank Over Time</i>',
            font: {
                family: 'Verdana',
                color: '#000000',
                size: 16,
            },
        },
        // width: 600, // adjusted width for better visibility
        // height:500, // adjusted height for a larger chart
        xaxis: {
            title: '<i>Date</i>',
            titlefont: {
                family: 'Verdana',
                color: '#000000',
                size: 10,
            },
            tickfont: {
                family: 'Verdana',
                color: '#000000',
                size: 10,
            },
            showgrid: true, // show grid lines for x-axis
            gridcolor: '000000', // transparent white grid lines
            gridwidth: 1, // adjust the width of the grid lines
        },
        yaxis: {
            title: '<i>Rank</i>',
            titlefont: {
                family: 'Verdana',
                color: '#000000',
                size: 10,
            },
            tickfont: {
                family: 'Verdana',
                color: '#000000',
                size: 10,
            },
            autorange: 'reversed', // display y-axis in ascending order. used ChatGPT
            showgrid: true, // show grid lines for y-axis
            gridcolor: '#000000', // Transparent white grid lines
            gridwidth: 1, // adjust the width of the grid lines
        },
        legend: {
            orientation: 'v', // set legend orientation to horizontal
            x: 1.05, // set x position to center
            y: 0.5, // set y position to above the plot (you may need to adjust this value)
        },
        plot_bgcolor: '#FFCDB8', // transparent background for whole chart
        paper_bgcolor: '#FFCDB8', // transparent background for whole chart
    };
    scatter_chart_data.forEach(trace => { // Define a custom hover function for each trace. used Chat GPT
        trace.hoverinfo = 'text'; // set hoverinfo to 'text' to customize hover behavior
        trace.hoverlabel = {
            bgcolor: trace.marker.color, // set hover background color to marker color
            font: {
                family: 'Verdana',
                size: 12
            }
        };
        // concatenate the date and artist name for hover text. used Chat GPT
        trace.text = trace.x.map((date, index) => `${date}<br>${trace.text[index]}`);
    });

    // plotting the Chart 3
    Plotly.newPlot('chart3_billboard_rankings_plot', scatter_chart_data, scatter_chart_layout, config);
});



// Chart 4. Online Buzz Around K-pop Artists

Plotly.d3.csv('charts/chart4_talking_online.csv', (chart4_csv) => { // loading data

    const artist_Y = unpack(chart4_csv, 'artist');
    const user_mentions_X = unpack(chart4_csv, 'user_mentions');

    const talking_online_chart_data = [
        {
            y: artist_Y, // switched to 'y' since it's a horizontal chart
            x: user_mentions_X, // switched to 'x' since it's a horizontal chart
            type: 'bar',
            orientation: 'h', // set orientation to horizontal
            marker: {
                color: artist_Y.map(artist => (artist === 'BTS' || artist === 'Stray Kids') ? '#ffbfdf' : '#808080'), // wanted to emphasize and contrast the data metrics by showing K-pop artists in pink, used ChatGPT
            },
            hoverlabel: {
                font: { family: 'Verdana', size: 14 },
            },
        },
    ];

    const talking_online_chart_layout = {
        title: {
            text: '<i>Online Buzz Around K-pop Artists</i>',
            font: {
                family: 'Verdana',
                color: '#000000',
                size: 16,
            },
        },
        // width: 600, // adjusted width for better visibility
        // height: 470, // adjusted height for a larger chart
        margin: {
            l: 280, // adjust the left margin to create space between the bars and the y-axis labels
            r: 50,
            b: 50,
            t: 80,
            pad: 4,
        },
        yaxis: {
            title: {
                text: '<i>Artists</i>',
                standoff: 50, // adjust standoff to create space between the title and the axis labels, used Char GPT
                font: {
                    family: 'Verdana',
                    color: '#000000',
                    size: 10,
                },
            },
            showgrid: false,
            tickfont: {
                family: 'Verdana',
                color: '#000000',
                size: 12,
            },
        },
        xaxis: {
            title: '<i>User Mentions</i>',
            titlefont: {
                family: 'Verdana',
                color: '#000000',
                size: 10,
            },
            standoff: 10,
            showgrid: false,
            tickfont: {
                family: 'Verdana',
                color: '#000000',
                size: 10,
            },
        },

        plot_bgcolor: '#B9B8FF', // transparent background for whole chart
        paper_bgcolor: '#B9B8FF', // transparent background for whole chart
    };

    // plotting the Chart 4
    Plotly.newPlot('chart4_talking_online_plot', talking_online_chart_data, talking_online_chart_layout, config);
});



// Chart 5. Keeping Up with K-pop 

Plotly.d3.csv('charts/chart5_keeping_up_with.csv', (chart5_csv) => {

    const responses = chart5_csv.map(row => row['What do you do to keep up with K-Pop news?']); // extracts the value of the 'keeping_up_with_k-pop' column, storing all responses in the responses array, used ChatGPT
    const responseCounts = responses.reduce((counts, response) => {
        counts[response] = (counts[response] || 0) + 1;
        return counts;
    }, {}); // creates an object 'responseCounts' where each key represents a unique response, and the value represents the count of how many times that response appears in the data. It uses reduce to iterate over the responses array and increment the count for each response. used ChatGPT

    const responseCountsArray = Object.entries(responseCounts).map(([key, value]) => ({ response: key, count: value })); // convert responseCounts object to array of objects for sorting. used ChatGPT
    responseCountsArray.sort((a, b) => b.count - a.count);  // sort responseCountsArray by count in descending order .used ChatGPT

    const responseLabels = responseCountsArray.map(item => item.response);
    const responseCountsValues = responseCountsArray.map(item => item.count); // extract the response labels and their corresponding counts from the responseCountsArray, storing them in separate arrays responseLabels and responseCountsValues. used ChatGPT

    const colorPalette = {
        'Subscribe to Youtube channels': '#FF0000',   // red
        'Join K-pop fanbase social media groups': '#5f2568',   // purple
        'Subscribe to K-Pop news sites': '#808080',  // grey
        'Keep updated via Twitter': '#008AD8',   // blue
        'Follow Instagram accounts': '#FFFF00', // yellow
        'Keep updated via Tumblr': '#36465D',    //  dash board blue
        'Keep updated via Reddit': '#FF5700',    // orange
        'Follow their official social media accounts': '#ffbfdf'   // very light shade of pink
    };

    const keeping_up_with_chart_data = [{
        labels: responseLabels,
        values: responseCountsValues,
        type: 'pie',
        textinfo: 'percent', // show only percentage
        marker: {
            colors: responseLabels.map(label => colorPalette[label] || '#fccc63') // set colors based on response labels or fallback to default color
        },
        hoverinfo: 'label+percent', // show label and percentage on hover, used ChatGPT
        textposition: 'inside', // place text inside the pie slices, used ChatGPT
        textfont: {
            color: '#000000' // set text color to white for better visibility
        },
    }];

    const keeping_up_with_chart_layout = {
        title: {
            text: '<i>How do K-pop fans keep up with K-pop news</i>',
            font: {
                family: 'Verdana',
                color: '#000000',
                size: 16,
            },
        },
        // width: 600, // adjusted width
        // height: 500, // adjusted height
        legend: {
            orientation: 'h', // horizontal orientation
            x: 0.2, // align to the center
            y: -0.15, // adjust distance from the bottom
            font: {
                family: 'Verdana',
                size: 10,
                color: '#000000' // set legend text color to white for better accessibility
            }
        },
        plot_bgcolor: '#FFD2F0', // transparent background for whole chart
        paper_bgcolor: '#FFD2F0', // transparent background for whole chart
    };

    // plotting the Chart 5
    Plotly.newPlot('chart5_keeping_up_with_plot', keeping_up_with_chart_data, keeping_up_with_chart_layout, config);
});

// console.log(rows); // log the loaded data to the console for debugging. used ChatGPT






