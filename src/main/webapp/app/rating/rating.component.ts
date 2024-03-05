import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchReviewInfoService } from './fetch-review-info.service';
import { Review } from './review.interface';
import { AccountService } from 'app/core/auth/account.service';
import { DatePipe } from '@angular/common';
import { Account } from 'app/core/auth/account.model';
import { AddReviewService } from './add-review.service';
import { CheckExistService } from './check-exist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  trackName!: string;
  albumName!: string;
  artistName!: string;
  releaseDate!: string;
  description!: string;
  avgRating!: number;
  reviewList: Review[] = [];
  account!: Account;
  imgURL!: string;
  showAlert: boolean = false;
  comment!: string;
  rating = 0;
  id!: any;
  showCommentAlert: boolean = false;
  coverSrc = 'https://i.scdn.co/image/ab67616d00001e0206be5d37ce9e28b0e23ee383';

  constructor(
    private route: ActivatedRoute,
    private fetchReviewInfoService: FetchReviewInfoService,
    private accountService: AccountService,
    private addReviewService: AddReviewService,
    private changeDetectorRef: ChangeDetectorRef,
    private checkExistService: CheckExistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.accountService.identity().subscribe(account => {
    //   this.account = account!;
    // });
    // console.log("account:");
    // console.log(this.account);

    this.route.params.subscribe(params => {
      // console.log("next is id:");
      // console.log(params['id']);
      this.id = params['id'];
      // this.router.navigate(['/rating-not-found']);
      this.fetchReviewInfoService.getReviewInfo(this.id).subscribe(data => {
        // console.log(data);

        this.checkExistService.checkExist(this.id).subscribe(data => {
          console.log('data: ');
          console.log(data);
          if (data.data.exist === 'false') {
            this.router.navigate(['/rating-not-found']);
          }
        });

        this.trackName = data.data.review.trackName;
        this.albumName = data.data.review.albumName;
        this.artistName = data.data.review.artistName;
        this.releaseDate = data.data.review.releaseDate;
        this.description = data.data.review.description;
        this.avgRating = data.data.review.avgRating;
        this.imgURL = data.data.review.imgURL;

        // console.log(this.avgRating);
        const reviewDTO = data.data.review.reviewList;
        for (let i = 0; i < reviewDTO.length; i++) {
          const review: Review = {
            userSporifyURI: reviewDTO[i].profile.userSporifyURI,
            username: reviewDTO[i].profile.username,
            // userProfileImage: reviewDTO[i].profile.profileImage,
            userProfileImage: 'https://canvas.bham.ac.uk/images/thumbnails/12421586/QWn6RBm92OGV4fNrhx2Gm7DB5r0Q5pfkhnqpoKgH',
            reviewContent: reviewDTO[i].content,
            reviewDate: reviewDTO[i].date,
            rating: reviewDTO[i].rating,
          };
          this.reviewList.push(review);
        }
        this.reviewList = this.reviewList.reverse();

        // console.log(this.trackName);
        // console.log(this.albumName);
        // console.log(this.artistName);
        // console.log(this.releaseDate);
        // console.log(this.description);
      });
    });
  }

  submitReview(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        // this.submitReview();
        if (
          this.rating === 0 ||
          this.comment === undefined ||
          this.comment === '' ||
          this.comment === null ||
          this.comment.trim().length === 0
        ) {
          // alert("Please rate the track before submitting your review");
          this.showAlert = true;
          return;
        } else {
          this.showAlert = false;
          // console.log('rating:');
          // console.log(this.rating);
          // console.log('comment:');
          // console.log(this.comment);
          // console.log('id:');
          // console.log(this.id);

          this.addReviewService.submitReview(this.rating, this.comment, this.id).subscribe(data => {
            // console.log(data);
          });

          this.comment = ' ';
          this.rating = 0;

          setTimeout(() => {
            this.reviewList = [];
            this.fetchReviewInfoService.getReviewInfo(this.id).subscribe(data => {
              // console.log(data);
              this.avgRating = data.data.review.avgRating;
              const reviewDTO = data.data.review.reviewList;
              for (let i = 0; i < reviewDTO.length; i++) {
                const review: Review = {
                  userSporifyURI: reviewDTO[i].profile.userSporifyURI,
                  username: reviewDTO[i].profile.username,
                  userProfileImage: 'https://canvas.bham.ac.uk/images/thumbnails/12421586/QWn6RBm92OGV4fNrhx2Gm7DB5r0Q5pfkhnqpoKgH',
                  reviewContent: reviewDTO[i].content,
                  reviewDate: reviewDTO[i].date,
                  rating: reviewDTO[i].rating,
                };
                this.reviewList.push(review);
              }
              this.reviewList = this.reviewList.reverse();
              this.changeDetectorRef.detectChanges();
            });
          }, 300);
        }

        // console.log('submit review');
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
