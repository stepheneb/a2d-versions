
var content = {
"1-graphing-works-ee82f32": {
introduction: `
Modeling [Self-Organised Criticality](http://en.wikipedia.org/wiki/Self-organized_criticality)

On the left is a model of 100 by 100 desks with a bureaucrat sitting at every one. As the model
starts each desk already has two folders of work the bureaucrat is ignoring -- this is displayed
in yellow. When the model is running more folders of work randomly appear on desks. When a desk
accumulates four folders the bureaucrat distributes all four folders to the nearby desks, or if
they are at the edge the folders are just thrown away. A blue cell is zero, green one, and red
three folders

`,
commitrange: '2e83898...ee82f32',
description: `

This early model won't automatically stop after 5000 model steps, you'll need to stop it yourself.

The work on the original JavaScript implementation took place over a 6-day period in Oct 2011. There
were a surprising number of ways I found to improve performance for the JavaScript model and views.

This is the first commit where I had the model, model visualization, and the real-time grapher
hooked together and working.

[Self-Organised Criticality](http://en.wikipedia.org/wiki/Self-organized_criticality)

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

`},

"2-dynamically-add-line-segments-d467b87": {
introduction: `

`,
commitrange: 'ee82f32...d467b87',
description: `
abc

`},

"3-multiple-model-steps-until-15ms-bcd5469": {
introduction: `


`,
commitrange: 'd467b87...bcd5469',
description: `
abc

`},

"4-requestAnimFrame-faster-than-setInterval-20a640b": {
introduction: `



`,
commitrange: 'bcd5469...20a640b',
description: `
abc

`},

"5-use-canvas-for-real-time-graphing-b470432": {
introduction: `


`,
commitrange: '20a640b...b470432',
description: `
abc

`},

"6-dynamically-adjust-model-loop-time-c835db1": {
introduction: `



`,
commitrange: 'b470432...c835db1',
description: `
abc

`},

"7-only-render-canvas-once-per-animRequest-0ced7a3": {
introduction: `




`,
commitrange: 'c835db1...0ced7a3',
description: `
abc

`},

"8-run-model-loop-optimization-259badb": {
introduction: `


`,
commitrange: '0ced7a3...259badb',
description: `
abc

`}};