Eight versions of the model, visualization, and graphing developed in https://github.com/stepheneb/avalanche2d-js
which implements a simple computational model of self-organizing-criticality.

The eight versions of the model demonstrate the effectiveness of different performance optimizations.

The earliest model runs at about 250 steps per second while the last model runs about 10,500 model
steps per second, a 42x performance increase.

### Developing

Install node.

Install Babel and the ES6 template-literals plugin.

```$ npm install --save-dev babel-plugin-transform-es2015-template-literals```

Now you can use Babel to compile ES6 JavaScript code in the es6 directory and generate regular JavaScript in the src directory.

```$ npx babel es6 --watch -d src```

Start a simple Ruby web server on port 9090.

```$ ruby -run -e httpd . -p 9090```

Open: [http://localhost:9090/index.html](http://localhost:9090/index.html)