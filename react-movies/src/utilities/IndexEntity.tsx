import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import GenericList from "./GenericList";
import Pagination from "./Pagination";
import RecordsPerPageSelect from "./RecordsPerPageSelect";

export default function IndexEntity<T>(props: indexEntityProps<T>){

    const navigate = useNavigate();
    const [entities,setEntities] = useState<T[]>();
    const [totalAmountOfPages, setTotalAmountOfPages] =useState(0);
    const [recordsPerPage, setRecordsPerPage] =useState(5);
    const [page, setPage] = useState(1);
  
      useEffect(()=>{
        loadData();
      },[page,recordsPerPage])
  
  function loadData(){
    axios.get(props.url,
      {
        params:{page,recordsPerPage}
      })
    .then(function (response: AxiosResponse<T[]>) {
        // handle success
       // console.log(response.data);
      // console.log(response.headers['totalamountofrecords']);
        const totalAmountOfPages = 
        parseInt(response.headers['totalamountofrecords'],10);
        //console.log(totalAmountOfPages);
        setTotalAmountOfPages(Math.ceil(totalAmountOfPages / recordsPerPage));
        setEntities(response.data);
        
      })
      .catch(function (error) {
        // handle error
       console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
  async function remove(id: number){
    await axios
    .delete(`${props.url}/${id}`)
    .then((response) => {
      loadData();
    });
  }

  const buttons = (editURL:string, id:number) => <>
  
    <Link className="btn btn-success btn-sm" to={editURL} >Edit</Link>
    <Button className="btn btn-danger btn-sm" onClick={()=> window.confirm("Are you sure you want to delete?")? remove(id) : console.log("Canceled")}>Delete</Button>
  </>

    return(
        <>
        <h3>{props.title}</h3>
            <Link className="btn btn-primary btn-sm" 
            to={props.createURL}> Create {props.entityName}</Link>

            <RecordsPerPageSelect onChange={amountOfRecords => {
            setPage(1);
            setRecordsPerPage(amountOfRecords);
            }}/>
            <Pagination currentPage={page} totalAmountOfPages = {totalAmountOfPages} 
            onChange = {newPage => setPage(newPage)}
            />


            <GenericList list={entities}>
                <table className="table table-hover text-nowrap">
                  {props.children(entities!, buttons)}
                </table>
            </GenericList>

        </>
    )
}


interface indexEntityProps<T>{
    url:string;
    createURL:string;
    title:string;
    entityName:string;
    children(entities: T[],
        buttons: (editUrl: string, id: number) => ReactElement):ReactElement
}