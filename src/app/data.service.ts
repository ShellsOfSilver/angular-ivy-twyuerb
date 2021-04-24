import { Injectable } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class DataService {
  initFormGroup: FormGroup;
  importanceCriteriaForm: FormGroup;
  importanceCriteriaTable: {
    columns: Array<string>;
    dataSource: any;
  };
  benefitsCostsForm: FormGroup;
  benefitsCostsTable: {
    columns: Array<string>;
    dataSource: any;
  };
  expertMatrixForm: FormGroup;
  expertMatrixTable: Array<{
    columns: Array<string>;
    dataSource: any;
  }>;
  aggregationMatrixCriteriaTable: {
    columns: Array<string>;
    dataSource: any;
  };
  aggregationMatrixAlternativeTable: {
    columns: Array<string>;
    dataSource: any;
  };
  bestAndWorstFTable: {
    columns: Array<string>;
    dataSource: any;
  };
  normalizedFuzzyDifferenceDTable: {
    columns: Array<string>;
    dataSource: any;
  };
  srqTable: {
    columns: Array<string>;
    dataSource: any;
  };
  defuzzificationTable: {
    columns: Array<string>;
    dataSource: any;
  };
  rankingTable: {
    columns: Array<string>;
    dataSource: any;
  };
  result: string;

  listOfCriterias: any = [
    { value: "VL", viewValue: "Very low (VL)", trValue: [0.0, 0.1, 0.3] },
    { value: "L", viewValue: "Low (L)", trValue: [0.1, 0.3, 0.5] },
    { value: "M", viewValue: "Medium (M)", trValue: [0.3, 0.5, 0.7] },
    { value: "H", viewValue: "High (H)", trValue: [0.5, 0.7, 0.9] },
    { value: "VH", viewValue: "Very high (VH)", trValue: [0.7, 0.9, 1.0] }
  ];

  listOfExpertAssesments: any = [
    { value: "VP", viewValue: "Very poor (VP)", trValue: [0.0, 0.0, 0.2] },
    { value: "P", viewValue: "Poor (P)", trValue: [0.0, 0.2, 0.4] },
    { value: "F", viewValue: "Fair (F)", trValue: [0.2, 0.4, 0.6] },
    { value: "G", viewValue: "Good (G)", trValue: [0.4, 0.6, 0.8] },
    { value: "VG", viewValue: "Very good (VG)", trValue: [0.6, 0.8, 1.0] },
    { value: "E", viewValue: "Excellent (E)", trValue: [0.8, 0.9, 1.0] }
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
      numberAlternatives: ["", Validators.min(3)],
      numberCriteria: ["", Validators.min(3)],
      numberExperts: ["", Validators.min(3)]
    });
  }

  setInitRandom() {
    this.initFormGroup.setValue({
      numberAlternatives: 8,
      numberCriteria: 6,
      numberExperts: 4
    });
  }

  setImportanceCriteria() {
    this.importanceCriteriaTable = null;
    const form = this._formBuilder.group({});
    const numberCriteria = this.initFormGroup.get("numberCriteria").value;
    const numberExperts = this.initFormGroup.get("numberExperts").value;

    const columns = ["none"];
    const dataSource = [];

    for (let i = 0; i < numberExperts; i++) {
      columns.push(`E${i + 1}`);
    }

    for (let i = 0; i < numberCriteria; i++) {
      const sub = {};

      columns.forEach((e, ix) => {
        if (e === "none") {
          sub[e] = {
            data: `C${i + 1}`,
            start: true,
            id: `${i}_${ix}`
          };
        } else {
          sub[e] = {
            data: i,
            id: `${i}_${ix}`
          };
          form.addControl(`${i}_${ix}`, new FormControl(""));
        }
      });
      dataSource.push(sub);
    }

    this.importanceCriteriaForm = form;
    this.importanceCriteriaTable = {
      columns,
      dataSource
    };
  }

  setImportanceRandom() {
    const res = {};
    const form = this.importanceCriteriaForm.value;
    Object.keys(form).forEach(key => {
      const atl = Object.keys(this.listOfCriterias);
      const inx = this.randomInteger(2, atl.length - 1);
      res[key] = this.listOfCriterias[atl[inx]].value;
    });
    this.importanceCriteriaForm.setValue(res);
  }

  setBenefitsCost() {
    this.benefitsCostsTable = null;
    const form = this._formBuilder.group({});
    const numberCriteria = this.initFormGroup.get("numberCriteria").value;

    const columns = ["none", "Benefit?"];
    const dataSource = [];

    for (let i = 0; i < numberCriteria; i++) {
      const sub = {};

      columns.forEach((e, ix) => {
        if (e === "none") {
          sub[e] = {
            data: `C${i + 1}`,
            start: true,
            id: `${i}_${ix}`
          };
        } else {
          sub[e] = {
            data: i,
            id: `${i}_${ix}`
          };
          form.addControl(`${i}_${ix}`, new FormControl(false));
        }
      });
      dataSource.push(sub);
    }

    this.benefitsCostsTable = {
      columns,
      dataSource
    };

    this.benefitsCostsForm = form;
  }

  setBenefitsCostsRandom() {
    const res = {};
    const form = this.benefitsCostsForm.value;
    Object.keys(form).forEach(key => {
      res[key] = this.randomInteger(1, 2) > 1;
    });
    this.benefitsCostsForm.setValue(res);
  }

  setMatrixRandom() {
    const res = {};
    const form = this.expertMatrixForm.value;
    Object.keys(form).forEach(key => {
      const atl = Object.keys(this.listOfExpertAssesments);
      const inx = this.randomInteger(2, atl.length - 1);
      res[key] = this.listOfExpertAssesments[atl[inx]].value;
    });
    this.expertMatrixForm.setValue(res);
  }

  setExpertMatrix() {
    this.expertMatrixTable = [];
    const form = this._formBuilder.group({});
    const numberCriteria = this.initFormGroup.get("numberCriteria").value;
    const numberExperts = this.initFormGroup.get("numberExperts").value;
    const numberAlternatives = this.initFormGroup.get("numberAlternatives")
      .value;

    for (let inx = 0; inx < numberExperts; inx++) {
      const columns = ["none"];
      const dataSource = [];

      for (let i = 0; i < numberAlternatives; i++) {
        columns.push(`A${i + 1}`);
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
              id: `${inx}_${i}_${ix}`
            };
            form.addControl(`${inx}_${i}_${ix}`, new FormControl(""));
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

  setAggregationMatrix() {
    this.aggregationMatrixCriteriaTable = null;
    this.aggregationMatrixAlternativeTable = null;

    const form = this.importanceCriteriaForm.value;
    const form1 = this.expertMatrixForm.value;
    const numberCriteria = this.initFormGroup.get("numberCriteria").value;
    const numberAlternatives = this.initFormGroup.get("numberAlternatives")
      .value;
    const columns = ["none", "Weight"];
    const columns1 = ["none"];
    let dataSource = [];
    let dataSource1 = [];

    for (let i = 0; i < numberAlternatives; i++) {
      columns1.push("A" + (i + 1));
    }

    for (let i = 0; i < numberCriteria; i++) {
      dataSource.push({
        none: {
          data: `C${i + 1}`,
          start: true,
          id: `${i}`
        },
        Weight: {
          data: [],
          id: `${i}`
        }
      });

      const alr = {};
      for (let j = 0; j < numberAlternatives; j++) {
        alr["A" + (j + 1)] = {
          data: [],
          id: `${i}_${j}`
        };
      }
      dataSource1.push({
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
      dataSource[+ids[0]].Weight.data = [
        ...dataSource[+ids[0]].Weight.data,
        form[key]
      ];
    });

    dataSource = dataSource.map(el => {
      const l = el.Weight.data;
      const res = [1, 0, 0];
      l.forEach(e => {
        const m = this.listOfCriterias.find(k => k.value === e);
        if (m.trValue[0] < res[0]) {
          res[0] = m.trValue[0];
        }
        res[1] += +m.trValue[1];
        if (m.trValue[2] > res[2]) {
          res[2] = m.trValue[2];
        }
      });
      res[1] = +(res[1] / l.length).toFixed(3);
      el.Weight.data = JSON.stringify(res);
      return el;
    });

    this.aggregationMatrixCriteriaTable = {
      columns,
      dataSource
    };

    Object.keys(form1).forEach(key => {
      const ids = key.split("_");
      dataSource1[+ids[1]]["A" + +ids[2]].data = [
        ...dataSource1[+ids[1]]["A" + +ids[2]].data,
        form1[key]
      ];
    });

    dataSource1 = dataSource1.map(el => {
      Object.keys(el).forEach(sK => {
        if (sK !== "none") {
          const l = el[sK].data;
          const res = [1, 0, 0];
          l.forEach(e => {
            const m = this.listOfExpertAssesments.find(k => k.value === e);
            if (m.trValue[0] < res[0]) {
              res[0] = m.trValue[0];
            }
            res[1] += +m.trValue[1];
            if (m.trValue[2] > res[2]) {
              res[2] = m.trValue[2];
            }
          });
          res[1] = +(res[1] / l.length).toFixed(3);
          el[sK].data = JSON.stringify(res);
        }
      });

      return el;
    });

    this.aggregationMatrixAlternativeTable = {
      columns: columns1,
      dataSource: dataSource1
    };
  }

  setBestWorstF() {
    this.bestAndWorstFTable = null;

    const form = this.benefitsCostsForm.value;
    const columns = ['none', 'f*', 'fo'];
    const dataSource = [];

    const cList = {};
    this.aggregationMatrixAlternativeTable.dataSource.forEach(element => {
      const tmp = [];
      let mx = null;
      let mi = null;
      Object.keys(element).forEach(key => {
        if (key !== 'none') {
          tmp.push(JSON.parse(element[key].data))
        }
      });
      tmp.forEach(e => {
        if (!mx) {
          mx = e;
        }
        if (!mi) {
          mi = e;
        }
        if (mx && !this.isMaxFuzzy(mx, e)) {
          mx = e;
        }
        if (mi && this.isMaxFuzzy(mi, e)) {
          mi = e;
        }
      });
      cList[element['none'].data] = {
        tmp,
        mx,
        mi
      };
    });

    Object.keys(cList).forEach(key => {
      const id = +key.split('C')[1];
      const ben = form[(id - 1) + '_1'];
      dataSource.push({
        'f*': { data: JSON.stringify(ben ? cList[key].mx : cList[key].mi), id, },
        'fo': { data: JSON.stringify(ben ? cList[key].mi : cList[key].mx), id, },
        none: { data: key, start: true, id }
      })
    });

    this.bestAndWorstFTable = {
      columns,
      dataSource
    };
  }

  setNormalizedFuzzyDifferenceD() {
    this.normalizedFuzzyDifferenceDTable = null;

    const form = this.benefitsCostsForm.value;
    const dataSource = [];

    this.aggregationMatrixAlternativeTable.dataSource.forEach(element => {
      const d = JSON.parse(JSON.stringify(element));
      const id = +d['none']['data'].split('C')[1];
      const ben = form[(id - 1) + '_1'];
      const bw = this.bestAndWorstFTable.dataSource.find(e => e['none']['data'] === d['none']['data']);
      Object.keys(d).forEach(key => {
        if (key !== 'none') {
          let res = null;
          if (ben) {
            const b = JSON.parse(bw['f*']['data'])[2] - JSON.parse(bw['fo']['data'])[0];
            res = JSON.stringify([
              +((JSON.parse(bw['f*']['data'])[0] - JSON.parse(d[key]['data'])[2]) / b).toFixed(3),
              +((JSON.parse(bw['f*']['data'])[1] - JSON.parse(d[key]['data'])[1]) / b).toFixed(3),
              +((JSON.parse(bw['f*']['data'])[2] - JSON.parse(d[key]['data'])[0]) / b).toFixed(3),
            ]);
          } else {
            const b = JSON.parse(bw['fo']['data'])[2] - JSON.parse(bw['f*']['data'])[0];
            res = JSON.stringify([
              +((JSON.parse(d[key]['data'])[0] - JSON.parse(bw['f*']['data'])[2]) / b).toFixed(3),
              +((JSON.parse(d[key]['data'])[1] - JSON.parse(bw['f*']['data'])[1]) / b).toFixed(3),
              +((JSON.parse(d[key]['data'])[2] - JSON.parse(bw['f*']['data'])[0]) / b).toFixed(3),
            ]);
          }
          d[key].data = res;
        }
      });
      dataSource.push(d)
    });

    this.normalizedFuzzyDifferenceDTable = {
      columns: this.aggregationMatrixAlternativeTable.columns,
      dataSource
    };
  }

  setSRQ() {
    this.srqTable = null;

    const S = {
      none: {
        data: "S",
        id: 0,
        start: true,
      }
    };

    const R = {
      none: {
        data: "R",
        id: 1,
        start: true,
      }
    };

    const Q = {
      none: {
        data: "Q",
        id: 2,
        start: true,
      }
    };

    const aS = {};

    this.normalizedFuzzyDifferenceDTable.dataSource.forEach(element => {
      Object.keys(element).forEach(key => {
        if (key !== 'none') {
          if (!aS[key]) {
            aS[key] = {
              data: []
            };
          }
          aS[key].data = [...aS[key].data, element[key].data];
        }
      });
    });

    let minR = [100, 100, 100];
    let maxR = [-100, -100, -100];
    let minS = [100, 100, 100,];
    let maxS = [-100, -100, -100];

    Object.keys(aS).forEach(key => {
      const sum = [0, 0, 0];
      R[key] = {
        data: [-100, -100, -100]
      }

      aS[key]['data'].forEach((element, inx) => {
        const w = this.aggregationMatrixCriteriaTable.dataSource.find(e => e['none']['data'] === ('C' + (inx + 1)));
        const wd = JSON.parse(w['Weight']['data']);
        const d = JSON.parse(element);

        const l = +(d[0] * wd[0]).toFixed(3);
        const m = +(d[1] * wd[1]).toFixed(3);
        const r = +(d[2] * wd[2]).toFixed(3);

        if (this.isMaxFuzzy([l, m, r], R[key].data)) {
          R[key].data = [l, m, r];
        }

        sum[0] = +(+sum[0] + l).toFixed(3);
        sum[1] = +(+sum[1] + m).toFixed(3);
        sum[2] = +(+sum[2] + r).toFixed(3);
      });

      if (this.isMaxFuzzy(sum, maxS)) {
        maxS = sum;
      }

      if (!this.isMaxFuzzy(sum, minS)) {
        minS = sum;
      }

      if (this.isMaxFuzzy(R[key].data, maxR)) {
        maxR = R[key].data;
      }

      if (!this.isMaxFuzzy(R[key].data, minR)) {
        minR = R[key].data;
      }

      S[key] = {
        id: 0,
        data: JSON.stringify(sum)
      }
      R[key] = {
        id: 0,
        data: JSON.stringify(R[key].data)
      }
    });

    const v = 0.5;

    this.normalizedFuzzyDifferenceDTable.columns.forEach(key => {
      if (key !== 'none') {
        const r = JSON.parse(R[key].data);
        const s = JSON.parse(S[key].data);

        const f1 = [
          v * ((s[0] - minS[2]) / (maxS[2] - minS[0])),
          v * ((s[1] - minS[1]) / (maxS[2] - minS[0])),
          v * ((s[2] - minS[0]) / (maxS[2] - minS[0]))
        ];

        const f2 = [
          (1 - v) * ((r[0] - minR[2]) / (maxR[2] - minR[0])),
          (1 - v) * ((r[1] - minR[1]) / (maxR[2] - minR[0])),
          (1 - v) * ((r[2] - minR[0]) / (maxR[2] - minR[0]))
        ];

        const res = JSON.stringify(
          [
            +(f1[0] + f2[0]).toFixed(3),
            +(f1[1] + f2[1]).toFixed(3),
            +(f1[2] + f2[2]).toFixed(3)
          ]
        );

        Q[key] = {
          id: 0,
          data: res
        }
      }
    });

    this.srqTable = {
      columns: this.normalizedFuzzyDifferenceDTable.columns,
      dataSource: [S, R, Q],
    }
  }

  setDefuzzification() {
    this.defuzzificationTable = null;

    const S = {
      none: {
        data: "S",
        id: 0,
        start: true,
      }
    };

    const R = {
      none: {
        data: "R",
        id: 1,
        start: true,
      }
    };

    const Q = {
      none: {
        data: "Q",
        id: 2,
        start: true,
      }
    };

    this.normalizedFuzzyDifferenceDTable.columns.forEach(key => {
      if (key !== 'none') {
        const s = JSON.parse(this.srqTable.dataSource.find(e => e['none']['data'] === 'S')[key].data);
        const r = JSON.parse(this.srqTable.dataSource.find(e => e['none']['data'] === 'R')[key].data);
        const q = JSON.parse(this.srqTable.dataSource.find(e => e['none']['data'] === 'Q')[key].data);

        Q[key] = {
          id: 0,
          data: +((q[0] + 2 * q[1] + q[2]) / 4).toFixed(3)
        };

        S[key] = {
          id: 0,
          data: +((s[0] + 2 * s[1] + s[2]) / 4).toFixed(3)
        };

        R[key] = {
          id: 0,
          data: +((r[0] + 2 * r[1] + r[2]) / 4).toFixed(3)
        };
      }
    });

    this.defuzzificationTable = {
      columns: this.normalizedFuzzyDifferenceDTable.columns,
      dataSource: [S, R, Q],
    }
  }

  setRanking() {
    this.rankingTable = null;

    const S = {
      none: {
        data: "S",
        id: 0,
        start: true,
      }
    };

    const R = {
      none: {
        data: "R",
        id: 1,
        start: true,
      }
    };

    const Q = {
      none: {
        data: "Q",
        id: 2,
        start: true,
      }
    };

    const s = this.defuzzificationTable.dataSource.find(e => e['none']['data'] === 'S');
    const r = this.defuzzificationTable.dataSource.find(e => e['none']['data'] === 'R');
    const q = this.defuzzificationTable.dataSource.find(e => e['none']['data'] === 'Q');

    const sL = Object.keys(s).filter(key => key !== 'none').map(key => ({ ...s[key], key }));
    const rL = Object.keys(r).filter(key => key !== 'none').map(key => ({ ...r[key], key }));
    const qL = Object.keys(q).filter(key => key !== 'none').map(key => ({ ...q[key], key }));
    sL.sort((a, b) => a.data > b.data ? 1 : -1);
    rL.sort((a, b) => a.data > b.data ? 1 : -1);
    qL.sort((a, b) => a.data > b.data ? 1 : -1);

    sL.forEach((d, inx) => {
      S[d.key] = {
        data: inx + 1,
        id: 0
      };
    });

    rL.forEach((d, inx) => {
      R[d.key] = {
        data: inx + 1,
        id: 0
      };
    });

    qL.forEach((d, inx) => {
      Q[d.key] = {
        data: inx + 1,
        id: 0
      };
    });

    this.rankingTable = {
      columns: this.normalizedFuzzyDifferenceDTable.columns,
      dataSource: [S, R, Q],
    }
  }

  setResult() {
    this.result = '';

    let adv = 0;
    let dq = 0;
    let c1 = false;
    let c2 = false;
    let A = [];
    
    const s = this.defuzzificationTable.dataSource.find(e => e['none']['data'] === 'S');
    const r = this.defuzzificationTable.dataSource.find(e => e['none']['data'] === 'R');
    const q = this.defuzzificationTable.dataSource.find(e => e['none']['data'] === 'Q');

    const sL = Object.keys(s).filter(key => key !== 'none').map(key => ({ ...s[key], key }));
    const rL = Object.keys(r).filter(key => key !== 'none').map(key => ({ ...r[key], key }));
    const qL = Object.keys(q).filter(key => key !== 'none').map(key => ({ ...q[key], key }));
    sL.sort((a, b) => a.data > b.data ? 1 : -1);
    rL.sort((a, b) => a.data > b.data ? 1 : -1);
    qL.sort((a, b) => a.data > b.data ? 1 : -1);

    const a1 = qL[qL.length - 1];
    const a2 = qL[qL.length - 2];
    adv = a1.data - a2.data;
    dq = 1 / (this.defuzzificationTable.columns.length - 2);

    if (adv >= dq) {
      c1 = true;
    }

    if ((sL[sL.length - 1].key === a1.key) || (rL[rL.length - 1].key === a1.key)) {
      c2 = true;
    }

    if (c1 && !c2) {
      A = [a1.key, a2.key];
    } else {
      let mInx = 0;
      qL.reverse().forEach((e, ix) => {
        if (a1.data - e.data < dq) {
          mInx = ix
        }
      });
      A = qL.slice(0, mInx + 1).map(e => e.key);
    }

    this.result = `
    Adv = ${adv.toFixed(4)}, DQ = ${dq.toFixed(4)}
    ------------------------------------------
    condition 1 is ${c1}
    condition 2 is ${c2}
    ------------------------------------------
    Best A - ${A}
    `;
  }
}
