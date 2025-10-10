import { ElementRef, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class CounterService {

    private observer!: IntersectionObserver;

    startObserver(el: ElementRef, callback: () => void) {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        callback(); // triggers your counter animation
                        this.observer.disconnect();
                    }
                });
            },
            { threshold: 0.3 }
        );

        const target = el.nativeElement.querySelector('#counterSection');
        if (target) this.observer.observe(target);
    }

    animateValue(updateFn: (value: number) => void, end: number, duration: number) {
        const start = 0;
        const range = end - start;
        const startTime = performance.now();

        const step = (currentTime: number) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const newValue = +(start + range * progress).toFixed(1);
            updateFn(newValue);

            if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    }

}