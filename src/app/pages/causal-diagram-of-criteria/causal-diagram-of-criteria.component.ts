import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "app-causal-diagram-of-criteria",
  templateUrl: "./causal-diagram-of-criteria.component.html",
  styleUrls: ["./causal-diagram-of-criteria.component.css"]
})
export class CausalDiagramOfCriteriaComponent {
  constructor(public dataService: DataService) {}
}
