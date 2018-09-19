import { Component, OnInit } from '@angular/core';

import {ClientService} from '../../services/client.service';

import {Client} from '../../model/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  totalOwed: number;
  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(c => {
      this.clients = c;
      this.totalOwed = this.getTotalOwed();
    });
  }
  
  getTotalOwed() :number {
    const total = this.clients.reduce((total,client) => {
      return total + client.balance;
    },0);
    return total;
  }

}
