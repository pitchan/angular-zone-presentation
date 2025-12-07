import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeOnPushComponent } from '../../components/tree-onpush/tree-onpush.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-onpush-page',
  standalone: true,
  imports: [CommonModule, TreeOnPushComponent],
  templateUrl: './onpush-page.component.html',
  styleUrl: './onpush-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPushPageComponent {
  // Pour le test Champ Texte (Règle 1)
  userMessage = '';

  // Pour le test Async Pipe (Règle 4)
  asyncStream$ = new BehaviorSubject<number>(0);

  constructor(private cdr: ChangeDetectorRef) {}

  // REGLE 1 : Input change
  updateMessage(value: string) {
    this.userMessage = value;
    // Ici, pas besoin de markForCheck.
    // Le fait de changer this.userMessage (qui est lié à [message] du sapin)
    // va déclencher la détection sur le sapin car ses inputs changent.
  }

  // REGLE 4 : Async Pipe
  triggerAsyncPipe() {
    this.asyncStream$.next(this.asyncStream$.value + 1);
  }

  onMouseMove() {} 
  onScroll() {}
}
