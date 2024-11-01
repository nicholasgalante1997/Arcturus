# Project Arcturus - WEB - Web Server - Express

> We use express to serve as our web application server library. It is largely unopinionated. However, we are not.

## Patterns We Follow When We Write Express Server Code

### Notes About Express

#### Installation  

#### Geetting Started - Hello World Example

> Embedded below is essentially the simplest Express app you can create. It is a single file app — not what you’d get if you use the Express generator, which creates the scaffolding for a full app with numerous JavaScript files, Jade templates, and sub-directories for various purposes.

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

This app starts a server and listens on port 3000 for connections. The app responds with “Hello World!” for requests to the root URL (/) or route. For every other path, it will respond with a 404 Not Found.

#### Getting Started - Express Generator Example

Use the application generator tool, express-generator, to quickly create an application skeleton.

You can run the application generator with the npx command (available in Node.js 8.2.0). For earlier Node versions, install the application generator as a global npm package and then launch it.

*Sidebar* **We won't make heavy use of express-generator**

#### Basic Routing

Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

Each route can have one or more handler functions, which are executed when the route is matched.

Route definition takes the following structure:

```js

// This is pseudocode

app.METHOD(PATH, HANDLER)

```

Where:

- app is an instance of express.
- METHOD is an HTTP request method, in lowercase.
- PATH is a path on the server.
- HANDLER is the function executed when the route is matched.

**The following examples illustrate defining simple routes.**

Respond with Hello World! on the homepage:

```js

app.get('/', (req, res) => {
  res.send('Hello World!')
})

```

Respond to POST request on the root route (/), the application’s home page:

```js
app.post('/', (req, res) => {
  res.send('Got a POST request')
})
```

Respond to a PUT request to the /user route:

```js
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})
```

Respond to a DELETE request to the /user route:

```js
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})
```

#### Serving static files in Express

To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.

The function signature is:

```ts
express.static(root, [options])
```

The root argument specifies the root directory from which to serve static assets. For more information on the options argument, see express.static.

For example, use the following code to serve images, CSS files, and JavaScript files in a directory named public:

```js
app.use(express.static('public'))
```

Now, you can load the files that are in the public directory:

```txt
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

> **Express looks up the files relative to the static directory, so the name of the static directory is not part of the URL.**

