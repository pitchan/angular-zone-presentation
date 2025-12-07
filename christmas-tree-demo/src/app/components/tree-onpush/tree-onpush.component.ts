import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tree-onpush',
  standalone: true,
  imports: [CommonModule], // Nécessaire pour *ngIf
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tree-onpush.component.html'
})
export class TreeOnPushComponent {
  @Input() triggerValue: any; // Pour le test Async Pipe / Timer
  @Input() message: string = ''; // Pour le test Input Field

  checkCount = 0;
  @ViewChild('treeContainer') container!: ElementRef;

  constructor(private renderer: Renderer2) {}

  checkVisualizer() {
    this.checkCount++;
    this.triggerFlash();
    return '';
  }

  onClick() {
    console.log('[TreeOnPush] Click interne détecté -> CD automatique');
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
