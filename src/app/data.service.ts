import { Injectable } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

import * as mlMatrix from 'ml-matrix';

import { ChartDataSets } from "chart.js";
import { Color, Label } from "ng2-charts";

@Injectable({
  providedIn: "root"
})
export class DataService {
  initFormGroup: FormGroup;
  expertMatrixForm: FormGroup;
  expertMatrixTable: Array<{
    columns: Array<string>;
    dataSource: any;
  }>;
  fuzzyDirectRelationsMatrixTable: {
    columns: Array<string>;
    dataSource: any;
  };
  normalizedFuzzyDirectRelationMatrix: {
    columns: Array<string>;
    dataSource: any;
  };
  normalizedFuzzyDirectRelationR: number;
  fuzzyTotalRelationMatrix: {
    columns: Array<string>;
    dataSource: any;
  };
  causalDiagramOfCriteria: {
    columns: Array<string>;
    dataSource: any;
  };
  finalRanking: {
    columns: Array<string>;
    dataSource: any;
  };

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: any = { responsive: true };
  public lineChartColors: Color[] = [];
  public lineChartLegend = true;
  public lineChartType = "scatter";
  public lineChartPlugins = [];

  listOfCriterias: any = [
    { value: "VL", viewValue: "Very low (VL)", trValue: [0.0, 0.25, 0.50] },
    { value: "L", viewValue: "Low (L)", trValue: [0.25, 0.50, 0.75] },
    { value: "H", viewValue: "High (H)", trValue: [0.5, 0.75, 1.0] },
    { value: "VH", viewValue: "Very high (VH)", trValue: [0.75, 1.0, 1.0] },
    { value: "NO", viewValue: "No influence (NO)", trValue: [0, 0, 0.25] },
    { value: "-", viewValue: "-", trValue: [0, 0, 0] },
  ];

  constructor(private _formBuilder: FormBuilder) { }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  isMaxFuzzy(a1: Array<number>, a2: Array<number>) {
    if (a1[2] > a2[2]) {
      return true;
    }

    if (a1[2] == a2[2] && a1[1] > a2[1]) {
      return true;
    }

    if (a1[2] == a2[2] && a1[1] == a2[1] && a1[0] > a2[0]) {
      return true;
    }

    return false;
  }

  initForm() {
    this.initFormGroup = this._formBuilder.group({
      // numberAlternatives: ["", Validators.min(3)],
      numberCriteria: ["", Validators.min(3)],
      numberExperts: ["", Validators.min(3)]
    });
  }

  setInitRandom() {
    this.initFormGroup.setValue({
      // numberAlternatives: 7,
      numberCriteria: 6,
      numberExperts: 5
    });
  }

  setMatrixRandom() {
    const res = {};
    const form = this.expertMatrixForm.value;
    Object.keys(form).forEach(key => {
      const atl = Object.keys(this.listOfCriterias);
      const inx = this.randomInteger(2, atl.length - 2);
      const ids = key.split('_');
      if (+ids[1] + 1 !== +ids[2]) {
        res[key] = this.listOfCriterias[atl[inx]].value;
      } else {
        res[key] = '-';
      }
    });
    this.expertMatrixForm.setValue(res);
  }

  setExpertMatrix() {
    this.expertMatrixTable = [];
    const form = this._formBuilder.group({});
    const numberCriteria = this.initFormGroup.get("numberCriteria").value;
    const numberExperts = this.initFormGroup.get("numberExperts").value;

    for (let inx = 0; inx < numberExperts; inx++) {
      const columns = ["none"];
      const dataSource = [];

      for (let i = 0; i < numberCriteria; i++) {
        columns.push(`C${i + 1}`);
      }

      for (let i = 0; i < numberCriteria; i++) {
        const sub = {};
        columns.forEach((e, ix) => {
          if (e === "none") {
            sub[e] = {
              data: `C${i + 1}`,
              start: true,
              id: `${inx}_${i}_${ix}`
            };
          } else {
            sub[e] = {
              data: i,
              id: `${inx}_${i}_${ix}`,
              disabled: i + 1 === ix
            };
            form.addControl(`${inx}_${i}_${ix}`, new FormControl(i + 1 === ix ? "-" : ""));
          }
        });
        dataSource.push(sub);
      }

      this.expertMatrixTable.push({
        columns,
        dataSource
      });
    }
    this.expertMatrixForm = form;
  }

  setFuzzyDirectRelationMatrix() {
    this.fuzzyDirectRelationsMatrixTable = null;

    const columns = ["none"];
    let dataSource = [];

    const form = this.expertMatrixForm.value;
    const numberCriteria = this.initFormGroup.get("numberCriteria").value;
    const numberExperts = this.initFormGroup.get("numberExperts").value;

    for (let i = 0; i < numberCriteria; i++) {
      columns.push("C" + (i + 1));
      const alr = {};
      for (let j = 0; j < numberCriteria; j++) {
        alr["C" + (j + 1)] = {
          data: [],
          id: `${i}_${j}`
        };
      }
      dataSource.push({
        none: {
          data: `C${i + 1}`,
          start: true,
          id: `${i}`
        },
        ...alr
      });
    }

    Object.keys(form).forEach(key => {
      const ids = key.split("_");
      dataSource[+ids[1]]["C" + +ids[2]].data = [
        ...dataSource[+ids[1]]["C" + +ids[2]].data,
        form[key]
      ];
    });

    dataSource = dataSource.map(el => {
      Object.keys(el).forEach(sK => {
        if (sK !== "none") {
          const l = el[sK].data;
          const res = [0, 0, 0];
          l.forEach(e => {
            const m = this.listOfCriterias.find(k => k.value === e);
            res[0] = +res[0] + +m.trValue[0];
            res[1] = +res[1] + +m.trValue[1];
            res[2] = +res[2] + +m.trValue[2];
          });
          res[0] = +(+res[0] / numberExperts).toFixed(3);
          res[1] = +(+res[1] / numberExperts).toFixed(3);
          res[2] = +(+res[2] / numberExperts).toFixed(3);
          el[sK].data = JSON.stringify(res);
        }
      });

      return el;
    });

    this.fuzzyDirectRelationsMatrixTable = {
      columns,
      dataSource
    };
  }

  setNormalizedFuzzyDirectRelationMatrix() {
    this.normalizedFuzzyDirectRelationMatrix = null;

    const uList = [];
    this.fuzzyDirectRelationsMatrixTable.dataSource.forEach(el => {
      let tmp = 0;
      Object.keys(el).forEach(sK => {
        if (sK !== "none") {
          const res = JSON.parse(el[sK].data);
          tmp += +res[2];
        }
      });
      uList.push(tmp);
    });
    this.normalizedFuzzyDirectRelationR = +(Math.max(...uList)).toFixed(3);

    const dataSource = JSON.parse(JSON.stringify(this.fuzzyDirectRelationsMatrixTable.dataSource)).map(el => {
      Object.keys(el).forEach(sK => {
        if (sK !== "none") {
          const res = JSON.parse(el[sK].data);
          res[0] = +(+res[0] / this.normalizedFuzzyDirectRelationR).toFixed(3);
          res[1] = +(+res[1] / this.normalizedFuzzyDirectRelationR).toFixed(3);
          res[2] = +(+res[2] / this.normalizedFuzzyDirectRelationR).toFixed(3);
          el[sK].data = JSON.stringify(res);
        }
      });
      return el;
    });

    this.normalizedFuzzyDirectRelationMatrix = {
      columns: this.fuzzyDirectRelationsMatrixTable.columns,
      dataSource
    };
  }

  setFuzzyTotalRelationMatrix() {
    this.fuzzyTotalRelationMatrix = null;
    const numberCriteria = this.initFormGroup.get("numberCriteria").value;
    const dataSource = [];

    const lM = [];
    const mM = [];
    const uM = [];
    const LOne = [];

    JSON.parse(JSON.stringify(this.normalizedFuzzyDirectRelationMatrix.dataSource)).forEach(el => {
      const tmpL = [];
      const tmpM = [];
      const tmpU = [];
      const tmpLOne = [];
      Object.keys(el).forEach(sK => {
        if (sK !== "none") {
          const res = JSON.parse(el[sK].data);
          tmpL.push(res[0]);
          tmpM.push(res[1]);
          tmpU.push(res[2]);

          if (!res[0] && !res[1] && !res[2]) {
            tmpLOne.push(1);
          } else {
            tmpLOne.push(0);
          }
        }
      });
      lM.push(tmpL);
      mM.push(tmpM);
      uM.push(tmpU);
      LOne.push(tmpLOne);
    });

    const l = new mlMatrix.Matrix(lM).mmul(mlMatrix.inverse(new mlMatrix.Matrix(LOne).sub(new mlMatrix.Matrix(lM))))
    const m = new mlMatrix.Matrix(mM).mmul(mlMatrix.inverse(new mlMatrix.Matrix(LOne).sub(new mlMatrix.Matrix(mM))))
    const u = new mlMatrix.Matrix(uM).mmul(mlMatrix.inverse(new mlMatrix.Matrix(LOne).sub(new mlMatrix.Matrix(uM))));

    for (let i = 0; i < numberCriteria; i++) {
      const lR = l.getRow(i);
      const mR = m.getRow(i);
      const uR = u.getRow(i);
      const alr = {};

      for (let j = 0; j < numberCriteria; j++) {
        alr["C" + (j + 1)] = {
          data: JSON.stringify([
            +(lR[j]).toFixed(3),
            +(mR[j]).toFixed(3),
            +(uR[j]).toFixed(3)
          ]),
          id: `${i}_${j}`
        };
      }

      dataSource.push({
        none: {
          data: `C${i + 1}`,
          start: true,
          id: `${i}`
        },
        ...alr
      });
    }

    this.fuzzyTotalRelationMatrix = {
      columns: this.normalizedFuzzyDirectRelationMatrix.columns,
      dataSource
    };
  }

  setCausalDiagramOfCriteria() {
    this.causalDiagramOfCriteria = null;
    const numberCriteria = this.initFormGroup.get("numberCriteria").value;

    const columns = ['none', 'R', 'D', '(R+D)', '(R-D)', 'def(R+D)', 'def(R-D)'];
    const dataSource = [];
    const arrC = {};

    for (let i = 0; i < numberCriteria; i++) {
      arrC['C' + (i + 1)] = {
        data: []
      };
    }

    this.fuzzyTotalRelationMatrix.dataSource.forEach((el, inx) => {
      const row = {
        none: {
          start: true,
          data: 'C' + (inx + 1),
          id: '0'
        }
      };
      let rData = [0, 0, 0];

      Object.keys(el).forEach((sK, i) => {
        if (sK !== "none") {
          const res = JSON.parse(el[sK].data);
          rData[0] = +res[0] + rData[0];
          rData[1] = +res[1] + rData[1];
          rData[2] = +res[2] + rData[2];

          arrC[sK].data.push(res);
        }
      });

      row['R'] = {
        id: '1',
        data: JSON.stringify([+(rData[0]).toFixed(3), +(rData[1]).toFixed(3), +(rData[2]).toFixed(3)])
      }

      dataSource.push(row);
    });

    for (let i = 0; i < numberCriteria; i++) {
      const el = dataSource.find(e => e['none'].data === 'C' + (i + 1));
      const lt = arrC['C' + (i + 1)].data;
      const dData = [0, 0, 0];
      lt.forEach(res => {
        dData[0] = +res[0] + dData[0];
        dData[1] = +res[1] + dData[1];
        dData[2] = +res[2] + dData[2];
      });

      el['D'] = {
        id: '2',
        data: JSON.stringify([+(dData[0]).toFixed(3), +(dData[1]).toFixed(3), +(dData[2]).toFixed(3)])
      }
    }

    const bnp = (l, m, u) => l + (((u - l) + (m - l)) / 3);

    for (let i = 0; i < numberCriteria; i++) {
      const el = dataSource.find(e => e['none'].data === 'C' + (i + 1));
      const r = JSON.parse(el['R'].data);
      const d = JSON.parse(el['D'].data);

      el['(R+D)'] = {
        id: '3',
        data: JSON.stringify([+(r[0] + d[0]).toFixed(3), +(r[1] + d[1]).toFixed(3), +(r[2] + d[2]).toFixed(3)])
      };
      el['(R-D)'] = {
        id: '4',
        data: JSON.stringify([+(r[0] - d[0]).toFixed(3), +(r[1] - d[1]).toFixed(3), +(r[2] - d[2]).toFixed(3)])
      };

      el['def(R+D)'] = {
        id: '5',
        data: +(bnp(r[0] + d[0], r[1] + d[1], r[2] + d[2])).toFixed(3)
      };
      el['def(R-D)'] = {
        id: '6',
        data: +(bnp(r[0] - d[0], r[1] - d[1], r[2] - d[2])).toFixed(3)
      };
    }

    this.buildChart(dataSource);
    this.causalDiagramOfCriteria = {
      columns,
      dataSource
    }
  }

  buildChart(dataSource) {
    const data = [];
    const labels = [];

    dataSource.forEach(e => {
      data.push({
        data: [
          {
            y: e['def(R-D)'].data,
            x: e['def(R+D)'].data
          },
        ],
        pointRadius: 6,
        pointHoverRadius: 8,
        label: e['none'].data
      });
    });
    labels.sort((a, b) => (+a > +b ? 1 : -1));
    this.lineChartLabels = Array.from(new Set(labels));
    this.lineChartData = data;
  }

  setRanking() {
    this.finalRanking = null;
    const numberCriteria = this.initFormGroup.get("numberCriteria").value;
    const columns = ['none', 'def(R+D)', 'Rank 1', 'def(R-D)', 'Rank 2'];
    const dataSource = [];

    const rP = [];
    const rM = [];

    for (let i = 0; i < numberCriteria; i++) {
      const el = this.causalDiagramOfCriteria.dataSource.find(e => e['none'].data === 'C' + (i + 1));
      rP.push(el['def(R+D)'].data);
      rM.push(el['def(R-D)'].data);
    }

    rP.sort((a, b) => a < b ? 1 : -1);
    rM.sort((a, b) => a < b ? 1 : -1);

    for (let i = 0; i < numberCriteria; i++) {
      const el = this.causalDiagramOfCriteria.dataSource.find(e => e['none'].data === 'C' + (i + 1));

      const row = {
        none: {
          start: true,
          data: 'C' + (i + 1),
          id: '0'
        }
      };

      row['def(R+D)'] = {
        data: el['def(R+D)'].data,
        id: 0
      };
      row['def(R-D)'] = {
        data: el['def(R-D)'].data,
        id: 1
      };
      row['Rank 1'] = {
        data: rP.indexOf(el['def(R+D)'].data) + 1,
        id: 2
      };
      row['Rank 2'] = {
        data: rM.indexOf(el['def(R-D)'].data) + 1,
        id: 3
      };

      dataSource.push(row);
    }

    this.finalRanking = {
      dataSource,
      columns
    }
  }
}
