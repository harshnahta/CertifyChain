## Getting Started

## 1. Install Dependencies

```bash
npm install
# or
yarn
```

## 2. Create Configuration Files

## .env file

Add the following entry:

PORT = 4000

You can choose any port you prefer.

## .env.local file

Add the following entry:

NEXT_PUBLIC_API_ENDPOINT = http://localhost:4000/api

Replace 4000 with the port you set in the .env file.

## 3. Run the Project

Once the dependencies are installed and configuration files are set up, run the following command in the terminal:

```bash
npm run process

```

This command starts the project, and you're ready to go. Open your browser and navigate to http://localhost:PORT, where PORT is the port you set in the .env file.

Feel free to replace npm with yarn if you are using Yarn as your package manager.
