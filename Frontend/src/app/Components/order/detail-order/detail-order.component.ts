import { Order } from '../../../Shared/Models/Order.model';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../Shared/services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css'],
})
export class DetailOrderComponent implements OnInit {
  id;
  data: Order;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.fetchOrder();
  }

  fetchOrder() {
    console.log('from component :' + this.id);
    this.orderService.getDetailsOrder(this.id).subscribe(
      (res) => {
        this.data = res;
      },
      (err) => console.log('error   =>  ' + err)
    );
  }

  imprimer() {
    console.log("hehe")
  }
}
