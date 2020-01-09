
ROOT_DIR:=$(shell git rev-parse --show-toplevel)

LJH_BUILD:=$(shell ./script/get-build)
LJH_VERSION:=$(shell ./script/get-version)


default: sites/${LJH_CLIENT_NAME}/src/libs/ljhBuild.js sites/${LJH_CLIENT_NAME}/src/libs/ljhVersion.js

.PHONY: build
build:
	npm run build

deploy-test01: build
	LJH_AWS_ACCOUNT_ID="666167714671" LJH_INSTANCE=t01 LJH_ENVIRONMENT=test "${ROOT_DIR}/script/ci-deploy"

deploy-test02: build
	LJH_AWS_ACCOUNT_ID="666167714671" LJH_INSTANCE=t02 LJH_ENVIRONMENT=test "${ROOT_DIR}/script/ci-deploy"

deploy-prod01: build
	LJH_AWS_ACCOUNT_ID="049863613763" LJH_INSTANCE=p01 LJH_ENVIRONMENT=prod "${ROOT_DIR}/script/ci-deploy"


.PHONY: sites/${LJH_CLIENT_NAME}/src/libs/ljhBuild.js
sites/${LJH_CLIENT_NAME}/src/libs/ljhBuild.js:
	echo "export default '$(LJH_BUILD)'" >  "$@"

.PHONY: sites/${LJH_CLIENT_NAME}/src/libs/ljhVersion.js
sites/${LJH_CLIENT_NAME}/src/libs/ljhVersion.js:
	echo "export default '$(LJH_VERSION)'" >  "$@"

