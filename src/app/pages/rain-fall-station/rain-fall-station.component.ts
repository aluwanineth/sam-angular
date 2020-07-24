import { Component, OnInit, ViewChild } from '@angular/core';
import { DxTreeViewComponent } from 'devextreme-angular';
import { RainfallService, Employee } from 'src/app/shared/services/rainfall.service';

@Component({
  selector: 'app-rain-fall-station',
  templateUrl: './rain-fall-station.component.html',
  styleUrls: ['./rain-fall-station.component.scss']
})
export class RainFallStationComponent implements OnInit {
  @ViewChild(DxTreeViewComponent, { static: false }) treeView: DxTreeViewComponent;

    employees: Employee[];
    selectedEmployees: Employee[] = [];

  rainfallstations: any[] = [];
  selectedrainfallstation: any;

  showCheckBoxesModes: string[] = ['normal', 'selectAll', 'none'];
  showCheckBoxesMode: string = this.showCheckBoxesModes[0];
  selectionModes: string[] = ['multiple', 'single'];
  selectionMode: string = this.selectionModes[0];

  selectNodesRecursive = true;
  selectByClick = false;

  isRecursiveDisabled = false;
  isSelectionModeDisabled = false;

  constructor(rainfallService: RainfallService) {
    rainfallService.getWaterfallStations('0002')
            .subscribe(data => {
                this.rainfallstations = data;
                console.log(data);
            });
    this.employees = rainfallService.getEmployees();
    console.log(this.employees);
   }

  ngOnInit() {
  }

  treeViewSelectionChanged(e) {
    this.syncSelection(e.component);
}

treeViewContentReady(e) {
    this.syncSelection(e.component);
}

syncSelection(treeView) {
    const selectedrainfallstation = treeView.getSelectedNodes()
        .map(node => node.itemData);
    this.selectedrainfallstation = selectedrainfallstation;
}

showCheckBoxesModeValueChanged(e) {
    this.showCheckBoxesMode = e.value;
    this.isSelectionModeDisabled = e.value === 'selectAll';
    if (e.value === 'selectAll') {
        this.selectionMode = 'multiple';
        this.isRecursiveDisabled = false;
    }
}

selectionModeValueChanged(e) {
    this.selectionMode = e.value;
    this.isRecursiveDisabled = e.value === 'single';
    if (e.value === 'single') {
        this.selectNodesRecursive = false;
        this.treeView.instance.unselectAll();
    }
}

}

