import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { number } from "yup";
import { urlGenres } from "../endpoin";
import Button from "../utilities/Button";
import GenericList from "../utilities/GenericList";
import IndexEntity from "../utilities/IndexEntity";
import Pagination from "../utilities/Pagination";
import RecordsPerPageSelect from "../utilities/RecordsPerPageSelect";
import { genreDTO } from "./genres.model";

 

export default function IndexGenres(){

    return (<>

      <IndexEntity<genreDTO>
        url={urlGenres} createURL ="/genres/create" title="Genres"
        entityName="Genres"
        >
            {(genres, buttons) => <>
            
            
              <thead>
                <tr>
                {/* <th>Id</th> */}
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {genres?.map( genre => 
                
                <tr key={genre.id}>
                  {/* <td>{genre.id}</td> */}
                  <td>{genre.name}</td>
                  <td>
                    {buttons(`/genres/edit/${genre.id}`, genre.id)}
                  </td>
                </tr>)
                
                }
              </tbody>
            
            </>}
              
      </IndexEntity>    
    </>)
}