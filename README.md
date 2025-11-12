# FRAGMENTS MICROSERVICE 
## Introduction 
Fragments Microservice that enables the creation, storage, retrieval, update, and deletion of small data fragments along with their associated metadata.

This CRUD application incorporates user authentication, and content-type validation. The first release focuses on supporting plain text fragments with only POST and GET functionalities.

The service is built using Node.js and Express.js, following a modular architecture for scalability and maintainability. It is deployed on AWS EC2 for hosting the API service and integrated with Amazon Cognito for authentication.

Additionally, a lightweight front-end web application, Fragments UI, has been developed to provide an end-to-end user experience for creating and viewing fragments.



### Overview

A fragment is defined as any piece of text (e.g., MIME type of `text/plain`, `text/markdown`, `text/html`, `text/csv`, etc.), JSON or YAML data (`application/json`, `application/yaml`), or an image in any of the following formats:

| Name       | Type         | Extension |
| ---------- | ------------ | --------- |
| PNG Image  | `image/png`  | `.png`    |
| JPEG Image | `image/jpeg` | `.jpg`    |
| WebP Image | `image/webp` | `.webp`   |
| AVIF Image | `image/avif` | `.avif`   |
| GIF Image  | `image/gif`  | `.gif`    |

There are a number of key requirements for this new system:

1. it must provide an **HTTP REST API** to the existing apps, servers, and devices in the system.
2. it must be possible to create, retrieve, update, and delete (CRUD) small fragments of text and images.
3. it should be possible to convert fragment data between different formats. For example, a Markdown fragment should be retrievable as HTML, or a JPEG as a PNG. These conversions should not increase storage costs (i.e., only the original version is stored).
4. all fragment data must be stored along with information about this data, including its size, type, and creation/modification dates.
5. all operations require proper authorization: nothing is publicly available, and all data should be isolated from different users in the system.
6. it must be possible to scale the system massively in order to store huge amounts of data.
7. it must be developed in GitHub and automatically built, tested, and deployed to AWS.

## Getting Started

### Software to Install 
- [Node.js](https://nodejs.org/en)
- [VSCode](https://code.visualstudio.com/) & the following extensions:
    - ESLint 
    - Prettier - Code Formatter
    - Code Spell Checker 
- [git](https://git-scm.com/install/) cli
- curl
- [Express](https://expressjs.com/)


## Run Code

### 1. **Lint**

> ESLint is a JavaScript linter that helps you find and fix errors in your code. [Read More](https://docs.expo.dev/guides/using-eslint/)

```bash
npm run lint
```

- Runs ESLint against all `./src/**/*.js` files
- Fix errors before committing.
- In VSCode, you'll also see linting issues inline if you installed the ESLint extension.

### 2. Start

Run server in production mode

```bash
npm start
```

- Launch server at http://localhost:8080
- Logs at the default level (`info` unless overridden).
- Stop server with `CTRL + C`.

### 3. Dev

Run server in development mode with auto-restart

```bash
npm run dev
```

- Uses Node's built-in `--watch` to restart on code changes
- Loads environment variables from `debug.env`

### 4. Debug

Run the server in development mode with debugging enabled.

```bash
npm run debug
```