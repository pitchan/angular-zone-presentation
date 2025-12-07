import { Component, signal, ViewChild } from '@angular/core';
import { TreeZonelessComponent } from '../../components/tree-zoneless/tree-zoneless.component';

@Component({
  selector: 'app-zoneless-page',
  standalone: true,
  imports: [TreeZonelessComponent],
  templateUrl: './zoneless-page.component.html',
  styleUrl: './zoneless-page.component.css' // Création du fichier CSS nécessaire
})
export class ZonelessPageComponent {
  counterSignal = signal(0);
  
  @ViewChild(TreeZonelessComponent) tree!: TreeZonelessComponent;

  incrementSignal() {
    this.counterSignal.update(v => v + 1);
  }

  // Appelle la méthode du composant enfant pour changer juste un signal
  updateBall(index: number) {
    this.tree.changeColor(index);
  }

  onMouseMove() {}
  onScroll() {}
}
