import React from "react"
import s from "./FormControls.module.css"
import {CommonFieldInputProps, Field, WrappedFieldInputProps, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form"
import { FieldValidatorType } from "../../../utils/validators/validators"

type FormControlPropsType = {
    input: any
    meta: WrappedFieldMetaProps
    children: any
}

// type WithFormControlType = (param: string) => React.ReactNode

// export const withFormControl = (Elem: any): React.ComponentType<WrappedFieldProps> => ({input, meta: {touched, error}, ...props}) => {
    
//     const hasError = touched && error

//     return (
//         <div className={`${s.formControl} ${hasError ? s.error : ""}`}>
//             <div>
//                 <Elem {...input} {...props}/>
//             </div>
//                 {hasError && <span>{error}</span>}
//         </div>
//     )
// }

// export const Textarea: React.FC<WrappedFieldProps> = (props) => {
//     // const {input, meta, child, ...restProps} = props
//     const {input, meta, ...restProps} = props
//     return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
// }

// export const Input: React.FC<WrappedFieldProps> = (props) => {
//     // const {input, meta, child, ...restProps} = props
//     const {input, meta, ...restProps} = props
//     return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
// }

export const withFormControl = (tagName: string): React.FC<WrappedFieldProps> => ({input, meta: {touched, error}, ...props}) => {
    
    const hasError = touched && error

    const TagComponent = tagName as keyof JSX.IntrinsicElements

    return (
        <div className={`${s.formControl} ${hasError ? s.error : ""}`}>
            <div>
                <TagComponent {...input } {...props}/>
            </div>
                {hasError && <span>{error}</span>}
        </div>
    )
}

export const Input = withFormControl("input")
export const Textarea = withFormControl("textarea")

export function createField<FormKeysType extends string> (placeholder: string | undefined, 
                            // name: string,
                            name: FormKeysType,
                            validators: Array<FieldValidatorType> | [],
                            component: React.FC<WrappedFieldProps> | "input" | "select" | "textarea",
                            props={}, 
                            text="") {
    return <div>
        <Field placeholder={placeholder}
               name={name}
               component={component}
               validate={validators}
               {...props}
        /> {text}
    </div> 
}
                            