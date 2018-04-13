
var content = {
  "1-graphing-works-ee82f32": {
    introduction: "\nModeling [Self-Organised Criticality](http://en.wikipedia.org/wiki/Self-organized_criticality)\n\nOn the left is a model of 100 by 100 desks with a bureaucrat sitting at every one. As the model\nstarts each desk already has two folders of work the bureaucrat is ignoring -- this is displayed\nin yellow. When the model is running more folders of work randomly appear on desks. When a desk\naccumulates four folders the bureaucrat distributes all four folders to the nearby desks, or if\nthey are at the edge the folders are just thrown away. A blue cell is zero, green one, and red\nthree folders\n\n",
    commitrange: '2e83898...ee82f32',
    description: "\n\nThis early model won't automatically stop after 5000 model steps, you'll need to stop it yourself.\n\nThe work on the original JavaScript implementation took place over a 6-day period in Oct 2011. There\nwere a surprising number of ways I found to improve performance for the JavaScript model and views.\n\nThis is the first commit where I had the model, model visualization, and the real-time grapher\nhooked together and working.\n\n[Self-Organised Criticality](http://en.wikipedia.org/wiki/Self-organized_criticality)\n\n> The mathematics of avalanche size and frequency follows a power law that can be simulated to\n> a first approximation by any system that exhibits self-organized criticality (SOC). In \"How\n> Nature Works\"\" Per Bak reports a simplified model of a sandpile that he, Chao Tang, and Curt\n> Wiesenfeld developed that shows SOC, the so-called BTW model. Bak also mentions that\n> Grassberger describes a representation of this model that is fanciful but equivalent to the\n> BTW model. Imagine an N-by-N grid of office desks and a bureaucrat sitting at each. A folder\n> is randomly assigned to one desk. The bureaucrat does nothing until four or more folders are\n> on his desk at which time he sends one to each of his four nearest neighbors. Any bureaucrat\n> sitting at the edge of this array throws a folder out the window if there is no desk to send\n> it to. Sometimes, adding one folder can cause multiple redistributions of folders as one\n> bureaucrat's actions causes neighbors to exceed three folders, which then ripples through\n> the office. In principle, just adding one new folder might involve redistribution at every\n> desk, sometimes multiple times.\n\n" },

  "2-dynamically-add-line-segments-d467b87": {
    introduction: "\n\n",
    commitrange: 'ee82f32...d467b87',
    description: "\nabc\n\n" },

  "3-multiple-model-steps-until-15ms-bcd5469": {
    introduction: "\n\n\n",
    commitrange: 'd467b87...bcd5469',
    description: "\nabc\n\n" },

  "4-requestAnimFrame-faster-than-setInterval-20a640b": {
    introduction: "\n\n\n\n",
    commitrange: 'bcd5469...20a640b',
    description: "\nabc\n\n" },

  "5-use-canvas-for-real-time-graphing-b470432": {
    introduction: "\n\n\n",
    commitrange: '20a640b...b470432',
    description: "\nabc\n\n" },

  "6-dynamically-adjust-model-loop-time-c835db1": {
    introduction: "\n\n\n\n",
    commitrange: 'b470432...c835db1',
    description: "\nabc\n\n" },

  "7-only-render-canvas-once-per-animRequest-0ced7a3": {
    introduction: "\n\n\n\n\n",
    commitrange: 'c835db1...0ced7a3',
    description: "\nabc\n\n" },

  "8-run-model-loop-optimization-259badb": {
    introduction: "\n\n\n",
    commitrange: '0ced7a3...259badb',
    description: "\nabc\n\n" } };