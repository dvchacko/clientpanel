import { Injectable } from '@angular/core';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import {Client} from '../model/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;
  
  constructor(private afs: AngularFirestore) {
    this.clientCollection = this.afs.collection('client', ref => ref.orderBy('lastName','asc'));
  
   }
  
  getClients() : Observable<Client[]>{
 
    this.clients = this.clientCollection.snapshotChanges().pipe(map(actions =>actions.map(a => {
    
      const data = a.payload.doc.data() as Client;
      data.id = a.payload.doc.id;
      return data;
    })));
    
    return this.clients;
    
  }
  
  newClient(client:Client) {
	  this.clientCollection.add(client);
  }
}
