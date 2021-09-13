import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WebService {

	constructor(private http: HttpClient) {
	}

	public initData() {
		return this.http.get('https://demo7242716.mockable.io/products');
	}
}