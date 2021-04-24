import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "app-fuzzy-total-relation-matrix",
  templateUrl: "./fuzzy-total-relation-matrix.component.html",
  styleUrls: ["./fuzzy-total-relation-matrix.component.css"]
})
export class FuzzyTotalRelationMatrixComponent {
  constructor(public dataService: DataService) {}
}
