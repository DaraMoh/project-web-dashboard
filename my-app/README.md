STEP 1: Set-up Repository
** THIS GUIDE IS BASED ON THE ASSUMPTION THAT THE USER USES Visual Studio AND Docker Desktop. If you are planning to use another IDE, you will have to adjust accordingly **

1) Download the tarball (project_web_dashboard.tar). 

2) Log into Docker, and on your computer's terminal run "docker load -i project_web_dashboard". This will import a Docker image to your machine.

3) Now, run "docker run -d -p 3000:3000 project_web_dashboard". This will run the example project on "http://localhost:3000". Now, you are ready to work.

4) Create a folder on your computer. This will be your working directory, where you will be editing the code from the container.  

5) Now, you must mount the Docker container to the directory. Open your terminal, and write the following code
-> "docker run -d --name <container_name> -v /path/to/your/local/directory:/path/inside/container <image_name>"
   Replace <container_name> with the desired name for the new container, <image_name> with the name of the Docker image you want to run, and /path/to/your/local/directory with the path to the working directory you created in step 4. The /path/inside/container should be the path to the directory inside the container where the code should reside.


-----------------------------------------

STEP 2: Understand the app.
1) Your main folder inside the my-app folder will be src. Public folder can be ignored, while graph_templates and page_templates give you updated templates for both the main page and the graphs

2) Inside src, there are the *data* and *Pages* folders. In data, you will find test data used for the graph templates. Data is shown in a .csv file (can be created in excel or online), and usually has only 2 columns. If you want to have more columns of data for whatever reason, you need will need to adjust the graph code itself. 

3) The Pages folder will have the pages and styling sheets (css files) used for the various pages. There's HomePage (which is the primary page), GraphPage1 (a full page dedicated to an expanded version of the first graph), and GraphPage2 (a full page dedicated to an expanded version of the second graph). The styling on these pages is very light so that it allows for user customization.

4) Other than those, the only other important files here are graph1.png, graph2.png, graphFirst.js, graphSecond.js, and teamIMG.png. The uses of the files are:
- GRAPH PNG FILES: Used as substitutions for the graphs. If the graphs don't work for you or you use a graph that doesn't have an already made template (and don't want to try make it), you can just put an image instead. Just note, you have to remove the "View Full Graph" button.
- GRAPH JS FILES: Important files that are scripts for creating the graphs. If you are planning on using images instead, ignore these files.
- teamIMG PNG FILE: Used for your team image in the *about us* tab.

5) Style.css is also important, as it's the style sheet for the main page. As stated before, it is very lightly customized so that it allows for user customization.

-----------------------------------------

STEP 3: Coding the program. (HomePage.js)
**IMPORTANT NOTE** -> Using an AI like ChatGPT or Google Bard may be useful for doing things if you are not that good at HTML/JS.

1) This section is focused on HomePage.js. The current home page is based on first_page.js and the current style.css is based on first_page.css.

2) If you wish to use this current template, you may proceed and change things according to their change number. Additionally, if you want to change from interactive graphs to images, go to the very last section of this file.

3) If you want to change from one template to the other, copy the code from the x_page.js to HomePage.js and the responding code from x_page.css to style.css.

-----------------------------------------

STEP 4: Creating the graphs (graphFirst.js, graphSecond.js)
**IMPORTANT NOTE** -> If you are using images, ignore this section completely. If you plan on using images but want to still try see if you can get a graph to look good, this section can still work.

1) Open a graph script (graphFirst.js or graphSecond.js). In this script, you will find code for an already done graph. Additionally, in the graph_templates, there are many more graphs that can be made. If you plan on using the current graph, skip to step 3. If you want to use a different template, continue to step 2.

2) Copy and paste the code from the template to either of the scripts. There are a few things you have to change when you do this:
- Find the tooltip (usually *var tooltip* or *var tooltipA*), and set it to either "#primaryTooltip" or "#secondaryTooltip" based on the whether this is the FIRST graph or SECOND graph.
- Find the svg (*var svg = d3.select*) and change it to either "#svgcontainerPrimary" or "#svgcontainerSecondary" based on whether it's the FIRST graph or SECOND graph

3) Now that you have your correct templates selected, it's time to change our data sets. To make it super simple, we make a csv file containing our dataset with 2 columns (any more and you have to edit the source code; AI can most likely help with this). Put this file in data.csv and call it something. In this example, I'll use rainfall.csv. Let the following lines be an example:

year,rainfall
2013,13.7
2014,15.9
2015,11.1
2016,14.2
2017,15.0
2018,15.2
2019,14.5
2020,14.1
2021,14.7
2022,15.3

Our X-column is called *year*, and our Y-column is called *rainfall*. From here, we need to add these columns into our code.

4) Go to the very top and locate *dataset1*. Set the x.csv file to the name you gave the file.

5) Locate the d3.csv function. This is where the data is processed. In it, find the *data.forEach()* function and then the *d.x* and *d.y* statements inside that function, following the examples (with the plus sign for the non-date variable and the "|| 0"). 

6) You will set the variable names from whatever they currently are to the names you are using in your CSV file. From there, you have to replace those values EVERYWHERE ELSE throughout the graph (you can Ctrl+F and search/replace that way). After that, your graph should be adjusted. 

**IMPORTANT NOTE** -> If you want to format the date in a different way, you have to add this line above the  *var parseDate = d3.timeParse("%Y");* and change it to a whatever format works best, following the guide here https://d3-wiki.readthedocs.io/zh_CN/master/Time-Formatting/. Then, when you write d.year or whatever it is, make sure to do *d.date = parseDate(d.date)*. This will ensure that the format is how you want it, otherwise it will calculate by year which you may not want.
 - For example, if you want to parse the data as YYYY/MM/DD HH:MM, you should use this *parseDate = d3.timeParse('%Y-%m-%d %H:%M');*. Additionally, if you wish for the date to be displayed as 2 digits, you have to lowercase the y.

7) Now, if you want to represent date/time differently for your tooltip, you can add something like this to your showTooltipA() function.
*var timeFormat = d3.timeFormat("%H:%M"); // Define the time format*
*var formattedTime = timeFormat(d.date); // Format the date field*
This makes it so that your tooltip will ONLY show the time, not the date. If you wish to adjust this, follow the website linked in the note and set it up based on that.

8) If you wish to add more customizations (such as 2 different lines in the same line graph, or different colored sections of the graph based on date), you have to try and add them yourself through searching on google or using ChatGPT (the use of ChatGPT is generally discouraged in studying, but since this is a side assignment it's most likely acceptable). You will have to copy your code into ChatGPT for it to give you a correct response, but usually the response is good.


-----------------------------------------

**GRAPH TO IMAGE**
- If you want to remove the graphs, go to the divs labeled "svgcontainerPrimary" and "svgcontainerSecondary" and remove whichever you want (whether it be primary for test 1, or secondary for test 2). Then, insert the following lines based on which you removed:

<div className="graph1-container">
    <img src={imageGraph} alt="Image" className="img-fluid" style={{ width: '100px' }} />
</div>

<div className="graph2-container">
    <img src={imageGraph2} alt="Image" className="img-fluid" style={{ width: '100px' }} />
</div>

- Make sure to put these in the correct spot (right after change#10 or change#16 respectively.)

- Finally, ENSURE you remove the 2 following lines from the code (tooltip and the link), so that there are no problems which persist.