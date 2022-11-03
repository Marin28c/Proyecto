import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public fb:FormBuilder) {
    this.formularioRegistro = this.fb.group({
      'usuario': new FormControl ("",Validators.required),
      'password': new FormControl ("",Validators.required),
      'confirmacionPassword': new FormControl("",Validators.required)
    });
   }

  ngOnInit() {
  }

}
