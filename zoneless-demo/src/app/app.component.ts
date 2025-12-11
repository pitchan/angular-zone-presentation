import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { TreeComponent } from './components/tree-zoneless/tree.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [TreeComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  // === TEST 1: setTimeout ===
  setTimeoutCounter = 0;
  
  // === TEST 2: addEventListener (hors template) ===
  mouseCounter = 0;
  private mouseHandler = () => {
    this.mouseCounter++;
    console.log('[Zoneless] MouseMove:', this.mouseCounter);
  };
  
  // === TEST 3: fetch/Promise ===
  fetchCounter = 0;
  
  // === TEST 4: Event template (témoin) ===
  clickCounter = 0;
  
  // === TEST 5: Signal ===
  signalCounter = signal(0);

  ngOnInit() {
    // TEST 1: setTimeout modifie une propriété toutes les 2 secondes
    // ⚠️ Zoneless: AUCUNE mise à jour automatique !
    setInterval(() => {
      this.setTimeoutCounter++;
      console.log('[Zoneless] setTimeout:', this.setTimeoutCounter);
    }, 2000);

    // TEST 2: addEventListener manuel (hors template)
    const mouseZone = document.getElementById('mouseZone');
    if (mouseZone) {
      mouseZone.addEventListener('mousemove', this.mouseHandler);
    }

    // TEST 3: fetch/Promise automatique toutes les 5 secondes
    setInterval(() => {
      Promise.resolve().then(() => {
        this.fetchCounter++;
        console.log('[Zoneless] Promise resolved:', this.fetchCounter);
      });
    }, 5000);
  }

  // TEST 4: Event template (click)
  handleClick() {
    this.clickCounter++;
    console.log('[Zoneless] Template click:', this.clickCounter);
  }

  // TEST 5: Modification via Signal
  incrementSignal() {
    this.signalCounter.update(c => c + 1);
    console.log('[Zoneless] Signal:', this.signalCounter());
  }

  ngOnDestroy() {
    const mouseZone = document.getElementById('mouseZone');
    if (mouseZone) {
      mouseZone.removeEventListener('mousemove', this.mouseHandler);
    }
  }
}

