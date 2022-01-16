import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { IMAGES_SIZES } from '../../constants/images-sizes';
import { Movie } from '../../models/movie';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    animations: [
        trigger('slideFade', [
            state('void', style({ opacity: 0 })),
            transition('void <=> *', [animate('1s')]),
        ]),
    ],
})
export class SliderComponent implements OnInit {
    @Input() items: Movie[] = [];
    @Input() isBanner: boolean = false;

    currentSlideIndex: number = 0;

    readonly imagesSizes = IMAGES_SIZES;

    // Setting Timer Slide: sum is currentSlideIndex = 20 movies => ++currentSlideIndex + items.length = 21 % 20 = 1...
    ngOnInit(): void {
        // if isBanner = true --> display movie detail was set 5000
        if (!this.isBanner) {
            setInterval(() => {
                this.currentSlideIndex =
                    ++this.currentSlideIndex % this.items.length;
            }, 5000);
        }
    }
}
