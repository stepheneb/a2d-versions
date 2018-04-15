
var content = {
  "1": {
    tag: 'graphing-works',
    date: '2011 10 13',
    introduction: '\nModeling [Self-Organised Criticality](http://en.wikipedia.org/wiki/Self-organized_criticality)\n\nOn the left is a model of 100 by 100 desks with a bureaucrat sitting at every one. As the model\nstarts each desk already has two folders of work the bureaucrat is ignoring -- this is displayed\nin yellow. When the model is running more folders of work randomly appear on desks. When a desk\naccumulates four folders the bureaucrat distributes all four folders to the nearby desks, or if\nthey are at the edge the folders are just thrown away. A blue cell is zero, green one, and red\nthree folders.\n\nI started this project on Oct 12, 2011. The model below is from a day later on Oct 13.\nThis is when I got the real-time grapher I had written previous in a previous project\nconnected to the model. Over the next month and 149 more commits I increased the\ncombined performance of the model, visualization, and graph by a factor of aproximately 50.\nYou can run the model at eight different points through this process.\n\nSee the lower section for my commentary about the code and the changes.\n\nClick the Go button to start the model running. The model will stop automatically when\nit reaches 5000 steps. Note the rate of avalanches/s displayed under the model. Then try\nthe next version.\n\n',
    comparerange: '2e83898...ee82f32',
    description: '\n\n### [Self-Organised Criticality](http://en.wikipedia.org/wiki/Self-organized_criticality)\n\n  > The mathematics of avalanche size and frequency follows a power law that can be simulated to\n  > a first approximation by any system that exhibits self-organized criticality (SOC). In "How\n  > Nature Works"" Per Bak reports a simplified model of a sandpile that he, Chao Tang, and Curt\n  > Wiesenfeld developed that shows SOC, the so-called BTW model. Bak also mentions that\n  > Grassberger describes a representation of this model that is fanciful but equivalent to the\n  > BTW model. Imagine an N-by-N grid of office desks and a bureaucrat sitting at each. A folder\n  > is randomly assigned to one desk. The bureaucrat does nothing until four or more folders are\n  > on his desk at which time he sends one to each of his four nearest neighbors. Any bureaucrat\n  > sitting at the edge of this array throws a folder out the window if there is no desk to send\n  > it to. Sometimes, adding one folder can cause multiple redistributions of folders as one\n  > bureaucrat\'s actions causes neighbors to exceed three folders, which then ripples through\n  > the office. In principle, just adding one new folder might involve redistribution at every\n  > desk, sometimes multiple times.\n\n### Code Comments\n\nThe work on the original JavaScript implementation took place over a 6-day period in Oct 2011. There\nwere a surprising number of ways I found to improve performance for the JavaScript model and views.\n\nThis is the first commit where I had the model, model visualization, and the real-time grapher\nhooked together and working. At this stage the real-time grapher is using SVG and is still fairly slow.\n\nThe code uses [typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays)\nif they are available to hold the model state and color lookup tables to speed up processing.\nIn the main computational processing loops object variables are copied to local variables.\n\n[avalanche2d.FolderSolver2D.prototype.distributeFoldersRandomOrder](https://github.com/stepheneb/avalanche2d-js/blob/ee82f32900b1037fcd43f9f8227a915946605d88/src/avalanche2d.js#L292)\n\n```javascript\navalanche2d.FolderSolver2D.prototype.distributeFoldersRandomOrder = function(xpos, ypos, index) {\n  // Currently about 10% slower than the non-random distributeFolders() function\n  var folder = this.model.folder;\n  var size = this.model.ARRAY_SIZE;\n\n  var nx = this.nx;\n  var nx_minus_one = nx - 1;\n\n  var ny = this.ny;\n  var ny_minus_one = ny - 1;\n\n  var neighbors = [];\n\n  var caused_avalanche = false;\n\n  // if we\'re not on the left edge queue the neighbor to the left\n  if (xpos > 0) neighbors.push([xpos-1, ypos, index-1]);\n\n  // if we\'re not on the right edge queue the neighbor to the right\n  if (xpos < nx_minus_one) neighbors.push([xpos+1, ypos, index+1]);\n\n  // if there is a row above queue the neighbor above\n  if (index >= nx) neighbors.push([xpos, ypos-1, index-nx]);\n\n  // if there is a row below queue the neighbor below\n  var index_plus_y = index + nx;\n  if (index_plus_y < size) neighbors.push([xpos, ypos+1, index_plus_y]);\n\n  // randomize the order in which we process the neighbors\n  neighbors.shuffle();\n\n  while (neighbors.length > 0) {\n      cell = neighbors.shift();\n      folder[cell[2]]++;\n      if (folder[cell[2]] > 3) {\n          this.new_cells_to_process.push(cell);\n          caused_avalanche = true;\n      };\n  };\n  return caused_avalanche;\n};\n```\n\nI\'m also calculating color lookup tables and directly writing to the canvas image data to create the model visualization.\n\n[avalanche2d.displayFolderCanvas = function(canvas, model)](https://github.com/stepheneb/avalanche2d-js/blob/ee82f32900b1037fcd43f9f8227a915946605d88/src/avalanche2d.js#L490)\n\n```javascript\navalanche2d.displayFolderCanvas = function(canvas, model) {\n  if (red_color_table.length == 0) {\n      avalanche2d.setupRGBAColorTables;\n  };\n  var ctx = canvas.getContext(\'2d\');\n  ctx.fillStyle = "rgb(0,0,0)";\n  ctx.globalCompositeOperation = "destination-atop";\n\n  var columns = model.nx;\n  var rows = model.ny;\n\n  canvas.style.width = canvas.clientWidth + \'px\';\n  canvas.style.height = canvas.clientHeight + \'px\';\n\n  canvas.width = columns;\n  canvas.height = rows;\n\n  var hue, rgb;\n\n  //  folder hue mapping:\n  //  count    color      hue\n  // ---------------------------\n  //   0       blue       183\n  //   1       green      115\n  //   2       yellow     59\n  //   3       orange     30\n  //   4       red        0\n  //\n  var folder_hue_map = [183, 115, 59, 30, 0];\n\n  var ycols;\n\n  var folder_count;\n  var imageData = ctx.getImageData(0, 0, columns, rows);\n  var data = imageData.data;\n  var pix_index = 0;\n  for (var y = 0; y < rows; y++) {\n      ycols = y * rows;\n      pix_index = ycols * 4;\n      for (var x = 0; x < columns; x++) {\n          folder_count = model.folder[ycols + x];\n          hue =  (folder_count > 4) ? 0 : folder_hue_map[folder_count]\n          data[pix_index]     = red_color_table[hue];\n          data[pix_index + 1] = blue_color_table[hue];\n          data[pix_index + 2] = green_color_table[hue];\n          data[pix_index + 3] = 255;\n          pix_index += 4;\n      }\n  };\n  ctx.putImageData(imageData, 0, 0);\n}\n```\n\n' },

  // -------*-------*-------*-------*-------*-------*-------*-------


  "2": {
    tag: 'dynamically-add-line-segments',
    date: '2011 10 13',
    introduction: '\nModeling [Self-Organised Criticality](http://en.wikipedia.org/wiki/Self-organized_criticality)\n\nI knew the code in the real-time grapher generating SVG segments which I had built\nusing the [D3.js](https://d3js.org/) framework could be a performance bottleneck\nso I tried to optimize the code adding line segments to the SVG pathSegList object.\n\nThis version of the code is just a bit faster that the previous version.\n\n',
    comparerange: 'ee82f32...d467b87',
    description: '\n\n### Code Comments\n\nAn experiment to see if adding SVG line segments would be faster if I add them to the SVG pathSegList\ndirectly instead of using [D3.js](https://d3js.org/). It\'s only a bit faster.\n\n[grapher.generate_path_attribute and grapher.add_point](https://github.com/stepheneb/avalanche2d-js/blob/d467b876455e9c4d3285ce6f2a1bbfe4c948ad0c/src/grapher.js#L91)\n\n\n```javascript\n// custom generation of line path \'d\' attribute string\n// using memoized attr_str ... not much faster than d3\nvar generate_path_attribute = function () {\n  var attr_str = \'\';\n  var gen = function(pts, x, y) {\n    var result = attr_str,\n        i = -1,\n        n = pts.length\n        path = [],\n        value;\n    if (result.length == 0) {\n      path.push("M",\n        x.call(self, pts[0].x, 0), ",",\n        y.call(self, pts[0].y, 0));\n      i++\n    };\n    while (++i < n) path.push("L",\n      x.call(self, pts[i].x, i), ",",\n      y.call(self, pts[i].y, i));\n    return attr_str += path.join("");\n  };\n  return gen;\n}();\n\nfunction add_point(p) {\n  var len = points.length;\n  var point = { x: len, y: p };\n  points.push(point);\n  var newx = x.call(self, len, len);\n  var newy = y.call(self, p, len);\n\n  // adding circle points with dom manipulation\n  // var c2 = cpoint.cloneNode(false);\n  // c2.setAttribute("cx", newx);\n  // c2.setAttribute("cy", newy);\n  // vis_node.appendChild(c2);\n\n  // adding circle points with d3\n  // vis.append("svg:circle").attr(\'cx\',newx).attr(\'cy\',newy).attr(\'r\',1)\n\n  // adding new line segments with dom manipulation\n  line_seglist.appendItem(line_path.createSVGPathSegLinetoAbs(newx, newy));\n\n  // adding new line segments with d3 and custom attribute generation\n  // vis.select("path").attr("d", generate_path_attribute([point], x, y));\n};\n```\n\n' },

  // -------*-------*-------*-------*-------*-------*-------*-------


  "3": {
    tag: 'multiple-model-steps-until-15ms',
    date: '2011 10 17',
    introduction: '\n\nThis version runs the compute and render steps of the model multiple times until 15ms has passed.\n\nThe model starts out running alomost 3x faster but slows down. The slowdown appears to\nmostly be caused by a slowdown adding SVG line segments when the number of line\nsegments gets large.\n\n',
    comparerange: 'd467b87...bcd5469',
    description: '\n\n### Code Comments\n\nThe model is still running in a setInterval callback but previously I was only running the\ncompute and render steps once per callback.\n\nNow I am running these steps multiple times in a loop until the elapsed time is more than 15ms\nbefore returning. Occasionally model compute steps will take much longer than normal when\na large number of folders have accumulated and the next step causes a large bureaucrat folder\navalanche.\n\n[window.runModelStep](https://github.com/stepheneb/avalanche2d-js/blob/bcd5469aef1b5cd5f9ce39d50e17ed2cc691376a/avalanche2d.html#L233)\n\n```javascript\nwindow.runModelStep = function() {\n  if (run_mode == \'stop\') return\n  step_start = +new Date(sample_time);\n  step_duration = 0;\n  while (step_duration < 15) {\n    last_sample_time = +new Date(sample_time);\n    model.nextStep();\n    graph_data.push(model.averageFolders);\n    if (show_visualization.checked) avalanche2d.displayFolderCanvas(canvas, model);\n    if (show_graph.checked) graph.add_point(model.averageFolders);\n    if (show_data_table.checked) avalanche2d.displayFolderTable(folder_data, model);\n    sample_time = +new Date();\n    sample_duration = sample_time - last_sample_time;\n    step_duration = sample_time - step_start;\n    if (show_visualization.checked) displayStats();\n    if (model.indexOfStep >= 5000) return modelStop();\n  }\n};\n```\n\n' },

  // -------*-------*-------*-------*-------*-------*-------*-------


  "4": {
    tag: 'requestAnimFrame-faster-than-setInterval',
    date: '2011 10 19',
    introduction: '\n\nAm now using [window.requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)\ninstead of [window.setInterval](http://mdn.beonex.com/en/DOM/window.setInterval.html) to\npace the model. This callback is generated in synch with the actual low-level graphics\nrendering and a such can be more efficient. The actual performance is only incrementally\nbetter than the last version.\n\nThis version has the use of typed arrays off by default. Try testing for performance\nwith them on and off. You can now select from a number of different types.\n\n',
    comparerange: 'bcd5469...20a640b',
    description: '\n\n### Code Comments\n\nInteresting that Safari is a bit slower using a UInt8Array typed array. FireFox and\nChrome are about the same speed.\n\n\n' },

  // -------*-------*-------*-------*-------*-------*-------*-------


  "5": {
    tag: 'use-canvas-for-real-time-graphing',
    date: '2011 10 19',
    introduction: '\n\nRendering into a [Canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) element\ninstead of using [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) provides a 5x speedup!\n\nWhen the model stops the Canvas is cleared and hidden and an SVG graph is drawn so\nthe grapher pan and axis drag UI will work.\n\n',
    comparerange: '20a640b...b470432',
    description: '\n\n### Code Comments\n\n\n\n' },

  // -------*-------*-------*-------*-------*-------*-------*-------


  "6-dynamically-adjust-model-loop-time-c835db1": {
    tag: 'dynamically-adjust-model-loop-time',
    date: '2011 10 20',
    introduction: '\n\n\n\n',
    comparerange: 'b470432...c835db1',
    description: '\n\n### Code Comments\n\n\n\n' },

  // -------*-------*-------*-------*-------*-------*-------*-------


  "7": {
    tag: 'only-render-canvas-once-per-animRequest',
    date: '2011 10 21',
    introduction: '\n\n\n\n\n',
    comparerange: 'c835db1...0ced7a3',
    description: '\n\n### Code Comments\n\n\n\n' },

  // -------*-------*-------*-------*-------*-------*-------*-------


  "8": {
    tag: 'run-model-loop-optimization',
    date: '2012 10 21',
    introduction: '\n\nThis is how fast the code ended up in this performance investigation. If you are\npaying attention to the dates you might notice this commit is a year after I\nstarted the project -- but the last real commit that affected performance was made\non 2011 10 28, 16 days after I started.\n\nMost of the performance improvements are related to a implification of the run-model\nloop and faster ways to interact with and clear the canvas objects.\n\nThis version is so much faster than when I started I decided to add the ability\nto increase the desk array size up to 400x400 to slow it down again.\n\n',
    comparerange: '0ced7a3...259badb',
    description: '\n\n### Code Comments\n\n\n\n' } };