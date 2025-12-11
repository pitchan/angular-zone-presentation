import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { TreeDefaultComponent } from '../../components/tree-default/tree-default.component';

@Component({
  selector: 'app-zone-page',
  standalone: true,
  imports: [TreeDefaultComponent],
  templateUrl: './zone-page.component.html',
  styleUrl: './zone-page.component.css'
})
export class ZonePageComponent implements OnInit, OnDestroy {
  // === TEST 1: setTimeout ===
  setTimeoutCounter = 0;
  
  // === TEST 2: addEventListener (hors template) ===
  mouseCounter = 0;
  private mouseHandler = () => {
    this.mouseCounter++;
    console.log('[Zone Default] MouseMove:', this.mouseCounter);
  };
  
  // === TEST 3: fetch/Promise ===
  fetchCounter = 0;
  
  // === TEST 4: Event template (témoin) ===
  clickCounter = 0;
  
  // === TEST 5: Signal ===
  signalCounter = signal(0);

  ngOnInit() {
    // TEST 1: setTimeout modifie une propriété toutes les 2 secondes
    setInterval(() => {
      this.setTimeoutCounter++;
      console.log('[Zone Default] setTimeout:', this.setTimeoutCounter);
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
        console.log('[Zone Default] Promise resolved:', this.fetchCounter);
      });
    }, 5000);
  }

  // TEST 4: Event template (click)
  handleClick() {
    this.clickCounter++;
    console.log('[Zone Default] Template click:', this.clickCounter);
  }

  // TEST 5: Modification via Signal
  incrementSignal() {
    this.signalCounter.update(c => c + 1);
    console.log('[Zone Default] Signal:', this.signalCounter());
  }

  ngOnDestroy() {
    const mouseZone = document.getElementById('mouseZone');
    if (mouseZone) {
      mouseZone.removeEventListener('mousemove', this.mouseHandler);
    }
  }
}
