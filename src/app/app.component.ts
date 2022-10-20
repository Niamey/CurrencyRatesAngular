import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currenciesRatesUrl = '/currencies-rates';
  loading = false;
  hasError = false;

  date: string = '';
  headers: string[] = [];
  rates: string[][] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadAndParseData();
  }

  async loadData(): Promise<string> {
    const response = await fetch(this.currenciesRatesUrl);
    if (!response.ok) {
      throw new Error("Request failed.");
    }
    const blob = await response.blob();
    return await blob.text();
  }

  parseData(fileData: string): void {
    const rows = fileData.split('\n');
    this.date = rows[0];
    this.headers = rows[1].split('|');
    rows.slice(2).forEach(row => this.rates.push(row.split('|')));
  }

  async loadAndParseData(): Promise<void> {
    this.loading = true;
    this.hasError = false;
    let data = '';
    try {
      data = await this.loadData();
    } catch(e) {
      this.hasError = true;
    } finally {
      this.loading = false;
    }

    if (this.hasError) {
      return;
    }
  
    this.parseData(data);
  }

}
