import { Component,DestroyRef,OnInit, inject, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent {
  places = signal<Place[] | undefined>(undefined);
  private httpClient = inject(HttpClient)
  private destroyRef = inject(DestroyRef)
  
  ngOnInit(){
    const subscription = this.httpClient.get<{places: Place[]  }>("http://localhost:3000/places", {
      observe: 'response'
    }).pipe().subscribe({
      next: (response)=> {
        this.places.set(response.body?.places)
      }
    })

    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe()
    })

    
  }
}
