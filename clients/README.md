# Pre-requisites

This project uses Lerna + Yarn Workspaces so it requires the latest version of yarn to be installed globally. You can install it with the following command:

```
npm i yarn -g
```

It would also be useful to install Lerna globally:

```
npm i lerna -g
```

# Installation

From the project root directory run the following scripts:

```
yarn
```

Followed by:

```
lerna bootstrap
```

The above command will bootstrap the packages in the current Lerna repo, installs all remote dependencies and creates symlinks between cross-dependencies.

# Development

## Environment settings

Custom environment variables are set and used for sites in this repo following this [approach](https://create-react-app.dev/docs/adding-custom-environment-variables).

For local development you can modify `.env` files to change environment variables. The default values have already been set and committed to this repo for Platform and Agent apps.

```
REACT_APP_AUTH0_CLIENT_ID=''
REACT_APP_AUTH0_DOMAIN=''
REACT_APP_SEGMENT_IO_WRITE_KEY=''
REACT_APP_REDIRECT_URI=''
REACT_APP_BASE_URL=''
REACT_APP_BASE_API_GATEWAY=''
```

## Usage

### `yarn start`

Runs all apps in the development mode.

Platform: open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Admin: open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `yarn start:ljh-platform`

Runs the Ljh Platform app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `yarn start:ljh-admin`

Runs the Admin app in the development mode.

Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

## Adding dependencies

You can add both local and npm dependencies using `lerna add`.

### `lerna add <dependency_name>`

Adds dependency to all apps.

### `lerna add <dependency_name> --scope @clients-sites/ljh-platform`

Adds dependency to the Platform app.

### `lerna add <dependency_name> --scope @clients-sites/ljh-admin`

Adds dependency to the LJH Admin app.

# Production

### `yarn build:ljh-platform`

Builds LJH Platform app in production mode.

### `yarn build:ljh-admin`

Builds LJH Admin app in production mode.

### `yarn build`

Builds both apps in production mode.