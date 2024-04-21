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
  //imported icon
  faPlayCircle = faPlayCircle;
  spotifyTrackLink!: string;
  // fetch review var for assigning value from backend
  trackName!: string;
  albumName!: string;
  artistName!: string;
  releaseDate!: string;
  description!: string;
  avgRating!: number;
  reviewList: Review[] = [];
  // account service for both add to folder and delete comment
  account!: Account;
  // track/album image url
  imgURL!: string;
  //show comment alert
  showAlert: boolean = false;
  //store user comment and check if user comment is null
  comment!: string;
  //change rating
  rating = 0;
  //initialize spotify:uri; this could be either album URI or track URI
  id!: any;
  //check if it is track or  album
  isTrack?: boolean;
  totalTracks!: number;
  //fetching additional information for albums from backend
  //each album contain reviewlist for each of track in it
  trackList: Track[] = [];
  avgRatingList: number[] = [];
  //selected track in album form
  selectedSpotifyURI!: string;
  selectedTrack!: any;
  //prompt user at least choose one track to comment in album
  showAlertTrack: boolean = false;
  albumURI!: string;
  //"click to review album" or "click to review track" prompt boolean check
  showAlbumReviews: boolean = true;
  showAlertReview: boolean = false;
  // local cover for testing
  coverSrc = 'https://i.scdn.co/image/ab67616d00001e0206be5d37ce9e28b0e23ee383';
  //pagination items
  currentPage: number = 1;
  reviewsPerPage: number = 5;
  userName!: string;
  // album review list for reordering
  albumReviewList: Review[] = [];
  //folder part
  spotifyURI!: string;
  modalRef!: NgbModalRef;
  folderList: Folder[] = [];
  //Check if add want to listen list successful?
  showAddWantListenSuccess: boolean = false;
  //Check if add again into want to listen list?
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
  // there are two types of showing model; either it has spotify folder uri or not
  openModal(arg1: any, arg2?: any): void {
    if (typeof arg1 === 'string') {
      this.spotifyURI = arg1;
      console.log('folderlist');
      this.modalRef = this.modalService.open(arg2, { centered: true });
    } else {
      this.modalService.open(arg1, { centered: true });
    }
  }

  //works from Hào Li to check if the album/track already exist in Want-to-listen list
  //Show relevant prompt message in html
  addToWantToListen(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.fetchAcc.fetchAcc().subscribe(data => {
          // `fetchAcc` service is total unnecessary, `account.login` is the current user's username
          // get user's entries and check if it is duplicate
          this.wantToListenService.getUserEntries(data.data.Acc.spotifyName).subscribe(res => {
            //check duplicate entry
            console.log('account name', data.data.Acc);
            console.log('check before adding');
            console.log(res);
            if (res.data.entryList != null) {
              for (let i = 0; i < res.data.entryList.length; i++) {
                if (this.id == res.data.entryList[i].itemUri) {
                  // if userList contains this item's URI, show `Fail alert message`
                  this.showAddWantListenFail = true;
                  this.showAddWantListenSuccess = false;
                  console.log('Fail: ' + this.showAddWantListenFail);
                  this.changeDetectorRef.detectChanges();
                  break;
                }
              }
              this.changeDetectorRef.detectChanges();
            }

            if (!this.showAddWantListenFail) {
              // if no same entry, then add new
              this.wantToListenService.addNewItem(this.id, data.data.Acc.spotifyName).subscribe(res => {
                console.log('account name', data.data.Acc);
                // show success message, set `Fail` to false
                this.showAddWantListenSuccess = true;
                this.showAddWantListenFail = false;
                this.changeDetectorRef.detectChanges();
                console.log('Success: ' + this.showAddWantListenSuccess);
              });
              this.changeDetectorRef.detectChanges();
            }
          });
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  // add to relevant folder
  addToFolder(folderId: number) {
    console.log(`Adding trackURI: ${this.spotifyURI} to folderId: ${folderId}`);
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.addToFolderService.addEntryFolder(this.spotifyURI, folderId).subscribe(data => {});
      }
    });
    this.modalRef.close();
  }

  //get spotifyLink method for adding items into folder
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

  //submit review logic
  //only login user can submit review so check account first
  //then check if the comment is valid
  //then check if it is a review on track page or on album page
  //if it is on album page : check if it is a review for track or review
  //fetch data reused every time to ensure data is updated after changes
  submitReview(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.fetchAcc.fetchAcc().subscribe(data => {
          this.userName = data.data.Acc.accountName;
          this.showAlertReview = false;
          //review valid?
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
              //if following review whole album and show album comments logic
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
              }
              //In album page: and review on a selected track in that album
              else {
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
      }
      //not log in: navigate to login page
      else {
        this.router.navigate(['/login']);
      }
    });
  }

  //clicking on "clear button"
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

  //redirect logic for redirect ing between album and track
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

  //resetData for data unchangeable bugs
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

  //"click to review album" "click to review track"
  //"view album review" "view track review" buttons logic
  //
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

  //delete review needs to first check if it is log in
  //if not log in actually nothing happens
  //if logged in: check the whole review list with the current log in user name
  //delete relevant review through review id
  //then fetch review service update changes
  //still it works in three logic:
  //1.In album page delete album review
  //2.In album page delete track review
  //3.In track page delete track review
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
              this.changeDetectorRef.detectChanges();
            });
          }, 300);
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
            }, 300);
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
            }, 300);
            this.changeDetectorRef.detectChanges();
          }
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  //pagination function:  5 reviews per page
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

  //redirect to profile function for profile image and user name in review showing
  // in html.
  redirectToProfile(profileId: number): void {
    this.router.navigate(['/profile', profileId]);
  }

  findSpotifyURIByTrackName(trackName: string): string {
    const track = this.trackList.find(t => t.trackName === trackName);
    return track ? track.spotifyURI : '';
  }
  //math
  protected readonly Math = Math;
}
