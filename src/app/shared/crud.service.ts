import { Injectable } from '@angular/core';
import {
  AngularFirestore
} from '@angular/fire/compat/firestore';
import { Formations } from './formation';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  FormationListRef: AngularFireList<any>;
  FormationRef: AngularFireObject<any>;

  constructor(private afs:AngularFirestore,private db: AngularFireDatabase) {}

    getAllFormations(){
      return this.afs.collection('Formations').snapshotChanges();
    
   }
  
    getFormation(id: string) {
      return this.afs.collection('/Formations/').doc(id);
    }

    enrollFormation(userId: string, formation : any){
      console.log(formation)
      this.afs.doc(`/users/${userId}/formations/${formation.Id}`).set(formation);
    }

    getEnrollements(userId : string) : any {
      return this.afs.collection(`/users/${userId}/formations`);
    }

}
