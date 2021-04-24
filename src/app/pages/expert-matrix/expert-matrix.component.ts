import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "my-expert-matrix",
  templateUrl: "./expert-matrix.component.html",
  styleUrls: ["./expert-matrix.component.css"]
})
export class ExpertMatrixComponent {
  constructor(public dataService: DataService) {}
}
