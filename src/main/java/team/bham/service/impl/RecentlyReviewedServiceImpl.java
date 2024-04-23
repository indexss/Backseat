package team.bham.service.impl;

import static java.lang.Math.min;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import javax.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.bham.domain.Album;
import team.bham.domain.Artist;
import team.bham.domain.Review;
import team.bham.domain.Track;
import team.bham.repository.AlbumRepository;
import team.bham.repository.ReviewRepository;
import team.bham.repository.TrackRepository;
import team.bham.service.RecentlyReviewedService;
import team.bham.service.dto.RecentlyReviewedDTO;
import team.bham.service.mapper.ReviewMapper;
import team.bham.service.mapper.TrackMapper;

@Service
@Transactional
public class RecentlyReviewedServiceImpl implements RecentlyReviewedService {

    @Resource
    private TrackRepository trackRepository;

    @Resource
    private ReviewRepository reviewRepository;

    @Resource
    private AlbumRepository albumRepository;

    @Override
    public List<RecentlyReviewedDTO> fetchRecentTrack() {
        ArrayList<RecentlyReviewedDTO> recentTrackDTO = new ArrayList<>();
        List<Review> rrByTrackName = reviewRepository.fetchRecentReviews();
        System.out.println("rrByTrackName: " + rrByTrackName);
        List<Track> tracks = new ArrayList<>();
        List<Album> albums = new ArrayList<>();
        List<String> both = new ArrayList<>();

        int x = 0;
        while (x < rrByTrackName.size() && x < 60) {
            for (int j = 0; j < min(rrByTrackName.size(), 60); j++) {
                if (rrByTrackName.get(j).getTrack() != null) {
                    String rrID = rrByTrackName.get(j).getTrack().getSpotifyURI();
                    Track trackName = trackRepository.fetchTrackbyRecentReview(rrID);
                    if (!tracks.contains(trackName)) {
                        tracks.add(trackName);
                        both.add("Track");
                    }
                } else {
                    String rrAlbumID = rrByTrackName.get(j).getAlbum().getSpotifyURI();
                    Album albumName = albumRepository.fetchAlbumbyRecentReview(rrAlbumID);
                    if (!albums.contains(albumName)) {
                        albums.add(albumName);
                        both.add("Album");
                    }
                }
                //System.out.println("tracks: " + tracks);
                x += 1;
                //System.out.println("x: " + x);
            }
        }
        int trackCounter = 0;
        int albumCounter = 0;
        for (int i = 0; i < (tracks.size() + albums.size()); i++) {
            RecentlyReviewedDTO rrDTO = new RecentlyReviewedDTO();
            rrDTO.setId(i + 1);
            if (both.get(i) == "Track") {
                rrDTO.setTrackURI(tracks.get(trackCounter).getSpotifyURI());
                rrDTO.setTrackName(tracks.get(trackCounter).getName());
                rrDTO.setAlbum(tracks.get(trackCounter).getAlbum().getName());
                rrDTO.setRating(tracks.get(trackCounter).getRating());
                rrDTO.setImgURL(tracks.get(trackCounter).getAlbum().getImageURL());
                Set<Artist> artistSet = tracks.get(trackCounter).getArtists();
                List<Artist> artistList = new ArrayList<>(artistSet);
                rrDTO.setArtist(artistList.get(0).getName());
                Set<Review> byTrackSpotifyURI = reviewRepository.findByTrackSpotifyURI(rrDTO.getTrackURI());
                rrDTO.setReviews(byTrackSpotifyURI.size());
                recentTrackDTO.add(rrDTO);
                trackCounter += 1;
            } else {
                rrDTO.setAlbumURI(albums.get(albumCounter).getSpotifyURI());
                rrDTO.setAlbum(albums.get(albumCounter).getName());
                rrDTO.setRating(albums.get(albumCounter).getRating());
                rrDTO.setImgURL(albums.get(albumCounter).getImageURL());
                Set<Artist> artistSet = albums.get(albumCounter).getArtists();
                List<Artist> artistList = new ArrayList<>(artistSet);
                rrDTO.setArtist(artistList.get(0).getName());
                Set<Review> byAlbumSpotifyURI = reviewRepository.findByAlbumSpotifyURI(rrDTO.getAlbumURI());
                rrDTO.setReviews(byAlbumSpotifyURI.size());
                //System.out.println("rrDTO: " + rrDTO);
                recentTrackDTO.add(rrDTO);
                albumCounter += 1;
            }
        }

        /*
        for (int i = 0; i < tracks.size(); i++) {
            RecentlyReviewedDTO rrDTO = new RecentlyReviewedDTO();
            rrDTO.setId(i + 1);
            rrDTO.setTrackURI(tracks.get(i).getSpotifyURI());
            rrDTO.setTrackName(tracks.get(i).getName());
            rrDTO.setAlbum(tracks.get(i).getAlbum().getName());
            rrDTO.setRating(tracks.get(i).getRating());
            rrDTO.setImgURL(tracks.get(i).getAlbum().getImageURL());
            Set<Artist> artistSet = tracks.get(i).getArtists();
            List<Artist> artistList = new ArrayList<>(artistSet);
            rrDTO.setArtist(artistList.get(0).getName());
            Set<Review> byTrackSpotifyURI = reviewRepository.findByTrackSpotifyURI(rrDTO.getTrackURI());
            rrDTO.setReviews(byTrackSpotifyURI.size());
            //System.out.println("rrDTO: " + rrDTO);

            recentTrackDTO.add(rrDTO);
            //System.out.println("recentTrackDTO: " + recentTrackDTO);
        }
        for (int k = 0; k < albums.size(); k++) {
            RecentlyReviewedDTO rrDTO = new RecentlyReviewedDTO();
            rrDTO.setId(k + 1);
            rrDTO.setAlbumURI(albums.get(k).getSpotifyURI());
            rrDTO.setAlbum(albums.get(k).getName());
            rrDTO.setRating(albums.get(k).getRating());
            rrDTO.setImgURL(albums.get(k).getImageURL());
            Set<Artist> artistSet = albums.get(k).getArtists();
            List<Artist> artistList = new ArrayList<>(artistSet);
            rrDTO.setArtist(artistList.get(0).getName());
            Set<Review> byAlbumSpotifyURI = reviewRepository.findByAlbumSpotifyURI(rrDTO.getAlbumURI());
            rrDTO.setReviews(byAlbumSpotifyURI.size());
            //System.out.println("rrDTO: " + rrDTO);
            recentTrackDTO.add(rrDTO);
            //System.out.println("recentTrackDTO: " + recentTrackDTO);
        }
        */
        return recentTrackDTO;
    }
}
