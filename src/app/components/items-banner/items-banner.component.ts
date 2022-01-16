import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
    selector: 'app-items-banner',
    templateUrl: './items-banner.component.html',
    styleUrls: ['./items-banner.component.scss'],
})
export class ItemsBannerComponent {
    //  Get data to child home component
    @Input() items: Movie[] = [];

    @Input() title: string = '';
}
