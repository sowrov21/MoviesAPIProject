import {StringSchema} from 'yup'
//Custom Validation Rule
declare module 'yup'{
    class StringSchema {
        firstLetterUppercase():this;
    }
}