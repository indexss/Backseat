import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, TemplateRef } from '@angular/core';
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
import { DeleteReviewService } from './delete-review.service';
import { FetchAccService } from './fetch-acc.service';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfigService } from '../core/config/application-config.service';
import { AddToFolderService } from '../add-to-folder/add-to-folder.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { WantToListenService } from '../want-to-listen/want-to-listen.service';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { listEntry } from '../want-to-listen/list-entry.interface';
interface Folder {
  id: number;
  folderId: number;
  folderName: string;
  imageURL: string;
}

@Component({
  selector: 'jhi-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent implements OnInit {
  faPlayCircle = faPlayCircle;
  spotifyTrackLink!: string;
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
  currentPage: number = 1;
  reviewsPerPage: number = 5;
  userName!: string;
  albumReviewList: Review[] = [];
  //folder part
  spotifyURI!: string;
  modalRef!: NgbModalRef;
  folderList: Folder[] = [];
  showAddWantListenSuccess: boolean = false;
  showAddWantListenFail: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fetchReviewInfoService: FetchReviewInfoService,
    private accountService: AccountService,
    private addReviewService: AddReviewService,
    private changeDetectorRef: ChangeDetectorRef,
    private checkExistService: CheckExistService,
    private deleteReviewService: DeleteReviewService,
    private router: Router,
    private fetchAcc: FetchAccService,
    private httpClient: HttpClient,
    private appConfig: ApplicationConfigService,
    private addToFolderService: AddToFolderService,
    private wantToListenService: WantToListenService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.addToFolderService.getUserFolder().subscribe(data => {
      this.folderList = data.data.folder;
    });

    //The rating page get only the spotify::track or spotify::album ,here fetch review depending on which url it is
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log('--------------------');
      console.log(this.id);
      console.log('--------------------');
      this.spotifyTrackLink = 'https://open.spotify.com/track/' + this.id.split(':')[2];
      this.checkTrackOrAlbum(this.id);
      if (this.isTrack) {
        this.fetchReviewInfoService.getReviewInfo(this.id).subscribe(data => {
          // console.log(data);

          this.checkExistService.checkExist(this.id).subscribe(data => {
            if (data.data.exist === 'false') {
              this.httpClient.post<boolean>(this.appConfig.getEndpointFor('/api/datapipe/import/' + this.id), null).subscribe({
                next: success => {
                  if (success) {
                    // this is equivalent to reloading the entire page
                    // (redir to / then back to restart rendering)
                    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                      this.router.navigate(['/rating', this.id]);
                    });
                  } else {
                    this.router.navigate(['/rating-not-found']);
                  }
                },
                error: () => {
                  this.router.navigate(['/rating-not-found']);
                },
              });
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
          for (let i = 0; i < reviewDTO?.length; i++) {
            const review: Review = {
              reviewTrackName: data.data.review.trackName,
              userSporifyURI: reviewDTO[i].profile.userSporifyURI,
              username: reviewDTO[i].profile.username,
              // userProfileImage: reviewDTO[i].profile.profilePhoto,
              userProfileImage: '/api/profiles/byLogin/' + reviewDTO[i].profile.username + '/profilePhoto',
              // userProfileImage: './../../content/images/common_avatar.png',
              userId: reviewDTO[i].profile.id,
              reviewContent: reviewDTO[i].content,
              reviewDate: reviewDTO[i].date,
              rating: reviewDTO[i].rating,
            };
            console.log('----------------------');
            console.log(review);
            console.log('----------------------');
            this.reviewList.push(review);
          }
          this.reviewList = this.reviewList.reverse();
          this.changeDetectorRef.detectChanges();
        });
      }

      // For condition of Album request
      else {
        this.fetchReviewInfoService.getReviewInfo(this.id).subscribe(data => {
          if (data.data.review.albumName == null) {
            this.httpClient.post<boolean>(this.appConfig.getEndpointFor('/api/datapipe/import/' + this.id), null).subscribe({
              next: success => {
                if (success) {
                  // this is equivalent to reloading the entire page
                  // (redir to / then back to restart rendering)
                  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this.router.navigate(['/rating', this.id]);
                  });
                } else {
                  this.router.navigate(['/rating-not-found']);
                }
              },
              error: () => {
                this.router.navigate(['/rating-not-found']);
              },
            });
          }

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

          const reviewDTO = data.data.review.reviewList;
          for (let i = 0; i < reviewDTO?.length; i++) {
            const review: Review = {
              reviewTrackName: reviewDTO[i].track.name,
              userSporifyURI: reviewDTO[i].profile.userSporifyURI,
              username: reviewDTO[i].profile.username,
              // userProfileImage: reviewDTO[i].profile.profilePhoto,
              userProfileImage: '/api/profiles/byLogin/' + reviewDTO[i].profile.username + '/profilePhoto',
              // userProfileImage: './../../content/images/common_avatar.png',
              reviewContent: reviewDTO[i].content,
              reviewDate: reviewDTO[i].date,
              rating: reviewDTO[i].rating,
              userId: reviewDTO[i].profile.id,
            };
            console.log('Album reqeust print review info:');
            console.log(data.data.review);
            this.reviewList.push(review);
          }
          this.reviewList = this.reviewList.sort((a, b) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime());

          this.fetchReviewInfoService.getAlbumReviewInfo(this.id).subscribe(data => {
            this.avgRating = data.data.review.avgRating;
            const reviewDTO = data.data.review.reviewList;
            for (let i = 0; i < reviewDTO.length; i++) {
              const review: Review = {
                reviewTrackName: reviewDTO[i].album.name,
                userSporifyURI: reviewDTO[i].profile.userSporifyURI,
                username: reviewDTO[i].profile.username,
                // userProfileImage: reviewDTO[i].profile.profilePhoto,
                userProfileImage: '/api/profiles/byLogin/' + reviewDTO[i].profile.username + '/profilePhoto',
                // userProfileImage: './../../content/images/common_avatar.png',
                reviewContent: reviewDTO[i].content,
                reviewDate: reviewDTO[i].date,
                rating: reviewDTO[i].rating,
                userId: reviewDTO[i].profile.id,
              };
              this.albumReviewList.push(review);
            }
            this.albumReviewList = this.albumReviewList.reverse();
            this.changeDetectorRef.detectChanges();
          });
          this.changeDetectorRef.detectChanges();
        });
      }
    });
  }

  // From  Willis Shi
  openModal(spotifyURI: string, content: TemplateRef<any>): void;
  openModal(content: TemplateRef<any>): void;

  openModal(arg1: any, arg2?: any): void {
    if (typeof arg1 === 'string') {
      this.spotifyURI = arg1;
      console.log('folderlist');
      this.modalRef = this.modalService.open(arg2, { centered: true });
    } else {
      this.modalService.open(arg1, { centered: true });
    }
  }

  addToWantToListen(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.fetchAcc.fetchAcc().subscribe(data => {
          // `fetchAcc` service is total unnecessary, `account.login` is the current user's username
          // get user's entries and check if it is duplicate
          this.wantToListenService.getUserEntries(account.login).subscribe(res => {
            //check duplicate entry
            for (let i = 0; i < res.data.entryList.length; i++) {
              if (this.id == res.data.entryList[i].itemUri) {
                // if userList contains this item's URI, show `Fail alert message`
                this.showAddWantListenFail = true;
                this.showAddWantListenSuccess = false;
                break;
              }
            }
            if (!this.showAddWantListenFail) {
              // if no same entry, then add new
              this.wantToListenService.addNewItem(this.id, data.data.Acc.accountName).subscribe(res => {
                // show success message, set `Fail` to false
                this.showAddWantListenSuccess = true;
                this.showAddWantListenFail = false;
              });
            }
          });
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  addToFolder(folderId: number) {
    console.log(`Adding trackURI: ${this.spotifyURI} to folderId: ${folderId}`);
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.addToFolderService.addEntryFolder(this.spotifyURI, folderId).subscribe(data => {});
      }
    });
    this.modalRef.close();
  }

  getSpotifyLink(spotifyURI: string): string {
    let spotifyLink: string = '';
    if (spotifyURI.startsWith('spotify:track:')) {
      spotifyLink = spotifyURI.replace('spotify:track:', 'https://open.spotify.com/track/');
    } else if (spotifyURI.startsWith('spotify:album:')) {
      spotifyLink = spotifyURI.replace('spotify:album:', 'https://open.spotify.com/album/');
    } else {
      console.error('Unsupported SpotifyURI: ', spotifyURI);
    }
    return spotifyLink;
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
              if (this.showAlertReview) {
                return;
              } else {
                this.showAlert = false;
                this.showAlertReview = false;
                this.addReviewService.submitReview(this.rating, this.comment, this.id).subscribe(data => {});

                this.comment = ' ';
                this.rating = 0;

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
                        // userProfileImage: reviewDTO[i].profile.profilePhoto,
                        userProfileImage: '/api/profiles/byLogin/' + reviewDTO[i].profile.username + '/profilePhoto',
                        // userProfileImage: './../../content/images/common_avatar.png',
                        reviewContent: reviewDTO[i].content,
                        reviewDate: reviewDTO[i].date,
                        rating: reviewDTO[i].rating,
                        userId: reviewDTO[i].profile.id,
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
                      this.avgRating = data.data.review.avgRating;
                      const reviewDTO = data.data.review.reviewList;
                      for (let i = 0; i < reviewDTO.length; i++) {
                        const review: Review = {
                          reviewTrackName: reviewDTO[i].album.name,
                          userSporifyURI: reviewDTO[i].profile.userSporifyURI,
                          username: reviewDTO[i].profile.username,
                          // userProfileImage: reviewDTO[i].profile.profilePhoto,
                          userProfileImage: '/api/profiles/byLogin/' + reviewDTO[i].profile.username + '/profilePhoto',
                          // userProfileImage: './../../content/images/common_avatar.png',
                          reviewContent: reviewDTO[i].content,
                          reviewDate: reviewDTO[i].date,
                          rating: reviewDTO[i].rating,
                          userId: reviewDTO[i].profile.id,
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
                        this.avgRating = data.data.review.avgRating;
                        const reviewDTO = data.data.review.reviewList;
                        for (let i = 0; i < reviewDTO.length; i++) {
                          const review: Review = {
                            reviewTrackName: reviewDTO[i].track.name,
                            userSporifyURI: reviewDTO[i].profile.userSporifyURI,
                            username: reviewDTO[i].profile.username,
                            // userProfileImage: reviewDTO[i].profile.profilePhoto,
                            userProfileImage: '/api/profiles/byLogin/' + reviewDTO[i].profile.username + '/profilePhoto',
                            // userProfileImage: './../../content/images/common_avatar.png',
                            reviewContent: reviewDTO[i].content,
                            reviewDate: reviewDTO[i].date,
                            rating: reviewDTO[i].rating,
                            userId: reviewDTO[i].profile.id,
                          };
                          this.reviewList.push(review);
                        }
                        this.reviewList = this.reviewList.reverse();
                        this.changeDetectorRef.detectChanges();
                      });
                    }, 300);
                  }
                }
              }
            }
          }
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
      this.isTrack = true;
    } else if (id.includes('album')) {
      this.isTrack = false;
    }
  }

  redirectToAlbum(spotifyURI: string): void {
    this.isTrack = false;

    this.resetData();
    this.router.navigate(['/rating', spotifyURI]);
    this.changeDetectorRef.detectChanges();
  }

  redirectToTrack(spotifyURI: string): void {
    this.isTrack = true;

    this.resetData();
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
    this.reviewList = []; //
    this.trackList = [];
  }

  toggleReviews() {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.fetchAcc.fetchAcc().subscribe(data => {
          this.userName = data.data.Acc.accountName;
        });
      }
      this.showAlertReview = false;
      this.showAlbumReviews = !this.showAlbumReviews;
      this.changeDetectorRef.detectChanges();
      this.reviewList = [];
      this.albumReviewList = [];
      if (this.showAlbumReviews) {
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
                // userProfileImage: reviewDTO[i].profile.profilePhoto,
                userProfileImage: '/api/profiles/byLogin/' + reviewDTO[i].profile.username + '/profilePhoto',
                // userProfileImage: './../../content/images/common_avatar.png',
                reviewContent: reviewDTO[i].content,
                reviewDate: reviewDTO[i].date,
                rating: reviewDTO[i].rating,
                userId: reviewDTO[i].profile.id,
              };
              this.albumReviewList.push(review);
            }
            this.albumReviewList = this.albumReviewList.reverse();
            this.changeDetectorRef.detectChanges();
          });
        }, 100);
        this.changeDetectorRef.detectChanges();
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
                // userProfileImage: reviewDTO[i].profile.profilePhoto,
                userProfileImage: '/api/profiles/byLogin/' + reviewDTO[i].profile.username + '/profilePhoto',
                // userProfileImage: './../../content/images/common_avatar.png',
                reviewContent: reviewDTO[i].content,
                reviewDate: reviewDTO[i].date,
                rating: reviewDTO[i].rating,
                userId: reviewDTO[i].profile.id,
              };
              this.reviewList.push(review);
            }
            this.reviewList = this.reviewList.reverse();
            this.changeDetectorRef.detectChanges();
          });
        }, 100);
        this.changeDetectorRef.detectChanges();
      }
    });
    this.changeDetectorRef.detectChanges();
  }

  deleteReview(reviewId: string): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.deleteReviewService.deleteReview(reviewId).subscribe(() => {});
        this.changeDetectorRef.detectChanges();
        if (reviewId.includes('album')) {
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
                  // userProfileImage: reviewDTO[i].profile.profilePhoto,
                  userProfileImage: '/api/profiles/byLogin/' + reviewDTO[i].profile.username + '/profilePhoto',
                  // userProfileImage: './../../content/images/common_avatar.png',
                  reviewContent: reviewDTO[i].content,
                  reviewDate: reviewDTO[i].date,
                  rating: reviewDTO[i].rating,
                  userId: reviewDTO[i].profile.id,
                };
                this.albumReviewList.push(review);
              }
              if (this.albumReviewList) {
                this.albumReviewList = this.albumReviewList.reverse();
              }
            });
          }, 100);
          this.changeDetectorRef.detectChanges();
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
                    // userProfileImage: reviewDTO[i].profile.profilePhoto,
                    userProfileImage: '/api/profiles/byLogin/' + reviewDTO[i].profile.username + '/profilePhoto',
                    // userProfileImage: './../../content/images/common_avatar.png',
                    reviewContent: reviewDTO[i].content,
                    reviewDate: reviewDTO[i].date,
                    rating: reviewDTO[i].rating,
                    userId: reviewDTO[i].profile.id,
                  };
                  this.reviewList.push(review);
                }
                this.reviewList = this.reviewList.sort((a, b) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime());
                this.changeDetectorRef.detectChanges();
              });
            }, 100);
            this.changeDetectorRef.detectChanges();
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
                    // userProfileImage: reviewDTO[i].profile.profilePhoto,
                    userProfileImage: '/api/profiles/byLogin/' + reviewDTO[i].profile.username + '/profilePhoto',
                    // userProfileImage: './../../content/images/common_avatar.png',
                    reviewContent: reviewDTO[i].content,
                    reviewDate: reviewDTO[i].date,
                    rating: reviewDTO[i].rating,
                    userId: reviewDTO[i].profile.id,
                  };
                  this.reviewList.push(review);
                }
                this.reviewList = this.reviewList.reverse();
                this.changeDetectorRef.detectChanges();
              });
            }, 100);
            this.changeDetectorRef.detectChanges();
          }
        }
      } else {
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

  redirectToProfile(profileId: number): void {
    this.router.navigate(['/profile', profileId]);
  }

  findSpotifyURIByTrackName(trackName: string): string {
    const track = this.trackList.find(t => t.trackName === trackName);
    return track ? track.spotifyURI : '';
  }

  protected readonly Math = Math;
}
