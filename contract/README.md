# AlgoComments Smart Contract

This is the main Smart Contract used in AlgoComments written in PyTeal


## Development

### Requirements
- Python 3.8+

### Setup Environment

To setup the development environment, follow the instructions below:


1 - Create a virtualenv:

```bash
python -m venv venv
```

2 - Activate the venv:

```bash
source venv/bin/activate
```

3 - Install dependencies

```bash
python -m pip install -r requirements.txt
```

### Develop and Build

All smart contract versions are located at `contracts` folder. You can create a new version, update the `VERSION` on Makefile and build using the following command:

```bash
make build
```
