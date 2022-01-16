import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
    movies: Movie[] = [];
    genreId: string | null = null;
    searchValue: string | null = null;

    constructor(
        private moviesService: MoviesService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
            if (genreId) {
                this.genreId = genreId;
                this.getMoviesByGenre(genreId, 1);
            } else {
                // add 1 is first page
                this.getPagedMovies(1);
            }
        });
    }

    // when call this method with specific number Iam going to generate the new items to that array
    getPagedMovies(page: number, searchKeyword?: string) {
        this.moviesService
            .searchMovies(page, searchKeyword)
            .subscribe((movies) => {
                this.movies = movies;
            });
    }

    // search follow the type id movie in genres
    getMoviesByGenre(genreId: string, page: number) {
        this.moviesService
            .getMoviesByGenre(genreId, page)
            .subscribe((movies) => {
                this.movies = movies;
            });
    }

    //  page start from 0, so I need to add 1
    paginate(event: any) {
        const pageNumber = event.page + 1;
        if (this.genreId) {
            this.getMoviesByGenre(this.genreId, pageNumber);
        } else {
            if (this.searchValue) {
                this.getPagedMovies(pageNumber, this.searchValue);
            } else {
                this.getPagedMovies(pageNumber);
            }
        }
    }

    searchChanged() {
        if (this.searchValue) {
            this.getPagedMovies(1, this.searchValue);
        }
    }
}
