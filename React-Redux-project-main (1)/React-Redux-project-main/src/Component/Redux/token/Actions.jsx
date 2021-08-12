import {Edit_token, Save_token} from './constraints';



export const Actions = (statepayload="") =>{

    return {
        type:Save_token,
        payload:statepayload,
    };
};
export const Actions2 = (statepayload="") =>{

    return {
        type:Edit_token,
        payload:statepayload,
    };
};

