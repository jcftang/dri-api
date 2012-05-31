REPORTER=spec

default:

all:

docs: test-md test-docs

test-docs:
	@$(MAKE) test REPORTER=doc \
		| cat docs/head.html - docs/tail.html \
		> docs/test.html

test-md:
	@$(MAKE) test REPORTER=markdown \
		> docs/test.md

test:
	@NODE_PATH=./lib NODE_ENV=test ./node_modules/.bin/mocha \
	--reporter $(REPORTER) \
	--timeout 50000 \
	test/*.js

coverage: routes-cov
	@NODE_PATH=./routes-cov NODE_ENV=test ./node_modules/.bin/mocha \
	--reporter html-cov \
	--timeout 50000 \
	test/*.js > docs/coverage.html

routes-cov:
	@./node_modules/.bin/node-jscoverage lib routes-cov

clean:
	-rm -rf routes-cov

.PHONY: test test-doc coverage
