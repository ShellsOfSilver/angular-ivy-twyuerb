import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";

import { MatSliderModule } from "@angular/material/slider";
import { MatButtonModule } from "@angular/material/button";
import { MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDividerModule } from "@angular/material/divider";
import { MatChipsModule } from "@angular/material/chips";
import { MatCardModule } from "@angular/material/card";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatBadgeModule } from "@angular/material/badge";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatNativeDateModule } from "@angular/material/core";

import { CdkStepperModule } from "@angular/cdk/stepper";
import { ChartsModule } from "ng2-charts";

import { A11yModule } from "@angular/cdk/a11y";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { PortalModule } from "@angular/cdk/portal";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";
import { OverlayModule } from "@angular/cdk/overlay";

import { AppComponent } from "./app.component";
import { InitComponent } from "./pages/init/init.component";
import { ExpertMatrixComponent } from "./pages/expert-matrix/expert-matrix.component";
import { ImportanceCriteriaComponent } from "./pages/importance-criteria/importance-criteria.component";
import { AggregationMatrixComponent } from "./pages/aggregation-matrix/aggregation-matrix.component";
import { SRQComponent } from './pages/s-r-q/s-r-q.component';
import { BestAndWorstFComponent } from './pages/best-and-worst-f/best-and-worst-f.component';
import { NormalizedFuzzyDifferenceDComponent } from './pages/normalized-fuzzy-difference-d/normalized-fuzzy-difference-d.component';
import { DefuzzificationComponent } from './pages/defuzzification/defuzzification.component';
import { BenefitsCostsComponent } from './pages/benefits-costs/benefits-costs.component';
import { RankingComponent } from "./pages/ranking/ranking.component";
import { ResultComponent } from "./pages/result/result.component";

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OverlayModule,
    MatListModule,
    MatDialogModule,
    MatTreeModule,
    MatTooltipModule,
    MatRadioModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    FormsModule,
    CdkTreeModule,
    MatSliderModule,
    CdkTableModule,
    PortalModule,
    ScrollingModule,
    A11yModule,
    DragDropModule,
    ClipboardModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    CdkStepperModule,
    MatIconModule,
    MatRippleModule,
    MatExpansionModule,
    MatDividerModule,
    MatChipsModule,
    MatCardModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTabsModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatGridListModule,
    MatSidenavModule,
    MatNativeDateModule,
    ChartsModule
  ],
  declarations: [
    AppComponent,
    InitComponent,
    ExpertMatrixComponent,
    ImportanceCriteriaComponent,
    AggregationMatrixComponent,
    SRQComponent,
    BestAndWorstFComponent,
    NormalizedFuzzyDifferenceDComponent,
    DefuzzificationComponent,
    BenefitsCostsComponent,
    ResultComponent,
    RankingComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
