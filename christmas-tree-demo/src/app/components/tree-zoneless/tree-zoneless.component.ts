import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewChild, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tree-zoneless',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush, // Zoneless s'appuie sur OnPush
  templateUrl: './tree-zoneless.component.html',
  styles: [`
    .pulse { animation: pulse-anim 0.3s ease-out; border: 2px solid white; }
    @keyframes pulse-anim { 0% { transform: scale(1.5); } 100% { transform: scale(1); } }
  `]
})
export class TreeZonelessComponent {
  // Signal Input (nouveauté Angular)
  counter = input(0);

  // Signaux internes pour chaque boule
  // On initialise avec des couleurs fixes
  ball1Color = signal('#f44336'); // Rouge
  ball2Color = signal('#fbc02d'); // Or
  ball3Color = signal('#1976d2'); // Bleu

  // Pour l'effet visuel de "quelle boule vient de changer"
  lastChanged = 0;

  checkCount = 0;
  @ViewChild('treeContainer') container!: ElementRef;

  constructor(private renderer: Renderer2) {}

  // Méthode publique pour changer une seule couleur
  changeColor(ballIndex: number) {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
    const newColor = colors[Math.floor(Math.random() * colors.length)];

    this.lastChanged = ballIndex;
    
    // Mise à jour ciblée du signal
    if (ballIndex === 1) this.ball1Color.set(newColor);
    if (ballIndex === 2) this.ball2Color.set(newColor);
    if (ballIndex === 3) this.ball3Color.set(newColor);
    
    // En Zoneless, le simple fait de set un signal utilisé dans le template
    // déclenche le rafraîchissement.
  }

  checkVisualizer() {
    this.checkCount++;
    this.triggerFlash();
    return '';
  }

  triggerFlash() {
    if (this.container) {
      const el = this.container.nativeElement;
      this.renderer.addClass(el, 'tree-flash');
      setTimeout(() => this.renderer.removeClass(el, 'tree-flash'), 500);
    }
  }
}

