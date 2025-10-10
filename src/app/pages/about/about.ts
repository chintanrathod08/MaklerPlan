import { CommonModule, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-about',
  imports: [
    CommonModule,
    NgIf
  ],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About implements OnInit, AfterViewInit {

  showMore1 = false;
  showMore2 = false;
  showMore3 = false;
  showMore4 = false;  

  inquiriesCount = 0;
  experienceCount = 0;
  employeesCount = 0;
  customersCount = 0;

  private finalValues = {
    inquiries: 220,
    experience : 10,
    employees : 5,
    customers : 171,
  };

  constructor(private el: ElementRef, private counterService: CounterService){}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.counterService.startObserver(this.el, ()=> this.startCounter())
  }

  startCounter(){
    this.counterService.animateValue(v => (this.inquiriesCount = v), this.finalValues.inquiries, 2000)
    this.counterService.animateValue(v => (this.experienceCount = v), this.finalValues.experience, 2000)
    this.counterService.animateValue(v => (this.employeesCount = v), this.finalValues.employees, 2000)
    this.counterService.animateValue(v => (this.customersCount = v), this.finalValues.customers, 2000)
  }

  toggleReadMore(index: number) {
    switch (index) {
      case 1:
        this.showMore1 = !this.showMore1
        break;
      case 2:
        this.showMore2 = !this.showMore2
        break
      case 3:
        this.showMore3 = !this.showMore3
        break
      case 4:
        this.showMore4 = !this.showMore4
        break
    }
  }

}
