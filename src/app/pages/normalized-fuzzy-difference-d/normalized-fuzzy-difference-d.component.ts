import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "app-normalized-fuzzy-difference-d",
  templateUrl: "./normalized-fuzzy-difference-d.component.html",
  styleUrls: ["./normalized-fuzzy-difference-d.component.css"]
})
export class NormalizedFuzzyDifferenceDComponent {
  constructor(public dataService: DataService) {}
}
