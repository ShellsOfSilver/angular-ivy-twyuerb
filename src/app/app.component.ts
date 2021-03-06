import { Component, OnInit } from "@angular/core";

import { DataService } from "./data.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.dataService.initForm();
  }

  test(stepper) {
    setTimeout(() => {
      this.dataService.setInitRandom();
      this.dataService.setExpertMatrix();
      stepper.next();
      setTimeout(() => {
        this.dataService.setMatrixRandom();
        this.dataService.setFuzzyDirectRelationMatrix();
        stepper.next();
        setTimeout(() => {
          this.dataService.setNormalizedFuzzyDirectRelationMatrix();
          stepper.next();
          setTimeout(() => {
            this.dataService.setFuzzyTotalRelationMatrix();
            stepper.next();
            setTimeout(() => {
              this.dataService.setCausalDiagramOfCriteria()
              stepper.next();
              setTimeout(() => {
                this.dataService.setRanking();
                stepper.next();
              });
            });
          });
        });
      });
    });
  }
}
