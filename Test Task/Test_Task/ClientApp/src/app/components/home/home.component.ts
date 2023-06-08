import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

interface WidgetIndex { element: string, index: number }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  {
  dragStartDelay = 200;
  readonly DBKeyWidgetsOrder = 'home-component.widgets_order';

  @ViewChild('widgetsContainer', { read: ElementRef })
  widgetsContainer: ElementRef<HTMLDivElement>

  constructor() {

  }

  insertChildAtIndex(parent: HTMLDivElement, child: Element, index: number) {
    if (!index)
      index = 0

    if (index >= parent.children.length) {
      parent.appendChild(child)
    } else {
      parent.insertBefore(child, parent.children[index])
    }
  }

  drop(event: CdkDragDrop<HTMLDivElement>) {
    const el = event.item.element.nativeElement;
    const parentEle = event.container.element.nativeElement;
    const anchorEle = parentEle.children[event.currentIndex];

    const widgetIndexes = new Array<WidgetIndex>(parentEle.children.length);

    for (var i = 0; i < parentEle.children.length; i++) {
      widgetIndexes[i] = { element: parentEle.children[i].id, index: i };
    }

    moveItemInArray(widgetIndexes, event.previousIndex, event.currentIndex)

    for (var i = 0; i < widgetIndexes.length; i++) {
      widgetIndexes[i].index = i;
    }

    if (event.currentIndex < event.previousIndex)
      parentEle.insertBefore(el, anchorEle);
    else
      parentEle.insertBefore(el, anchorEle.nextElementSibling);

  }



}
