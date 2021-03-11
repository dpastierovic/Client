import { Component, Input, OnInit, } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit {
  @Input() pageSize: number
  @Input() itemsCount: Observable<number>
  @Input() currentPage: BehaviorSubject<number>

  pageCurrent: number = 1
  goToNumber: number = 1
  pageCount: number = 1

  constructor() {

  }

  ngOnInit() {
    this.itemsCount.subscribe(_ => this.pageCount = Math.ceil(_ / this.pageSize))
  }

  onPageChanged(pageNumber: number){
    console.log('changing to ' + pageNumber)
    if (pageNumber == this.pageCurrent) return
    if (pageNumber < 1) pageNumber = 1
    if (pageNumber > this.pageCount) pageNumber = this.pageCount

    this.pageCurrent = pageNumber
    this.currentPage.next(this.pageCurrent)
  }

  onKey(event){
    this.goToNumber = parseInt(event.target.value)
  }

  navigateToPage() {
    this.onPageChanged(this.goToNumber)
  }
}
