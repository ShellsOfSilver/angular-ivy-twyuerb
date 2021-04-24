import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "app-aggregation-matrix",
  templateUrl: "./aggregation-matrix.component.html",
  styleUrls: ["./aggregation-matrix.component.css"]
})
export class AggregationMatrixComponent {
  constructor(public dataService: DataService) {}
}
