import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
})
export class TreeComponent {
  checkCount = 0;
  @ViewChild('treeContainer') container!: ElementRef;

  constructor(private renderer: Renderer2) {}

  checkVisualizer() {
    this.checkCount++;
    if (this.checkCount % 10 === 0) { 
      this.triggerFlash(); 
    }
    return '';
  }

  getGlitterColor(index: number): string {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  triggerFlash() {
    if (this.container) {
      const el = this.container.nativeElement;
      this.renderer.addClass(el, 'tree-flash');
      setTimeout(() => this.renderer.removeClass(el, 'tree-flash'), 500);
    }
  }
}

