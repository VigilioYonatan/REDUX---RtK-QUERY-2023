import { AppThunk } from "~/app/store";
import { addtocart } from "./cartSlice";

export function onAddtocar(): AppThunk {
    return async (dispatch, getState) => {
        try {
            console.log(getState().car);
            dispatch(addtocart({ name: "test1" }));
        } catch (error) {}
    };
}
