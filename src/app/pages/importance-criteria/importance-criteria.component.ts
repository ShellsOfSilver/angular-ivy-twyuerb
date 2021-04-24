import { Component } from "@angular/core";
import { DataService } from "../../data.service";

@Component({
  selector: "app-importance-criteria",
  templateUrl: "./importance-criteria.component.html",
  styleUrls: ["./importance-criteria.component.css"]
})
export class ImportanceCriteriaComponent {
  constructor(public dataService: DataService) {}
}
