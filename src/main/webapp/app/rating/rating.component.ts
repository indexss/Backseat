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
import { DeleteReviewService } from './delete-review.service';
import { FetchAccService } from './fetch-acc.service';

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
  showAlbumReviews: boolean = true;
  showAlertReview: boolean = false;
  coverSrc = 'https://i.scdn.co/image/ab67616d00001e0206be5d37ce9e28b0e23ee383';
  // 测试代码:
  currentPage: number = 1;
  reviewsPerPage: number = 5;
  userName!: string;
  albumReviewList: Review[] = [];

  // 测试代码
  constructor(
    private route: ActivatedRoute,
    private fetchReviewInfoService: FetchReviewInfoService,
    private accountService: AccountService,
    private addReviewService: AddReviewService,
    private changeDetectorRef: ChangeDetectorRef,
    private checkExistService: CheckExistService,
    private deleteReviewService: DeleteReviewService,
    private router: Router,
    private themeService: ThemeService,
    private fetchAcc: FetchAccService
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
          this.changeDetectorRef.detectChanges();
        });
      }

      // For condition of album request
      // For condition of Album request
      // For condition of Album request
      else {
        this.fetchReviewInfoService.getReviewInfo(this.id).subscribe(data => {
          // this.trackName = data.data.review.trackName;
          this.albumName = data.data.review.albumName;
          this.artistName = data.data.review.artistName;
          this.releaseDate = data.data.review.releaseDate;
          this.description = data.data.review.description;
          this.imgURL = data.data.review.imgURL;
          this.totalTracks = data.data.review.totalTracks;
          this.avgRatingList = data.data.review.avgRatingList;
          this.avgRating = data.data.review.avgRating;

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

          this.fetchReviewInfoService.getAlbumReviewInfo(this.id).subscribe(data => {
            this.avgRating = data.data.review.avgRating;
            const reviewDTO = data.data.review.reviewList;
            for (let i = 0; i < reviewDTO.length; i++) {
              const review: Review = {
                reviewTrackName: reviewDTO[i].album.name,
                userSporifyURI: reviewDTO[i].profile.userSporifyURI,
                username: reviewDTO[i].profile.username,
                // userProfileImage: reviewDTO[i].profile.profileImage,
                userProfileImage: './../../content/images/common_avatar.png',
                reviewContent: reviewDTO[i].content,
                reviewDate: reviewDTO[i].date,
                rating: reviewDTO[i].rating,
              };
              this.albumReviewList.push(review);
            }
            this.albumReviewList = this.albumReviewList.reverse();
            this.changeDetectorRef.detectChanges();
          });
          this.changeDetectorRef.detectChanges();
          console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
          console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
          console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
          console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
          console.log(this.albumReviewList);

          // }
          // this.allReviewList.sort((a, b) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime());
        });
      }
    });
  }

  onTrackSelected(spotifyURI: string): void {
    this.selectedTrack = this.trackList.find(track => track.spotifyURI === spotifyURI);
  }

  getTrackNameBySpotifyURI(selectedSpotifyURI: string): string {
    const selectedTrack = this.trackList.find(track => track.spotifyURI === this.selectedSpotifyURI);
    return selectedTrack ? selectedTrack.trackName : 'Track not found';
  }

  submitReview(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        // this.submitReview();
        this.fetchAcc.fetchAcc().subscribe(data => {
          this.userName = data.data.Acc.accountName;
          this.showAlertReview = false;
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
            //this is about track page
            if (this.isTrack) {
              for (let i: number = 0; i < this.reviewList.length; i++) {
                if (this.userName === this.reviewList[i].username) {
                  this.showAlertReview = true;
                }
              }
              //this.showAlbumReviews = false
              if (this.showAlertReview) {
                return;
              } else {
                this.showAlert = false;
                this.showAlertReview = false;
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
              }
            }
            //this is about album page
            else {
              this.showAlert = false;
              //did not select track for Album
              if (this.showAlbumReviews) {
                for (let i: number = 0; i < this.albumReviewList.length; i++) {
                  if (this.userName === this.albumReviewList[i].username) {
                    this.showAlertReview = true;
                  }
                }
                //this.showAlbumReviews = false
                if (this.showAlertReview) {
                  return;
                } else {
                  this.showAlertTrack = false;
                  this.addReviewService.submitReview(this.rating, this.comment, this.id).subscribe(data => {});
                  this.comment = ' ';
                  this.rating = 0;

                  this.changeDetectorRef.detectChanges();
                  setTimeout(() => {
                    this.reviewList = [];
                    this.fetchReviewInfoService.getAlbumReviewInfo(this.id).subscribe(data => {
                      console.log(data);
                      this.avgRating = data.data.review.avgRating;
                      const reviewDTO = data.data.review.reviewList;
                      for (let i = 0; i < reviewDTO.length; i++) {
                        const review: Review = {
                          reviewTrackName: reviewDTO[i].album.name,
                          userSporifyURI: reviewDTO[i].profile.userSporifyURI,
                          username: reviewDTO[i].profile.username,
                          // userProfileImage: reviewDTO[i].profile.profileImage,
                          userProfileImage: './../../content/images/common_avatar.png',
                          reviewContent: reviewDTO[i].content,
                          reviewDate: reviewDTO[i].date,
                          rating: reviewDTO[i].rating,
                        };
                        this.albumReviewList.push(review);
                      }
                      this.albumReviewList = this.albumReviewList.reverse();
                      this.changeDetectorRef.detectChanges();
                    });
                  }, 300);
                }
              } else {
                if (!this.selectedSpotifyURI) {
                  this.showAlertTrack = true;
                } else {
                  for (let i: number = 0; i < this.reviewList.length; i++) {
                    if (
                      this.userName === this.reviewList[i].username &&
                      this.getTrackNameBySpotifyURI(this.selectedSpotifyURI) === this.reviewList[i].reviewTrackName
                    ) {
                      this.showAlertReview = true;
                    }
                  }
                  if (this.showAlertReview) {
                    return;
                  } else {
                    this.showAlertTrack = false;
                    this.addReviewService.submitReview(this.rating, this.comment, this.selectedSpotifyURI).subscribe(data => {});
                    this.comment = ' ';
                    this.rating = 0;
                    this.changeDetectorRef.detectChanges();

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
            }
          }
          // console.log('submit review');
        });
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

    this.resetData();
    // 导航到 /rating/{spotifyURI}
    console.log(spotifyURI);
    this.router.navigate(['/rating', spotifyURI]);
    this.changeDetectorRef.detectChanges();
  }

  redirectToTrack(spotifyURI: string): void {
    this.isTrack = true;

    this.resetData();
    // 导航到 /rating/{spotifyURI}
    this.router.navigate(['/rating', spotifyURI]);
    this.changeDetectorRef.detectChanges();
  }

  resetData(): void {
    this.trackName = '';
    this.albumName = '';
    this.artistName = '';
    this.releaseDate = '';
    this.description = '';
    this.avgRating = 0.0;
    this.imgURL = '';
    this.totalTracks = 0;
    this.avgRatingList = [];
    this.reviewList = []; // 重要：清空评论列表
    this.trackList = [];
  }
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleReviews() {
    this.accountService.identity().subscribe(account => {
      // 你的更新逻辑
      if (account) {
        // this.submitReview();
        this.fetchAcc.fetchAcc().subscribe(data => {
          console.log(data.data);
          this.userName = data.data.Acc.accountName;
        });
      }
      this.showAlertReview = false;
      this.showAlbumReviews = !this.showAlbumReviews;
      this.changeDetectorRef.detectChanges();
      this.reviewList = [];
      this.albumReviewList = [];
      if (this.showAlbumReviews) {
        // 更新按钮文本
        this.changeDetectorRef.detectChanges();
        setTimeout(() => {
          this.albumReviewList = [];
          this.fetchReviewInfoService.getAlbumReviewInfo(this.id).subscribe(data => {
            this.avgRating = data.data.review.avgRating;
            const reviewDTO = data.data.review.reviewList;
            for (let i = 0; i < reviewDTO.length; i++) {
              const review: Review = {
                reviewTrackName: reviewDTO[i].album.name,
                userSporifyURI: reviewDTO[i].profile.userSporifyURI,
                username: reviewDTO[i].profile.username,
                // userProfileImage: reviewDTO[i].profile.profileImage,
                userProfileImage: './../../content/images/common_avatar.png',
                reviewContent: reviewDTO[i].content,
                reviewDate: reviewDTO[i].date,
                rating: reviewDTO[i].rating,
              };
              this.albumReviewList.push(review);
            }
            this.albumReviewList = this.albumReviewList.reverse();
            this.changeDetectorRef.detectChanges();
          });
        }, 300);

        // 这里可以添加显示评论的逻辑
      } else {
        this.changeDetectorRef.detectChanges();
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
            this.reviewList = this.reviewList.reverse();
            this.changeDetectorRef.detectChanges();
          });
        }, 300);
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  deleteReview(reviewId: string): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        // User is logged in, proceed with delete
        this.deleteReviewService.deleteReview(reviewId).subscribe(() => {});
        // Handle post-delete logic, e.g., refreshing the list of reviews
        this.changeDetectorRef.detectChanges();
        if (reviewId.includes('album')) {
          setTimeout(() => {
            this.albumReviewList = [];
            this.fetchReviewInfoService.getAlbumReviewInfo(this.id).subscribe(data => {
              this.avgRating = data.data.review.avgRating;
              const reviewDTO = data.data.review.reviewList;
              console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
              console.log('data.data:' + data.data);
              console.log('data.data.review' + data.data.reivew);
              console.log('data.data.review.reviewList' + data.data.review.reviewList);
              for (let i = 0; i < reviewDTO.length; i++) {
                const review: Review = {
                  reviewTrackName: reviewDTO[i].album.name,
                  userSporifyURI: reviewDTO[i].profile.userSporifyURI,
                  username: reviewDTO[i].profile.username,
                  // userProfileImage: reviewDTO[i].profile.profileImage,
                  userProfileImage: './../../content/images/common_avatar.png',
                  reviewContent: reviewDTO[i].content,
                  reviewDate: reviewDTO[i].date,
                  rating: reviewDTO[i].rating,
                };
                this.albumReviewList.push(review);
              }
              if (this.albumReviewList) {
                this.albumReviewList = this.albumReviewList.reverse();
              }
              this.changeDetectorRef.detectChanges();
            });
          }, 300);
        } else {
          if (this.id.includes('album')) {
            this.avgRatingList = [];
            this.avgRating = 0.0;
            this.trackList = [];
            this.changeDetectorRef.detectChanges();
            setTimeout(() => {
              this.reviewList = [];
              this.fetchReviewInfoService.getReviewInfo(this.id).subscribe(data => {
                // console.log(data);
                this.avgRatingList = data.data.review.avgRatingList;
                this.avgRating = data.data.review.avgRating;

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
                this.reviewList = this.reviewList.sort((a, b) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime());
                console.log(this.reviewList);
                this.changeDetectorRef.detectChanges();
              });
            }, 300);
          } else {
            this.changeDetectorRef.detectChanges();
            this.avgRating = 0.0;
            setTimeout(() => {
              this.reviewList = [];
              this.fetchReviewInfoService.getReviewInfo(this.id).subscribe(data => {
                this.avgRating = data.data.review.avgRating;
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
          }
        }
        // this.changeDetectorRef.detectChanges();
      } else {
        // Redirect to login or show an error message
        this.router.navigate(['/login']);
      }
    });
  }

  get paginatedReviews(): Review[] {
    const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
    const endIndex = startIndex + this.reviewsPerPage;
    if (!this.showAlbumReviews) {
      return this.reviewList.slice(startIndex, endIndex);
    } else {
      return this.albumReviewList.slice(startIndex, endIndex);
    }
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

  findSpotifyURIByTrackName(trackName: string): string {
    // 查找与提供的轨道名相匹配的轨道
    const track = this.trackList.find(t => t.trackName === trackName);
    // 如果找到了匹配的轨道，则返回其 Spotify URI，否则返回一个空字符串或其他默认值
    return track ? track.spotifyURI : '';
  }

  protected readonly Math = Math;
}
