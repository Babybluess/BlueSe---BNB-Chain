"use client";

export const getSignerAddress = (address: string) => (
    {
        type : "UPDATESIGNERADDRESS",
        signer_address: address
    }
)

export const getSignerName = (name: string) => (
    {
        type : "UPDATESIGNERNAME",
        signer_name: name
    }
)

export const getSignerAvatar = (avatar: string) => (
    {
        type : "UPDATESIGNERAVATAR",
        signer_avatar: avatar
    }
)
