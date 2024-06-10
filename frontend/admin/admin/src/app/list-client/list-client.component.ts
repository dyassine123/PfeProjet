import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../entities/Client.Entity';
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
  role: String;
  listClient: Client[] = [];
  searchQuery: string = '';

  constructor(private service: CrudService, private router: Router) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role") as string;
    this.service.getClient().subscribe(client => {
      this.listClient = client;
    });
  }

  get filteredClients(): Client[] {
    return this.searchQuery
      ? this.listClient.filter(client =>
          client.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          client.prenom.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      : this.listClient;
  }

  p:number=1;
  collection:any[]
}
