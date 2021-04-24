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
      this.dataService.setImportanceCriteria();
      stepper.next();
      setTimeout(() => {
        this.dataService.setImportanceRandom();
        this.dataService.setBenefitsCost();
        stepper.next();
        setTimeout(() => {
          this.dataService.setBenefitsCostsRandom();
          this.dataService.setExpertMatrix();
          stepper.next();
          setTimeout(() => {
            this.dataService.setMatrixRandom();
            this.dataService.setAggregationMatrix();
            stepper.next();
            setTimeout(() => {
              this.dataService.setBestWorstF()
              stepper.next();
              setTimeout(() => {
                this.dataService.setNormalizedFuzzyDifferenceD();
                stepper.next();
                setTimeout(() => {
                  this.dataService.setSRQ();
                  stepper.next();
                  setTimeout(() => {
                    this.dataService.setDefuzzification();
                    stepper.next();
                    setTimeout(() => {
                      this.dataService.setRanking();
                      stepper.next();
                      setTimeout(() => {
                        this.dataService.setResult();
                        stepper.next();
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }
}
