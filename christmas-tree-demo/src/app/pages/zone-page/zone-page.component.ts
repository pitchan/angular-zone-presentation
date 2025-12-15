import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { TreeDefaultComponent } from '../../components/tree-default/tree-default.component';
import { delay, interval, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-zone-page',
  standalone: true,
  imports: [TreeDefaultComponent],
  templateUrl: './zone-page.component.html',
  styleUrl: './zone-page.component.css'
})
export class ZonePageComponent implements OnInit, OnDestroy {
  // === TEST 1: setInterval ===
  setIntervalCounter = 0;
  
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
      this.setIntervalCounter++;
      console.log('[Zone Default] setInterval:', this.setIntervalCounter);
    }, 2000);

    // TEST 2: addEventListener manuel (hors template)
    const mouseZone = document.getElementById('mouseZone');
    if (mouseZone) {
      mouseZone.addEventListener('mousemove', this.mouseHandler);
    }    
  }

  constructor() {
    // TEST 3: Observable automatique toutes les 5 secondes
    interval(5000).pipe(
      takeUntilDestroyed()
    ).subscribe(() => {
      this.fetchCounter++;
      console.log('[Zone Default] Initial data loaded each 5s');
    });
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
