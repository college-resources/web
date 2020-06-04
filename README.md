# <p align="center">![College Resources](https://cdn.discordapp.com/attachments/605735460635148319/624586733647953941/cr.png)</p>

# The website of College Resources

The go-to place for all your college needs. From course notes and previous exams to grades and feeding schedules.

*See [college-resources/api](https://github.com/college-resources/api) for the API of this website.*

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites (Windows)

**Warning! We only support 64 bit versions of Windows 7 SP1 or later**<br/>
We do not support any 32 bit Windows version or any version prior to Windows 7 SP1 

1. [NodeJS 12.X](https://nodejs.org/dist/latest-v12.x)
(Recommended version: [NodeJS 12.16.0 x64](https://nodejs.org/dist/v12.16.3/node-v12.16.3-x64.msi))

2. [Git for Windows](https://git-scm.com/download/win)

### Prerequisites (Linux)

*TBA*

### Downloading

Navigate to the folder where you want the project to be saved, open a terminal and run the following command:
```bash
git clone https://github.com/college-resources/web.git
```

### Preparing

1. Navigate to the root of the project and run `npm i`.

2. Create a `.env` file in the root of the project and add the following details:

```dotenv
AUTH0_DOMAIN=<YOUR_AUTH0_DOMAIN>
AUTH0_CLIENT_ID=<YOUR_AUTH0_CLIENT_SECRET>
AUTH0_CLIENT_SECRET=<YOUR_AUTH0_CLIENT_SECRET>
AUTH0_AUDIENCE=<YOUR_AUTH0_AUDIENCE>
AUTH0_SCOPE=openid email profile offline_access
AUTH0_REALM=<YOUR_AUTH0_REALM>

API_ADDRESS=<YOUR_API_ADDRESS>
```

### Running

1. Open a terminal in the root of the project and run `npm run dev`.

2. Wait for it to compile and click the `localhost:3000` link when it appears.
