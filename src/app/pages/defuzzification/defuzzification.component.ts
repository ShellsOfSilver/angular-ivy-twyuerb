import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "app-defuzzification",
  templateUrl: "./defuzzification.component.html",
  styleUrls: ["./defuzzification.component.css"]
})
export class DefuzzificationComponent {
  constructor(public dataService: DataService) {}
}
