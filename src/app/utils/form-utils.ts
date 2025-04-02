import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

async function diley(ms: number) {
  return new Promise((res) => {
    setTimeout(() => {
      res(true);
    }, ms);
  });
}

export class FormUtils {
  // Expresiones regulares
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  static passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  // Errores personalizados
  static errorController(errors: ValidationErrors): string | null {
    for (let key of Object.keys(errors)) {
      // Según el error muestro un mensaje distinto
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;

        case 'min':
          return `Debe ser mayor de ${errors['min'].min}`;

        case 'email':
          return `Este correo no es valido`;

        case 'pattern':
          // Comprobación de los patrones
          switch (errors['pattern'].requiredPattern) {
            case this.namePattern:
              return 'Debes de introducir nombre y primer apellido';

            case this.emailPattern.toString():
              return 'Email incorrecto, comprueba que este escrito de forma correcta';

            case this.notOnlySpacesPattern:
              return 'Este campo no debe de tener espacios';

            case this.passwordPattern.toString():
              return 'La contraseña debe de tener mínimo una mayúscula, minúscula y un numero';

            default:
              return 'Error con la comprobación de patrones';
          }

        case 'emailTaken':
          return 'Este correo ya esta utilizado';

        default:
          return 'Error de validación no comprobada';
      }
    }

    return null;
  }

  // Validaciones
  static isValidField(form: FormGroup, fielName: string): boolean | null {
    return form.controls[fielName].errors && form.controls[fielName].touched;
  }

  static getFielError(form: FormGroup, fielName: string): string | null {
    if (!form.controls[fielName]) return null;

    // Obtengo los errores
    const errors = form.controls[fielName].errors ?? {};

    return this.errorController(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFielArrayError(form: FormArray, index: number): string | null {
    if (form.controls.length == 0) return null;

    // Obtengo los errores
    const errors = form.controls[index].errors ?? {};

    return this.errorController(errors);
  }

  // Validador personalizado
  static isFieldMatch(field1: string, field2: string) {
    return (formGroup: FormGroup) => {
      const value1 = formGroup.get(field1)?.value;
      const value2 = formGroup.get(field2)?.value;

      if (value1 !== value2) {
        formGroup.get(field2)?.setErrors({ noMatch: true });
        return { noMatch: true };
      } else {
        formGroup.get(field2)?.setErrors(null);
        return null;
      }
    };
  }
}
