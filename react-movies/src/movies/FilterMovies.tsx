import { Formik,Form, Field } from "formik";
import { genreDTO } from "../genres/genres.model";
import Button from "../utilities/Button";

export default function FilterMovies(){
    
    const initialValues:filterMoviesForms ={
        title: '',
        genreId:0,
        upcomingReleases:false,
        inTheaters:false
    }
//test with gerres array

const genres:genreDTO[] = [
                            {id:1,name:"Action"},
                            {id:2,name:"Drama"}
                          ];

    
return(<>
            <h3>Filter Movies</h3>

         <Formik 
         initialValues={initialValues}
         onSubmit={value=> console.log(value)}
         
         >
         {(formiKProps)=>(
            <Form>
                <div className="row gx-3 align-items-center">
                    <div className="col-auto">
                        <input type="text" className="form-control" id="title"  placeholder="Title of the movie"
                        {...formiKProps.getFieldProps("title")}
                        />
                    </div>

                    <div className="col-auto">
                        <select className="form-select"
                        {...formiKProps.getFieldProps("genreId")}
                        >
                        <option value="0">--choose genre--</option>
                        {genres.map(genre =><option key={genre.id} value={genre.id}>{genre.name}</option> )}
                        </select>
                    </div>

                    <div className="col-auto">
                          <div className="form-check">
                            <Field className="form-check-input" id="upcomingReleases"
                             name="upcomingReleases" type="checkbox"/>
                             <label className="form-check-label" htmlFor="upcomingReleases">Upcoming Releases</label>
                        </div>
                    </div>
                    <div className="col-auto">
                          <div className="form-check">
                            <Field className="form-check-input" id="inTheaters"
                             name="inTheaters" type="checkbox"/>
                             <label className="form-check-label" htmlFor="inTheaters">In Theaters</label>
                        </div>
                    </div>
                    <div className="col-auto">
                    <Button type="button" className="btn btn-primary"
                     onClick={()=>formiKProps.submitForm()}
                    >Filter</Button>

                    <Button type="button"  className="btn btn-danger ms-3"
                     onClick={()=>formiKProps.setValues(initialValues)}
                    >Clear</Button>
                    </div>
                </div>
            </Form>
         )}
         </Formik>


    </>)
}

//interface to contain form data

interface filterMoviesForms{
    title: string;
    genreId: number;
    upcomingReleases: boolean;
    inTheaters: boolean
}