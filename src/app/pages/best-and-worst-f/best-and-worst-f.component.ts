import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "app-best-and-worst-f",
  templateUrl: "./best-and-worst-f.component.html",
  styleUrls: ["./best-and-worst-f.component.css"]
})
export class BestAndWorstFComponent {
  constructor(public dataService: DataService) {}
}
