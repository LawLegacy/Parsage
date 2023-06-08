
import { Component, OnInit, OnDestroy, Input, TemplateRef, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-todo-demo',
  templateUrl: './todo-demo.component.html',
  styleUrls: ['./todo-demo.component.scss']
})
export class TodoDemoComponent implements OnInit, OnDestroy {
  public static readonly DBKeyTodoDemo = 'todo-demo.todo_list';

  rows = [];
  rowsCache = [];
  columns = [];
  editing = {};
  bikeEdit: any = {};
  isDataLoaded = false;
  loadingIndicator = true;
  formResetToggle = true;
  _currentUserId: string;
  _hideCompletedTasks = false;


  
  set hideCompletedTasks(value: boolean) {

    if (value) {
      this.rows = this.rowsCache.filter(r => !r.completed);
    } else {
      this.rows = [...this.rowsCache];
    }


    this._hideCompletedTasks = value;
  }

  get hideCompletedTasks() {
    return this._hideCompletedTasks;
  }


  @Input()
  verticalScrollbar = false;


  @ViewChild('statusHeaderTemplate', { static: true })
  statusHeaderTemplate: TemplateRef<any>;

  @ViewChild('statusTemplate', { static: true })
  statusTemplate: TemplateRef<any>;

  @ViewChild('manufacturerTemplate', { static: true })
  manufacturerTemplate: TemplateRef<any>;

  @ViewChild('descriptionTemplate', { static: true })
  descriptionTemplate: TemplateRef<any>;

  @ViewChild('framesizeTemplate', { static: true })
  framesizeTemplate: TemplateRef<any>;

  @ViewChild('priceTemplate', { static: true })
  priceTemplate: TemplateRef<any>;


  @ViewChild('actionsTemplate', { static: true })
  actionsTemplate: TemplateRef<any>;

  @ViewChild('editorModal', { static: true })
  editorModal: ModalDirective;


  constructor() {
  }



  ngOnInit() {
    this.loadingIndicator = true;

    this.fetch((data) => {
      this.refreshDataIndexes(data);
      this.rows = data;
      this.rowsCache = [...data];
      this.isDataLoaded = true;

      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });


    this.columns = [
      { prop: 'manufacturer', name: 'manufacturer', cellTemplate: this.manufacturerTemplate, width: 100 },
      { prop: 'model', name: 'Model', cellTemplate: this.descriptionTemplate, width: 100 },
      { prop: 'framesize', name: 'Frame Size', cellTemplate: this.framesizeTemplate, width: 100 },
      { prop: 'price', name: 'Price', cellTemplate: this.priceTemplate, width: 100 },
      { name: '', width: 80, cellTemplate: this.actionsTemplate, resizeable: false, canAutoResize: false, sortable: false, draggable: false }
    ];
  }

  ngOnDestroy() {
    this.saveToDisk();
  }



  fetch(cb) {
    let data = this.getFromDisk();

    if (data == null) {
      setTimeout(() => {

        data = this.getFromDisk();

        if (data == null) {
          data = [
            { manufacturer: 'Manufacturer 1', model: 'Model 1', framesize: '50', price: "$250" },
            { manufacturer: 'Manufacturer 2', model: 'Model 2', framesize: '100', price: "$450" },
            { manufacturer: 'Manufacturer 3', model: 'Model 3', framesize: '200', price: "$600" },
            { manufacturer: 'Manufacturer 4', model: 'Model 4', framesize: '300', price: "$620" },
            { manufacturer: 'Manufacturer 5', model: 'Model 5', framesize: '100', price: "$650" },
            { manufacturer: 'Manufacturer 6', model: 'Model 6', framesize: '100', price: "$670" },
            { manufacturer: 'Manufacturer 7', model: 'Model 7', framesize: '100', price: "$650" },
          ];
        }

        cb(data);
      }, 1000);
    } else {
      cb(data);
    }
  }


  refreshDataIndexes(data) {
    let index = 0;

    for (const i of data) {
      i.$$index = index++;
    }
  }

  showErrorAlert(caption: string, message: string) {
    
  }


  addBike() {
    this.formResetToggle = false;

    setTimeout(() => {
      this.formResetToggle = true;

      this.bikeEdit = {};
      this.editorModal.show();
    });
  }

  save() {
    this.rowsCache.splice(0, 0, this.bikeEdit);
    this.rows.splice(0, 0, this.bikeEdit);
    this.refreshDataIndexes(this.rowsCache);
    this.rows = [...this.rows];

    this.saveToDisk();
    this.editorModal.hide();
  }


  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    this.rows[row.$$index][cell] = event.target.value;
    this.rows = [...this.rows];

    this.saveToDisk();
  }


  delete(row) {
    this.deleteHelper(row)
  }


  deleteHelper(row) {
    this.rowsCache = this.rowsCache.filter(item => item !== row);
    this.rows = this.rows.filter(item => item !== row);

    this.saveToDisk();
  }

  getFromDisk() {
    return null;
  }

  saveToDisk() {
    if (this.isDataLoaded) {
    }
  }
}
