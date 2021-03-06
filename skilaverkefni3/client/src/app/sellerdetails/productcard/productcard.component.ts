 import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
 import {SellerProduct, SellersService} from '../../sellers.service';
 import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
 import { ProductDlgComponent } from '../product-dlg/product-dlg.component';
 import { Router, ActivatedRoute } from '@angular/router';
 import { ToastrService } from 'ngx-toastr';


 @Component({
  selector: 'app-product-card',
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.css']
})

export class ProductCard implements OnInit {
  sellerId: number;
  @Input() product: SellerProduct;
  @Output() productUpdated = new EventEmitter();

  constructor(private modalService: NgbModal, private route: ActivatedRoute, private service: SellersService, private toastrService: ToastrService) {}

  ngOnInit() {
    this.sellerId = this.route.snapshot.params['id'];
  }

  onEdit(id) {
    const modalInstance = this.modalService.open(ProductDlgComponent);
    modalInstance.componentInstance.product = this.product;
    modalInstance.result.then(obj => {
          const params = {
            id: this.sellerId,
            name: obj.name,
            price: obj.price,
            quantityInStock: obj.quantityInStock,
            imagePath: obj.imagePath
          };
      this.service.updateProduct(params, 1, id).subscribe(result => {
        this.toastrService.success('Þú hefur breytt vöru!');
      });
    });
    this.productUpdated.emit(this.product);
  }

}
