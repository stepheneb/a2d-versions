
var content = {
"1": {
tag: 'graphing-works',
date: '2011 10 13',
introduction: `
### Modeling [Self-Organised Criticality](http://en.wikipedia.org/wiki/Self-organized_criticality)

On the left is a model of 100 by 100 desks with a bureaucrat sitting at every one. As the model
starts each desk already has two folders of work the bureaucrat is ignoring -- this is displayed
in yellow. When the model is running more folders of work randomly appear on desks. When a desk
accumulates four folders the bureaucrat distributes all four folders to the nearby desks, or if
they are at the edge the folders are just thrown away. A blue cell is zero, green one, and red
three folders.

I started this project on Oct 12, 2011. The model below is from a day later on Oct 13.
This is when I got the real-time grapher I had written previous in a previous project
connected to the model. Over the next month and 149 more commits I increased the
combined performance of the model, visualization, and graph by a factor of aproximately 50.
You can run the model at eight different points through this process.

Commentary about the code below the model.

Click the Go button to start the model running. The model will stop automatically when
it reaches 5000 steps. Note the rate of avalanches/s displayed under the model. Then try
the next version.

`,
comparerange: '2e83898...ee82f32',
description: `

### [Self-Organised Criticality](http://en.wikipedia.org/wiki/Self-organized_criticality)

  > The mathematics of avalanche size and frequency follows a power law that can be simulated to
  > a first approximation by any system that exhibits self-organized criticality (SOC). In "How
  > Nature Works"" Per Bak reports a simplified model of a sandpile that he, Chao Tang, and Curt
  > Wiesenfeld developed that shows SOC, the so-called BTW model. Bak also mentions that
  > Grassberger describes a representation of this model that is fanciful but equivalent to the
  > BTW model. Imagine an N-by-N grid of office desks and a bureaucrat sitting at each. A folder
  > is randomly assigned to one desk. The bureaucrat does nothing until four or more folders are
  > on his desk at which time he sends one to each of his four nearest neighbors. Any bureaucrat
  > sitting at the edge of this array throws a folder out the window if there is no desk to send
  > it to. Sometimes, adding one folder can cause multiple redistributions of folders as one
  > bureaucrat's actions causes neighbors to exceed three folders, which then ripples through
  > the office. In principle, just adding one new folder might involve redistribution at every
  > desk, sometimes multiple times.

### Code Comments

The work on the original JavaScript implementation took place over a 6-day period in Oct 2011. There
were a surprising number of ways I found to improve performance for the JavaScript model and views.

This is the first commit where I had the model, model visualization, and the real-time grapher
hooked together and working. At this stage the real-time grapher is using SVG and is still fairly slow.

The code uses [typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays)
if they are available to hold the model state and color lookup tables to speed up processing.
In the main computational processing loops object variables are copied to local variables.

[avalanche2d.FolderSolver2D.prototype.distributeFoldersRandomOrder](https://github.com/stepheneb/avalanche2d-js/blob/ee82f32900b1037fcd43f9f8227a915946605d88/src/avalanche2d.js#L292)

\`\`\`javascript
avalanche2d.FolderSolver2D.prototype.distributeFoldersRandomOrder = function(xpos, ypos, index) {
  // Currently about 10% slower than the non-random distributeFolders() function
  var folder = this.model.folder;
  var size = this.model.ARRAY_SIZE;

  var nx = this.nx;
  var nx_minus_one = nx - 1;

  var ny = this.ny;
  var ny_minus_one = ny - 1;

  var neighbors = [];

  var caused_avalanche = false;

  // if we're not on the left edge queue the neighbor to the left
  if (xpos > 0) neighbors.push([xpos-1, ypos, index-1]);

  // if we're not on the right edge queue the neighbor to the right
  if (xpos < nx_minus_one) neighbors.push([xpos+1, ypos, index+1]);

  // if there is a row above queue the neighbor above
  if (index >= nx) neighbors.push([xpos, ypos-1, index-nx]);

  // if there is a row below queue the neighbor below
  var index_plus_y = index + nx;
  if (index_plus_y < size) neighbors.push([xpos, ypos+1, index_plus_y]);

  // randomize the order in which we process the neighbors
  neighbors.shuffle();

  while (neighbors.length > 0) {
      cell = neighbors.shift();
      folder[cell[2]]++;
      if (folder[cell[2]] > 3) {
          this.new_cells_to_process.push(cell);
          caused_avalanche = true;
      };
  };
  return caused_avalanche;
};
\`\`\`

I'm also calculating color lookup tables and directly writing to the canvas image data to create the model visualization.

[avalanche2d.displayFolderCanvas = function(canvas, model)](https://github.com/stepheneb/avalanche2d-js/blob/ee82f32900b1037fcd43f9f8227a915946605d88/src/avalanche2d.js#L490)

\`\`\`javascript
avalanche2d.displayFolderCanvas = function(canvas, model) {
  if (red_color_table.length == 0) {
      avalanche2d.setupRGBAColorTables;
  };
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.globalCompositeOperation = "destination-atop";

  var columns = model.nx;
  var rows = model.ny;

  canvas.style.width = canvas.clientWidth + 'px';
  canvas.style.height = canvas.clientHeight + 'px';

  canvas.width = columns;
  canvas.height = rows;

  var hue, rgb;

  //  folder hue mapping:
  //  count    color      hue
  // ---------------------------
  //   0       blue       183
  //   1       green      115
  //   2       yellow     59
  //   3       orange     30
  //   4       red        0
  //
  var folder_hue_map = [183, 115, 59, 30, 0];

  var ycols;

  var folder_count;
  var imageData = ctx.getImageData(0, 0, columns, rows);
  var data = imageData.data;
  var pix_index = 0;
  for (var y = 0; y < rows; y++) {
      ycols = y * rows;
      pix_index = ycols * 4;
      for (var x = 0; x < columns; x++) {
          folder_count = model.folder[ycols + x];
          hue =  (folder_count > 4) ? 0 : folder_hue_map[folder_count]
          data[pix_index]     = red_color_table[hue];
          data[pix_index + 1] = blue_color_table[hue];
          data[pix_index + 2] = green_color_table[hue];
          data[pix_index + 3] = 255;
          pix_index += 4;
      }
  };
  ctx.putImageData(imageData, 0, 0);
}
\`\`\`

`},



// -------2-------2-------2-------2-------2-------2-------2-------


"2": {
tag: 'dynamically-add-line-segments',
date: '2011 10 13',
introduction: `
Modeling [Self-Organised Criticality](http://en.wikipedia.org/wiki/Self-organized_criticality)

I knew the code in the real-time grapher generating SVG segments which I had built
using the [D3.js](https://d3js.org/) framework could be a performance bottleneck
so I tried to optimize the code adding line segments to the SVG pathSegList object.

This version of the code is just a bit faster that the previous version.

`,
comparerange: 'ee82f32...d467b87',
description: `

### Code Comments

An experiment to see if adding SVG line segments would be faster if I add them to the SVG pathSegList
directly instead of using [D3.js](https://d3js.org/). It's only a bit faster.

[grapher.generate_path_attribute and grapher.add_point](https://github.com/stepheneb/avalanche2d-js/blob/d467b876455e9c4d3285ce6f2a1bbfe4c948ad0c/src/grapher.js#L91)


\`\`\`javascript
// custom generation of line path 'd' attribute string
// using memoized attr_str ... not much faster than d3
var generate_path_attribute = function () {
  var attr_str = '';
  var gen = function(pts, x, y) {
    var result = attr_str,
        i = -1,
        n = pts.length
        path = [],
        value;
    if (result.length == 0) {
      path.push("M",
        x.call(self, pts[0].x, 0), ",",
        y.call(self, pts[0].y, 0));
      i++
    };
    while (++i < n) path.push("L",
      x.call(self, pts[i].x, i), ",",
      y.call(self, pts[i].y, i));
    return attr_str += path.join("");
  };
  return gen;
}();

function add_point(p) {
  var len = points.length;
  var point = { x: len, y: p };
  points.push(point);
  var newx = x.call(self, len, len);
  var newy = y.call(self, p, len);

  // adding circle points with dom manipulation
  // var c2 = cpoint.cloneNode(false);
  // c2.setAttribute("cx", newx);
  // c2.setAttribute("cy", newy);
  // vis_node.appendChild(c2);

  // adding circle points with d3
  // vis.append("svg:circle").attr('cx',newx).attr('cy',newy).attr('r',1)

  // adding new line segments with dom manipulation
  line_seglist.appendItem(line_path.createSVGPathSegLinetoAbs(newx, newy));

  // adding new line segments with d3 and custom attribute generation
  // vis.select("path").attr("d", generate_path_attribute([point], x, y));
};
\`\`\`

`},


// -------3-------3-------3-------3-------3-------3-------3-------


"3": {
tag:'multiple-model-steps-until-15ms',
date: '2011 10 17',
introduction: `

This version runs the compute and render steps of the model multiple times until 15ms has passed.

The model starts out running alomost 3x faster but slows down. The slowdown appears to
mostly be caused by a slowdown adding SVG line segments when the number of line
segments gets large.

`,
comparerange: 'd467b87...bcd5469',
description: `

### Code Comments

The model is still running in a setInterval callback but previously I was only running the
compute and render steps once per callback.

Now I am running these steps multiple times in a loop until the elapsed time is more than 15ms
before returning. Occasionally model compute steps will take much longer than normal when
a large number of folders have accumulated and the next step causes a large bureaucrat folder
avalanche.

[window.runModelStep](https://github.com/stepheneb/avalanche2d-js/blob/bcd5469aef1b5cd5f9ce39d50e17ed2cc691376a/avalanche2d.html#L233)

\`\`\`javascript
window.runModelStep = function() {
  if (run_mode == 'stop') return
  step_start = +new Date(sample_time);
  step_duration = 0;
  while (step_duration < 15) {
    last_sample_time = +new Date(sample_time);
    model.nextStep();
    graph_data.push(model.averageFolders);
    if (show_visualization.checked) avalanche2d.displayFolderCanvas(canvas, model);
    if (show_graph.checked) graph.add_point(model.averageFolders);
    if (show_data_table.checked) avalanche2d.displayFolderTable(folder_data, model);
    sample_time = +new Date();
    sample_duration = sample_time - last_sample_time;
    step_duration = sample_time - step_start;
    if (show_visualization.checked) displayStats();
    if (model.indexOfStep >= 5000) return modelStop();
  }
};
\`\`\`

`},



// -------4-------4-------4-------4-------4-------4-------4-------

"4": {
tag: 'requestAnimFrame-faster-than-setInterval',
date: '2011 10 19',
introduction: `

Am now using [window.requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
instead of [window.setInterval](http://mdn.beonex.com/en/DOM/window.setInterval.html) to
pace the model. This callback is generated in synch with the actual low-level graphics
rendering and a such can be more efficient. The actual performance is only incrementally
better than the last version.

This version has the use of typed arrays off by default. Try testing for performance
with them on and off. You can now select from a number of different types.

`,
comparerange: 'bcd5469...20a640b',
description: `

### Code Comments

Interesting that Safari is a bit slower using a UInt8Array typed array. FireFox and
Chrome are about the same speed.


`},



// -------5-------5-------5-------5-------5-------5-------5-------

"5": {
tag: 'use-canvas-for-real-time-graphing',
date: '2011 10 19',
introduction: `

Rendering into a [Canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) element
instead of using [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) provides a 5x speedup!

When the model stops the Canvas is cleared and hidden and an SVG graph is drawn so
the grapher pan and axis drag UI will work.

`,
comparerange: '20a640b...b470432',
description: `

### Code Comments


`},



// -------6-------6-------6-------6-------6-------6-------6-------

"6": {
tag: 'dynamically-adjust-model-loop-time',
date: '2011 10 20',
introduction: `


`,
comparerange: 'b470432...c835db1',
description: `

### Code Comments


`},



// -------7-------7-------7-------7-------7-------7-------7-------

"7": {
tag: 'only-render-canvas-once-per-animRequest',
date: '2011 10 21',
introduction: `


`,
comparerange: 'c835db1...0ced7a3',
description: `

### Code Comments


`},



// -------8-------8-------8-------8-------8-------8-------8-------

"8": {
tag: 'run-model-loop-optimization',
date: '2012 10 21',
introduction: `

This is how fast the code ended up in this performance investigation. If you are
paying attention to the dates you might notice this commit is a year after I
started the project -- but the last real commit that affected performance was made
on 2011 10 28, 16 days after I started.

Most of the performance improvements are related to a implification of the run-model
loop and faster ways to interact with and clear the canvas objects.

This version is so much faster than when I started I decided to add the ability
to increase the desk array size up to 400x400 to slow it down again.

`,
comparerange: '0ced7a3...259badb',
description: `

### Code Comments


`}};