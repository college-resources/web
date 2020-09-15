# <p align="center">![College Resources](https://raw.githubusercontent.com/college-resources/static/master/cores_logo_512.png)</p>

# The website of College Resources

The go-to place for all your college needs. From course notes and previous exams to grades and feeding schedules.

*See [college-resources/api](https://github.com/college-resources/api) for the API of this website.*

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites (Windows)

1. [NodeJS 12.X](https://nodejs.org/dist/latest-v12.x)
(Recommended version: [NodeJS 12.18.4 x64](https://nodejs.org/dist/latest-v12.x/node-v12.18.4-x64.msi))

2. [Git for Windows](https://git-scm.com/download/win)

### Prerequisites (Linux)

*TBA*

### Downloading

Navigate to the folder where you want the project to be saved and run the following command:
```bash
git clone https://github.com/college-resources/web.git
```

### Preparing

1. Navigate to the root of the project and run `npm install`.

2. Create a `.env` file in the root of the project and add the following details:

```dotenv
AUTH0_DOMAIN=<YOUR_AUTH0_DOMAIN>
AUTH0_CLIENT_ID=<YOUR_AUTH0_CLIENT_SECRET>
AUTH0_CLIENT_SECRET=<YOUR_AUTH0_CLIENT_SECRET>
AUTH0_AUDIENCE=<YOUR_AUTH0_AUDIENCE>
AUTH0_SCOPE=openid email profile offline_access
AUTH0_REALM=<YOUR_AUTH0_REALM>

API_ADDRESS=<COLLEGE_RESOURCES_API_ADDRESS>
```

### Running

#### Development

1. In the root of the project run `npm run dev`.

2. Wait for it to compile and click the `http://localhost:3000` link when it appears.

#### Production

1. In the root of the project run
```bash
npm run build
npm start
```

2. When the server starts, go to `http://localhost:3000`
