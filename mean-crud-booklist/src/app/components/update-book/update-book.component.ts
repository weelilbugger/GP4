import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { ActivatedRoute } from '@angular/router';
@Component({
selector: 'app-update-book',
templateUrl: './update-book.component.html',

styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
Form: FormGroup;

constructor(
public formBuilder: FormBuilder,
private router: Router,
private ngZone: NgZone,
private crudService: CrudService,
private route: ActivatedRoute
) {
this.Form = this.formBuilder.group({
isbn: [''],
title: [''],
author: [''],
description: [''],
published_year: [''],
publisher: ['']
})
}
ngOnInit(): void { 
  // Accessing the parameter value from the URL
  const bookId = this.route.snapshot.paramMap.get('id');
  console.log('Book ID:', bookId);}
onSubmit(): void {
  
    this.crudService.UpdateBook(this.route.snapshot.paramMap.get('id'), this.Form.value)
      .subscribe(() => {
        console.log('Book updated successfully');
        this.ngZone.run(() => this.router.navigateByUrl('/books-list'));
      });
  
}
}
