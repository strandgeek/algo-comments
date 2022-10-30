import importlib
import sys
from algosdk import *
from pyteal_helpers import program
from dotenv import load_dotenv
import os
import json

load_dotenv()  # take environment variables from .env.


# Connect to an algod node. (use a node of your choice here)
algod_token  = os.getenv("PURESTAKE_TOKEN") # Algod API Key
algod_addr   = os.getenv("PURESTAKE_SERVER") # Algod Node Address
algod_header = {
    'User-Agent': 'Minimal-PyTeal-SDK-Demo/0.1',
    'X-API-Key': algod_token
}
algod_client = v2client.algod.AlgodClient(
    algod_token,
    algod_addr,
    algod_header
)

if __name__ == "__main__":
    mod = sys.argv[1]

    try:
        approval_out = sys.argv[2]
    except IndexError:
        approval_out = None

    try:
        clear_out = sys.argv[3]
    except IndexError:
        clear_out = None

    try:
        json_out = sys.argv[4]
    except IndexError:
        json_out = None

    json_data = {
        'approval_base64': None,
        'clear_base64': None,
    }

    contract = importlib.import_module(mod)

    if approval_out is None:
        print(program.application(contract.approval()))
    else:
        approval_teal = program.application(contract.approval())
        approval_b64   = algod_client.compile(approval_teal)['result']
        json_data['approval_base64'] = approval_b64
        with open(approval_out, "w") as h:
            h.write(approval_teal)

    if clear_out is not None:
        clear_teal = program.application(contract.clear())
        clear_b64 = algod_client.compile(clear_teal)['result']
        json_data['clear_base64'] = clear_b64
        with open(clear_out, "w") as h:
            h.write(clear_teal)
    if json_data['approval_base64'] and json_data['clear_base64']:
        with open(json_out, 'w') as fp:
            json.dump(json_data, fp)
