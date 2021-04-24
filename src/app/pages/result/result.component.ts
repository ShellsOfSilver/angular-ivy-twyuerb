import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.css"]
})
export class ResultComponent {
  constructor(public dataService: DataService) {}
}
