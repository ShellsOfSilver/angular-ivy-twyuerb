import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "my-init",
  templateUrl: "./init.component.html",
  styleUrls: ["./init.component.css"]
})
export class InitComponent {
  constructor(public dataService: DataService) {}
}
