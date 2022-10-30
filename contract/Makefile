NAME=comments
VERSION=01

.PHONY: build
## build: Compile the packages.
build: clean
	python ./compile.py contracts.$(NAME).step_$(VERSION) ./build/approval.teal ./build/clear.teal

.PHONY: clean
## clean: Clean project and previous builds.
clean:
	rm -f ./build/*.teal && mkdir -p ./build/

.PHONY: help
all: help
# help: show this help message
help: Makefile
	@echo
	@echo " Choose a command to run in smart contract environment:"
	@echo
	@sed -n 's/^##//p' $< | column -t -s ':' |  sed -e 's/^/ /'
	@echo
