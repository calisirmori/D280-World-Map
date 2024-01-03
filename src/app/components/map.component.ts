import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class WorldMap implements OnInit {
  ngOnInit(): void {
    this.initializeMapInteractions();
  }

  initializeMapInteractions(): void {
    document.querySelectorAll<SVGPathElement>('path').forEach((svgCountry) => {
      svgCountry.addEventListener('mouseover', this.highlightCountry);
      svgCountry.addEventListener('mouseleave', this.resetHighlight);
      svgCountry.addEventListener('click', () =>
        this.loadCountryData(svgCountry)
      );
    });
  }

  highlightCountry(event: MouseEvent): void {
    (event.target as SVGPathElement).style.fill = '#FF5733';
  }

  resetHighlight(event: MouseEvent): void {
    (event.target as SVGPathElement).style.fill = '';
  }

  async loadCountryData(svgCountry: SVGPathElement): Promise<void> {
    const api = `https://api.worldbank.org/V2/country/${svgCountry.id}?format=json`;
    const res = await fetch(api);
    const data = await res.json();
    const countryData = data[1][0];

    this.updateCountryInfo('name', countryData.name);
    this.updateCountryInfo('capital', countryData.capitalCity);
    this.updateCountryInfo('region', countryData.region.value);
    this.updateCountryInfo('income', countryData.incomeLevel.value);
    this.updateCountryInfo('longitude', countryData.longitude);
    this.updateCountryInfo('latitude', countryData.latitude);
  }

  updateCountryInfo(elementId: string, value: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerText = value;
    }
  }
}
