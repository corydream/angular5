import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export abstract class AbstractFormComponent {
  validateForm: FormGroup;
  submitted = false;
  original_obj = {};
  resetFrom() {
    this.validateForm.reset();
  }
  onSubmit() {
    if (!this.validateForm.valid) {
      // tslint:disable-next-line:forin
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
      }
      return false;
    }
    return true;
  }
  getFormControl(name) {
    return this.validateForm.controls[name];
  }
  isObjectValueEqual(b) {
    let aProps = Object.getOwnPropertyNames(this.original_obj);
    let bProps = Object.getOwnPropertyNames(b);
    if (aProps.length != bProps.length) {
      return false;
    }
    for (let i = 0; i < aProps.length; i++) {
      let propName = aProps[i];
      if (this.original_obj[propName] != b[propName]) {
        return false;
      }
    }
    return true;
  }
  getOriginalObj() {
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.original_obj[key] = this.validateForm.controls[key].value;
    }
  }
}
