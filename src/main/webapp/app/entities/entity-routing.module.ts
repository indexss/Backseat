import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'track',
        data: { pageTitle: 'Tracks' },
        loadChildren: () => import('./track/track.module').then(m => m.TrackModule),
      },
      {
        path: 'album',
        data: { pageTitle: 'Albums' },
        loadChildren: () => import('./album/album.module').then(m => m.AlbumModule),
      },
      {
        path: 'review',
        data: { pageTitle: 'Reviews' },
        loadChildren: () => import('./review/review.module').then(m => m.ReviewModule),
      },
      {
        path: 'artist',
        data: { pageTitle: 'Artists' },
        loadChildren: () => import('./artist/artist.module').then(m => m.ArtistModule),
      },
      {
        path: 'want-to-listen-list-entry',
        data: { pageTitle: 'WantToListenListEntries' },
        loadChildren: () => import('./want-to-listen-list-entry/want-to-listen-list-entry.module').then(m => m.WantToListenListEntryModule),
      },
      {
        path: 'folder',
        data: { pageTitle: 'Folders' },
        loadChildren: () => import('./folder/folder.module').then(m => m.FolderModule),
      },
      {
        path: 'folder-entry',
        data: { pageTitle: 'FolderEntries' },
        loadChildren: () => import('./folder-entry/folder-entry.module').then(m => m.FolderEntryModule),
      },
      {
        path: 'profile',
        data: { pageTitle: 'Profiles' },
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'spotify-connection',
        data: { pageTitle: 'SpotifyConnections' },
        loadChildren: () => import('./spotify-connection/spotify-connection.module').then(m => m.SpotifyConnectionModule),
      },
      {
        path: 'follow',
        data: { pageTitle: 'Follows' },
        loadChildren: () => import('./follow/follow.module').then(m => m.FollowModule),
      },
      {
        path: 'setting',
        data: { pageTitle: 'Settings' },
        loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
