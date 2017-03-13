import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Seller, SellersService } from '../../sellers.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDlgComponent } from '../seller-dlg/seller-dlg.component';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})

export class SellerComponent implements OnInit {
  sellerId: number;
  @Input() seller: Seller;
  @Output() sellerUpdated = new EventEmitter();

  constructor(private modalService: NgbModal, private router: Router,
    private route: ActivatedRoute, private service: SellersService) { }

  ngOnInit() {

  }

  onEdit() {
    // Code which displays a dialog, and if the user
    // presses the OK button we notify about it:
    const modalInstance = this.modalService.open(SellerDlgComponent);
    modalInstance.componentInstance.seller = this.seller;
    modalInstance.result.then(obj => {
      console.log('Dialog was closed using OK');
          const params = {
            id: this.sellerId,
            name: obj.name,
            category: obj.category,
            imagePath: obj.imagePath
          };
      this.service.updateSeller(params, this.seller.id).subscribe(result => {
      });
    }).catch(err => {
      console.log('Dialog was closed using cancel');
      console.log(err);
    });

    this.sellerUpdated.emit(this.seller);
  }

  onVisitSellerDetails(seller: Seller) {
    this.router.navigate(['/sellerdetails/' + seller.id])
  }

}
