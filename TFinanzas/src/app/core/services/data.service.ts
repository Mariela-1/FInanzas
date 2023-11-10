import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private result!: number;

  setResult(result: number) {
    this.result = result;
  }

  getResult(): number {
    return this.result;
  }
}
