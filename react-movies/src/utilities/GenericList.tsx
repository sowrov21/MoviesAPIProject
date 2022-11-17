import exp from "constants";
import { ReactElement } from "react";
import Loading from "./Loading";

export default function GenericList(props:genericListProps){

    if(!props.list){
        if(props.customLoading){
            return props.customLoading;
        }
        return <Loading/>
    }else if(props.list.length === 0){
        if(props.emptyListUI){
            return props.emptyListUI
        }
        return<>There is no movies</>
    }else{
        return props.children
    }

}

interface genericListProps{
list:any;
customLoading?: ReactElement;
emptyListUI?: ReactElement;
children:ReactElement;
}