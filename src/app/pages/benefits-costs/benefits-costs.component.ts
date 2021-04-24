import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "app-benefits-costs",
  templateUrl: "./benefits-costs.component.html",
  styleUrls: ["./benefits-costs.component.css"]
})
export class BenefitsCostsComponent {
  constructor(public dataService: DataService) {}
}
