import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "app-s-r-q",
  templateUrl: "./s-r-q.component.html",
  styleUrls: ["./s-r-q.component.css"]
})
export class SRQComponent {
  constructor(public dataService: DataService) {}
}
