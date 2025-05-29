import React from "react";

const initialState = {
    address : '',
    name: '',
    avartar: '',
}

const signerReducer = (state=initialState, action:any) => {
    switch (action.type) {
        case "UPDATESIGNERADDRESS":
            return {
                ...state,
                address: action.signer_address
            }
        case "UPDATESIGNERNAME":
            return {
                ...state,
                name: action.signer_name
            }
        case "UPDATESIGNERAVATAR":
            return {
                ...state,
                avatar: action.signer_avatar
            }
        default: 
          return state
    }
} 

export default signerReducer