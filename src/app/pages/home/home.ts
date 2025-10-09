import { CommonModule, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TabsModule, NgIf],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Home implements OnInit, AfterViewInit {
  activeTab = '0';
  showMore1 = false;
  showMore2 = false;
  showMore3 = false;
  showMore4 = false;
  showMore5 = false;

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
        this.showMore5 = !this.showMore5
    }
  }

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

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.startCounters();
            this.observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    const target = this.el.nativeElement.querySelector('#counterSection');
    if (target) this.observer.observe(target);
  }

 

  startCounters() {
    this.animateValue('brokersCount', this.finalValues.brokers, 2000);
    this.animateValue('inquiriesCount', this.finalValues.inquiries, 2000);
    this.animateValue('expertiseCount', this.finalValues.expertise, 2000);
    this.animateValue('satisfactionCount', this.finalValues.satisfaction, 2000);
  }


  animateValue(property: keyof Home, end: number, duration: number) {
    const start = 0;
    const range = end - start;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      (this as any)[property] = +(start + range * progress).toFixed(1);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }
}