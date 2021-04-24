import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "app-normalized-fuzzy-direct-relation-matrix",
  templateUrl: "./normalized-fuzzy-direct-relation-matrix.component.html",
  styleUrls: ["./normalized-fuzzy-direct-relation-matrix.component.css"]
})
export class NormalizedFuzzyDirectRelationMatrixComponent {
  constructor(public dataService: DataService) {}
}
