import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    templateUrl: 'test.page.html'
})

export class TestPage implements OnInit {
    textValue:string;
    constructor() { }

    ngOnInit() { }

    onSubmit(f:NgForm){
        console.log('kepencet submit');
    }
}