import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "app-ranking",
  templateUrl: "./ranking.component.html",
  styleUrls: ["./ranking.component.css"]
})
export class RankingComponent {
  constructor(public dataService: DataService) {}
}
