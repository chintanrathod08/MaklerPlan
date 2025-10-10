import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CounterService } from '../../services/counter.service';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    TabsModule, 
    MatTabsModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Home implements OnInit, AfterViewInit {
  
  activeTab = 0;

  showMore1 = false;
  showMore2 = false;  
  showMore3 = false;
  showMore4 = false;
  showMore5 = false;

  brokersCount = 0;
  inquiriesCount = 0;
  expertiseCount = 0;
  satisfactionCount = 0;

  private finalValues = {
    brokers: 400,
    inquiries: 270,
    expertise: 2007,
    satisfaction: 98.7,
  };

  constructor(private el: ElementRef, private counterService: CounterService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.counterService.startObserver(this.el, () => this.startCounters());
  }

  startCounters() {
    this.counterService.animateValue(v => (this.brokersCount = v), this.finalValues.brokers, 2000);
    this.counterService.animateValue(v => (this.inquiriesCount = v), this.finalValues.inquiries, 2000);
    this.counterService.animateValue(v => (this.expertiseCount = v), this.finalValues.expertise, 2000);
    this.counterService.animateValue(v => (this.satisfactionCount = v), this.finalValues.satisfaction, 2000);
  }

  toggleReadMore(index: number) {
    switch (index) {
      case 1:
        this.showMore1 = !this.showMore1;
        break;
      case 2:
        this.showMore2 = !this.showMore2;
        break;
      case 3:
        this.showMore3 = !this.showMore3;
        break;
      case 4:
        this.showMore4 = !this.showMore4;
        break;
      case 5:
        this.showMore5 = !this.showMore5;
        break;
    }
  }
}