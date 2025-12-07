import { Component, ElementRef, Renderer2, ViewChild, input, effect } from '@angular/core';

@Component({
  selector: 'app-tree',
  template: `
    <div class="tree-container" #treeContainer>
      <!-- Visualizer : Appelé à chaque rendu du template -->
      {{ checkVisualizer() }}

      <div class="branches top"></div>
      <div class="branches">
        <!-- 
          Boules liées aux inputs (Signals)
          Si 'color1' change -> Angular met à jour UNIQUEMENT ce binding.
          (Et vérifie le template car c'est un changement de signal input)
        -->
        <div class="ornament o1" 
             [style.background-color]="color1()">
        </div>

        <div class="ornament o2" 
             [style.background-color]="color2()">
        </div>

        <div class="ornament o3" 
             [style.background-color]="color3()">
        </div>
      </div>
      <div class="trunk"></div>

      <div class="counter-badge">
        Rendus Template: {{ renderCount }}
      </div>
    </div>
  `
})
export class TreeComponent {
  // Inputs modernes (Signal Inputs)
  color1 = input('#c62828');
  color2 = input('#fbc02d');
  color3 = input('#1976d2');

  renderCount = 0;
  @ViewChild('treeContainer') container!: ElementRef;

  constructor(private renderer: Renderer2) {
    // Effet visuel quand une couleur change
    effect(() => {
      // On log juste pour montrer la réactivité
      console.log(`[Tree] Couleurs actuelles: ${this.color1()}, ${this.color2()}, ${this.color3()}`);
    });
  }

  checkVisualizer() {
    this.renderCount++;
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

