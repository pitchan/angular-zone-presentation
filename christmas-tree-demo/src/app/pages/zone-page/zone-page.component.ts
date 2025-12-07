import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TreeDefaultComponent } from '../../components/tree-default/tree-default.component';

@Component({
  selector: 'app-zone-page',
  standalone: true,
  imports: [TreeDefaultComponent],
  templateUrl: './zone-page.component.html',
  styleUrl: './zone-page.component.css'
})
export class ZonePageComponent implements OnInit, OnDestroy {
  // On récupère la zone d'interaction pour y attacher l'event manuellement
  @ViewChild('zone') zoneRef!: ElementRef;
  
  private mouseHandler = () => this.handleEvent();

  ngOnInit() {
    // ICI EST LA PREUVE ULTIME !
    // On attache un écouteur manuellement (comme le ferait une lib externe, ex: Chart.js, Leaflet...)
    
    // CAS 1 : Avec Zone.js actif -> Zone patche addEventListener -> Le sapin clignotera.
    // CAS 2 : En Zoneless -> addEventListener est natif (muet) -> Le sapin NE CLIGNOTERA PLUS.
    
    // On écoute sur tout le document pour être sûr (ou sur la zoneRef après viewInit)
    // Pour l'exemple simple, un setInterval est encore plus visuel et "automatique"
    
    // Mais gardons l'interaction souris pour rester cohérent avec ton scénario :
    document.addEventListener('mousemove', this.mouseHandler);
  }

  handleEvent() {
    // On fait un calcul bidon, mais on ne prévient pas Angular explicitement
    Math.random(); 
    // Console pour prouver que l'event passe bien
    // console.log('Mouse move natif détecté'); 
  }

  ngOnDestroy() {
    document.removeEventListener('mousemove', this.mouseHandler);
  }
}
