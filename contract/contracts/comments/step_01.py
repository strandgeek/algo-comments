from pyteal import *
from pyteal.ast.bytes import Bytes
from pyteal_helpers import program

UINT64_MAX = 0xFFFFFFFFFFFFFFFF

# Constants
SLUG_MAX_LENGTH = 256
IPFS_HASH_LENGTH = 46

def approval():
    # globals
    global_owner = Bytes("owner")  # byteslice
    global_reward_per_comment = Bytes("reward_per_comment") #  uint64

    # op codes
    op_optin_asset = Bytes("optin_asset")
    op_post_comment = Bytes("post_comment")
    op_set_reward_per_comment = Bytes("set_reward_per_comment")

    # Utility functions
    is_owner = Txn.sender() == App.globalGet(Bytes("owner"))


    set_reward_per_comment = Seq(
        [
            Assert(is_owner),
            App.globalPut(global_reward_per_comment, Txn.application_args[0]),
            Approve(),
        ]
    )

    optin_asset = Seq([
        InnerTxnBuilder.Begin(),
        InnerTxnBuilder.SetFields(
            {
                TxnField.type_enum: TxnType.AssetTransfer,
                TxnField.asset_receiver: Global.current_application_address(),
                TxnField.xfer_asset: Txn.assets[0],
                TxnField.asset_amount: Int(0),
            }
        ),
        InnerTxnBuilder.Submit(),
        Approve(),
    ])

    post_comment= Seq([
        Assert(Len(Txn.note()) >= Int(SLUG_MAX_LENGTH) + Int(IPFS_HASH_LENGTH)),
        Approve(),
    ])


    return program.event(
        init=Seq(
            [
                App.globalPut(global_owner, Txn.sender()),
                App.globalPut(global_reward_per_comment, Btoi(Txn.application_args[0])),
                Approve(),
            ]
        ),
        no_op=Cond(
            [Txn.application_args[0] == op_optin_asset, optin_asset],
            [Txn.application_args[0] == op_post_comment, post_comment],
            [Txn.application_args[0] == op_set_reward_per_comment, set_reward_per_comment],
        ),
    )


def clear():
    return Approve()
