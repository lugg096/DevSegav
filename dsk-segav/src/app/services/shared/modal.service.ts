import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  bsModalRef: BsModalRef;

  constructor(private bsModalService: BsModalService) { }

  showModal(component: any, data: any, clases?: string) {
    const options = {
      initialState: data,
      class: clases
    };

    this.bsModalRef = this.bsModalService.show(component, options);
    return new Observable<any>(this.getContentModal());
  }

  private getContentModal() {
    return (observer) => {
      const subscription = this.bsModalService.onHidden.subscribe(_ => {
        observer.next(this.bsModalRef.content);
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      }
    }
  }

}
