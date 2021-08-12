import { Edit_token, Save_token } from './constraints'

let token = JSON.parse(localStorage.getItem("token"));

const initialvalues = {
 token: token,
 edit:"sahil"
}


const Reducer = (state= initialvalues,action) => {
    switch (action.type) {
        case Save_token:
            return{
                ...state,
                token:action.payload
            };
            case Edit_token:
                return{
                    ...state,
                    edit:action.payload
                };
    
        default:
         return  state;
    }

}

export default Reducer;