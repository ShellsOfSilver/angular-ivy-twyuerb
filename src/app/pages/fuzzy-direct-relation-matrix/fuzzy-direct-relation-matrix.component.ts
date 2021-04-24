import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "app-fuzzy-direct-relation-matrix",
  templateUrl: "./fuzzy-direct-relation-matrix.component.html",
  styleUrls: ["./fuzzy-direct-relation-matrix.component.css"]
})
export class FuzzyDirectRelationMatrixComponent {
  constructor(public dataService: DataService) {}
}
