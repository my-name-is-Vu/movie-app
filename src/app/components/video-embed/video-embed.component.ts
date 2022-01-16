import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-video-embed',
    templateUrl: './video-embed.component.html',
    styleUrls: ['./video-embed.component.scss'],
})
export class VideoEmbedComponent implements OnInit {
    @Input() site: string = 'Youtube';
    @Input() key: string | null = null;

    videoUrl: SafeResourceUrl = '';

    constructor(private sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        switch (this.site) {
            case 'YouTube':
                this.videoUrl = this.getSafeUrl(
                    'https://www.youtube.com/embed/' + this.key
                );
                break;
            case 'Vimeo':
                this.videoUrl = this.getSafeUrl(
                    'https://www.vimeo.com/embed/' + this.key
                );
                break;
        }
    }

    // sanitizer is checking url on link youtube embed trusted or not
    getSafeUrl(url: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
