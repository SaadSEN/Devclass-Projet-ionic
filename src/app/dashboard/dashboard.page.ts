import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication-service';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { CrudService } from '../shared/crud.service';
import { Formations } from '../shared/formation';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ConfirmationPage } from '../confirmation/confirmation.page';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})



export class DashboardPage implements OnInit {

  
  FormationList: any[];
  loggedUser : any = this.authService.getCurrentUser();
  public enrollments : Formations;
  
  
  constructor(public authService: AuthenticationService,
    public router:Router,
    private crudService: CrudService,
    private route: ActivatedRoute,
    public data: CrudService,
    public afDB: AngularFireDatabaseModule,
    public afs: AngularFireStorageModule,) {}

    Confirmation(formationId : any) {
      console.log(formationId)
      this.router.navigate([`confirmation/${formationId}`])
      this.crudService.getFormation(formationId).valueChanges().subscribe((formation:Formations) =>{
        this.crudService.enrollFormation(this.loggedUser.uid, formation);
      })
    }
  
  ngOnInit() {
    this.crudService.getEnrollements(this.loggedUser.uid).valueChanges().subscribe(res => {
      let enrolledIds = res.map(e => e.Id);
      this.data.getAllFormations().subscribe((res) => {
        this.FormationList = res.map((t) => {
          let formationObj = t.payload.doc.data() as any;
          formationObj['enrolled'] = enrolledIds.includes(formationObj.Id);
          console.log(formationObj)
          return {
            id: t.payload.doc.id,
            ...formationObj
          };
        })
      });
    });


    
    
    
  }
  }
  