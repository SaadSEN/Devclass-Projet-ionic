import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CrudService } from '../shared/crud.service';
import { Formations } from '../shared/formation';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {
  selectedFormation : Formations = null;

  constructor(private router:Router, private route: ActivatedRoute, private crudeService : CrudService) { 
    this.crudeService.getFormation(this.route.snapshot.paramMap.get('id')).valueChanges().subscribe((formation:Formations) =>{
      this.selectedFormation = formation;
    })



  }

  ngOnInit() {
  }

}
