import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchReviewInfoService } from './fetch-review-info.service';
import { Review } from './review.interface';
import { AccountService } from 'app/core/auth/account.service';
import { DatePipe } from '@angular/common';
import { Account } from 'app/core/auth/account.model';
import { AddReviewService } from './add-review.service';
import { CheckExistService } from './check-exist.service';
import { Router } from '@angular/router';
import { Track } from './track.interface';
import { ThemeService } from './theme.service';
@Component({
  selector: 'jhi-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent implements OnInit {
  trackName!: string;
  albumName!: string;
  albumNames!: string[];
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
  isTrack?: boolean;
  showCommentAlert: boolean = false;
  totalTracks!: number;
  allReviewList: Review[] = [];
  trackList: Track[] = [];
  avgRatingList: number[] = [];
  selectedSpotifyURI!: string;
  selectedTrack!: any;
  showAlertTrack: boolean = false;
  albumURI!: string;
  showAlbumReviews: boolean = false;
  buttonText: string = 'Click to View Album Review';
  coverSrc = 'https://i.scdn.co/image/ab67616d00001e0206be5d37ce9e28b0e23ee383';
  // 测试代码
  currentPage: number = 1;
  reviewsPerPage: number = 5;

  // 测试代码
  constructor(
    private route: ActivatedRoute,
    private fetchReviewInfoService: FetchReviewInfoService,
    private accountService: AccountService,
    private addReviewService: AddReviewService,
    private changeDetectorRef: ChangeDetectorRef,
    private checkExistService: CheckExistService,
    private router: Router,
    public themeService: ThemeService
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
      this.checkTrackOrAlbum(this.id);
      this.themeService.loadTheme();
      if (this.isTrack) {
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
          this.albumURI = data.data.review.albumURI;
          // console.log(this.avgRating);
          const reviewDTO = data.data.review.reviewList;
          for (let i = 0; i < reviewDTO.length; i++) {
            const review: Review = {
              reviewTrackName: data.data.review.trackName,
              userSporifyURI: reviewDTO[i].profile.userSporifyURI,
              username: reviewDTO[i].profile.username,
              // userProfileImage: reviewDTO[i].profile.profileImage,
              userProfileImage: './../../content/images/common_avatar.png',
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
          // console.log(data.data.review.artistName);
          // console.log(data.data.review);
          // console.log(this.description);
        });
      }

      // For condition of album request
      // For condition of Album request
      // For condition of Album request
      else {
        this.fetchReviewInfoService.getReviewInfo(this.id).subscribe(data => {
          console.log(data);
          console.log('=======================');

          // this.checkExistService.checkExist(this.id).subscribe(data => {
          //   console.log('data: ');
          //   console.log(data);
          //   if (data.data.exist === 'false') {
          //     this.router.navigate(['/rating-not-found']);
          //   }
          // });

          // this.trackName = data.data.review.trackName;
          this.albumName = data.data.review.albumName;
          this.artistName = data.data.review.artistName;
          this.releaseDate = data.data.review.releaseDate;
          this.description = data.data.review.description;
          this.avgRating = data.data.review.avgRating;
          this.imgURL = data.data.review.imgURL;
          this.totalTracks = data.data.review.totalTracks;
          this.avgRatingList = data.data.review.avgRatingList;
          // this.reviewList = data.data.review.reviewList;
          // this.trackList = data.data.review.tracks;

          console.log('--------------------------------------------------------');
          console.log('trackList数据源：', data.data.review.tracks);
          console.log('albumName: ', this.albumName);
          console.log('artistName: ', this.artistName);
          console.log('releaseDate: ', this.releaseDate);
          console.log('description: ', this.description);
          console.log('avgRating: ', this.avgRating);
          console.log('imgURL: ', this.imgURL);
          console.log('totalTracks: ', this.totalTracks);
          console.log('avgRatingList: ', this.avgRatingList);
          console.log('reviewList: ', this.reviewList);
          console.log('trackList: ', this.trackList);
          console.log('--------------------------------------------------------');
          // console.log(this.avgRating);
          // 这个方法绝大概率有问题，观察一下后续album 能否正常加载
          console.log('trackList源', data.data.review.tracks);
          const trackLList = data.data.review.tracks;
          for (let i = 0; i < trackLList.length; i++) {
            const track: Track = {
              spotifyURI: trackLList[i].spotifyURI,
              trackName: trackLList[i].name,
              artistName: this.artistName,
              releaseDate: trackLList[i].releaseDate,
              rating: trackLList[i].rating,
            };
            this.trackList.push(track);
          }
          console.log('-------------------------------------------tracklist');
          console.log(this.trackList);
          console.log(data.data.review.reviewList);
          // for (let j = 0; j < data.data.review.getTracks().length; j++){
          //这里返回的不是ReivewDTO而是单纯的review
          // const reviewDTO = data.data.review.getTracks()[j].getReview();
          const reviewDTO = data.data.review.reviewList;
          for (let i = 0; i < reviewDTO.length; i++) {
            const review: Review = {
              reviewTrackName: reviewDTO[i].track.name,
              userSporifyURI: reviewDTO[i].profile.userSporifyURI,
              username: reviewDTO[i].profile.username,
              // userProfileImage: reviewDTO[i].profile.profileImage,
              userProfileImage: './../../content/images/common_avatar.png',
              reviewContent: reviewDTO[i].content,
              reviewDate: reviewDTO[i].date,
              rating: reviewDTO[i].rating,
              // rating: reviewDTO[i].rating,
            };
            this.reviewList.push(review);
          }
          this.reviewList = this.reviewList.sort((a, b) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime());
          console.log(this.reviewList);
          // }
          // this.allReviewList.sort((a, b) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime());
        });
      }
    });
  }

  onTrackSelected(spotifyURI: string): void {
    this.selectedTrack = this.trackList.find(track => track.spotifyURI === spotifyURI);
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
          if (this.isTrack) {
            this.showAlert = false;
            this.addReviewService.submitReview(this.rating, this.comment, this.id).subscribe(data => {
              // console.log(data);
            });

            this.comment = ' ';
            this.rating = 0;

            setTimeout(() => {
              this.reviewList = [];
              this.fetchReviewInfoService.getReviewInfo(this.id).subscribe(data => {
                // console.log(data);
                this.avgRating = parseFloat(data.data.review.avgRating.toFixed(2));
                const reviewDTO = data.data.review.reviewList;
                for (let i = 0; i < reviewDTO.length; i++) {
                  const review: Review = {
                    reviewTrackName: data.data.review.trackName,
                    userSporifyURI: reviewDTO[i].profile.userSporifyURI,
                    username: reviewDTO[i].profile.username,
                    // userProfileImage: reviewDTO[i].profile.profileImage,
                    userProfileImage: './../../content/images/common_avatar.png',
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
          } else {
            this.showAlert = false;
            //did not select track for Album
            if (!this.selectedSpotifyURI) {
              this.showAlertTrack = true;
            } else {
              this.showAlertTrack = false;
              this.addReviewService.submitReview(this.rating, this.comment, this.selectedSpotifyURI).subscribe(data => {
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
                      reviewTrackName: reviewDTO[i].track.name,
                      userSporifyURI: reviewDTO[i].profile.userSporifyURI,
                      username: reviewDTO[i].profile.username,
                      // userProfileImage: reviewDTO[i].profile.profileImage,
                      userProfileImage: './../../content/images/common_avatar.png',
                      reviewContent: reviewDTO[i].content,
                      reviewDate: reviewDTO[i].date,
                      rating: reviewDTO[i].rating,
                    };
                    this.reviewList.push(review);
                  }
                  console.log('+++++++', this.reviewList, '+++++');
                  this.reviewList = this.reviewList.reverse();
                  this.changeDetectorRef.detectChanges();
                });
              }, 300);
            }
          }
        }

        // console.log('submit review');
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  clearContent(): void {
    this.comment = '';
    this.rating = 0;
    this.selectedSpotifyURI = '';
  }

  checkTrackOrAlbum(id: string): void {
    if (id.includes('track')) {
      this.isTrack = true; // 如果是 track，设置 isTrack 为 true
    } else if (id.includes('album')) {
      this.isTrack = false;
      // 如果是 album，设置 isTrack 为 false
    }
  }

  redirectToAlbum(spotifyURI: string): void {
    this.isTrack = false;
    this.trackName = '';
    this.releaseDate = '';
    this.avgRating = 0.0;
    this.artistName = '';
    // 导航到 /rating/{spotifyURI}
    console.log(spotifyURI);
    this.router.navigate(['/rating', spotifyURI]);
  }

  redirectToTrack(spotifyURI: string): void {
    this.isTrack = true;

    this.albumName = '';
    this.artistName = '';
    this.releaseDate = '';
    this.description = '';
    this.avgRating = 0.0;
    this.imgURL = '';
    this.totalTracks = 0;
    this.avgRatingList = [];
    // 导航到 /rating/{spotifyURI}
    this.router.navigate(['/rating', spotifyURI]);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleReviews() {
    setTimeout(() => {
      // 你的更新逻辑
      this.showAlbumReviews = !this.showAlbumReviews;
      if (this.showAlbumReviews) {
        // 更新按钮文本
        this.buttonText = 'Click to View Album Review';
        this.changeDetectorRef.detectChanges();
        // 这里可以添加显示评论的逻辑
      } else {
        // 重置按钮文本
        this.buttonText = 'Click to View Track Review';
        this.changeDetectorRef.detectChanges();
        // 这里可以添加隐藏评论的逻辑
      }
    }, 3600000);
  }

  get paginatedReviews(): Review[] {
    const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
    const endIndex = startIndex + this.reviewsPerPage;
    return this.reviewList.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage * this.reviewsPerPage < this.reviewList.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  protected readonly Math = Math;
}
