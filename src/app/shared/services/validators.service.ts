import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorService {

    public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
    public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

    public cantBeStrider = (control: FormControl) => {

        const value: string = control.value.trim().toLowerCase();

        if (value === 'strider') {
            return { noStrider: true };
        }

        return null;
    }

    public isValidField(form: FormGroup, field: string) {
        return form.controls[field].errors && form.controls[field].touched
    }

    public isValidFieldInArray(formArray: FormGroup, index: number) {
        return formArray.controls[index].errors
            && formArray.controls[index].touched
    }


    public isFieldOneEqualFieldTwo(field1: string, field2: string) {
        return (formGroup: FormGroup): ValidationErrors | null => {

            const value1 = formGroup.get(field1)?.value;
            const value2 = formGroup.get(field2)?.value;

            if (value1 !== value2) {
                formGroup.get(field2)?.setErrors({ notEqual: true });
                return { notEqual: true }

            }
            formGroup.get(field2)?.setErrors(null);
            return null;
        }
    }



}