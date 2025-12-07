import { Component, OnInit, signal } from '@angular/core';
import { TreeComponent } from './tree.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TreeComponent, CommonModule],
  template: `
    <div class="container">
      <h1>🚫 Zoneless Demo (Angular 19+)</h1>
      <p>Bienvenue dans le monde sans magie noire.</p>

      <div style="display: flex; gap: 20px; text-align: left;">
        
        <!-- COLONNE GAUCHE : LE SAPIN -->
        <div style="flex: 1; display: flex; justify-content: center; align-items: flex-start;">
          <app-tree 
            [color1]="c1()" 
            [color2]="c2()" 
            [color3]="c3()">
          </app-tree>
        </div>

        <!-- COLONNE DROITE : LES PREUVES -->
        <div style="flex: 2;">
          
          <!-- PREUVE 1 : SetInterval Natif -->
          <div class="card">
            <h3>1. La Preuve du Silence <span class="proof-tag success">Zoneless</span></h3>
            <p>Ce compteur natif tourne en fond (console.log).<br>
               <strong>Avec Zone.js</strong> : Il mettrait à jour la vue (magie).<br>
               <strong>Sans Zone.js</strong> : Il ne fait RIEN à l'écran.</p>
            
            <div style="font-size: 2rem; font-family: monospace; color: #ff5722;">
              {{ nativeCounter }}
            </div>
            <small>(Regardez la console : il tourne ! Mais l'écran reste figé.)</small>
          </div>

          <!-- PREUVE 2 : Event Handler -->
          <div class="card">
            <h3>2. Event Handler (Template) <span class="proof-tag">Refresh !</span></h3>
            <p>Un clic déclenche <strong>toujours</strong> une détection.</p>
            <button (click)="refreshView()">Forcer un rafraîchissement</button>
            <small>Cliquez -> Le compteur natif ci-dessus se mettra à jour d'un coup !</small>
          </div>

          <!-- PREUVE 3 : Signaux -->
          <div class="card">
            <h3>3. Signaux (Précision) <span class="proof-tag success">Réactif</span></h3>
            <p>Modifiez un seul signal -> Mise à jour.</p>
            <div style="display: flex; gap: 5px;">
              <button (click)="changeC1()" style="background: #c62828;">Boule 1</button>
              <button (click)="changeC2()" style="background: #fbc02d; color: black;">Boule 2</button>
              <button (click)="changeC3()" style="background: #1976d2;">Boule 3</button>
            </div>
          </div>

        </div>
      </div>

    </div>
  `
})
export class AppComponent implements OnInit {
  // Signaux pour les couleurs
  c1 = signal('#c62828');
  c2 = signal('#fbc02d');
  c3 = signal('#1976d2');

  // Compteur "fantôme" (non-signal)
  nativeCounter = 0;

  ngOnInit() {
    // PREUVE ULTIME : Ce setInterval ne déclenche AUCUN refresh vue en Zoneless.
    setInterval(() => {
      this.nativeCounter++;
      console.log('Tick natif (invisible en Zoneless) :', this.nativeCounter);
    }, 1000);
  }

  refreshView() {
    console.log('Click -> Angular intercepte et rafraîchit !');
    // Le simple fait d'avoir ce handler lié dans le template déclenche le refresh.
    // Donc 'nativeCounter' se mettra à jour à l'écran à cet instant précis.
  }

  changeC1() { this.c1.set(this.randomColor()); }
  changeC2() { this.c2.set(this.randomColor()); }
  changeC3() { this.c3.set(this.randomColor()); }

  private randomColor() {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}

