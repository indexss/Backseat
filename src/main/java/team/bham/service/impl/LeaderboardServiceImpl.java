package team.bham.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import javax.annotation.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.bham.domain.Album;
import team.bham.domain.Artist;
import team.bham.domain.Review;
import team.bham.domain.Track;
import team.bham.repository.AlbumRepository;
import team.bham.repository.ReviewRepository;
import team.bham.repository.TrackRepository;
import team.bham.service.LeaderboardService;
import team.bham.service.dto.LeaderboardTrackDTO;

/**
 * @project : team31
 * @package: team.bham.service.impl
 * @class: LeaderboardServiceImpl
 * @date: (UTC + 0 London) 04/03/2024 11:52
 * @author: indexss (cnshilinli@gmail.com)
 * @description: TODO
 */

@Service
@Transactional
public class LeaderboardServiceImpl implements LeaderboardService {

    @Resource
    private TrackRepository trackRepository;

    @Resource
    private ReviewRepository reviewRepository;

    @Resource
    private AlbumRepository albumRepository;

    @Override
    public List<LeaderboardTrackDTO> fetchTrackLeaderboard() {
        ArrayList<LeaderboardTrackDTO> leaderboardTrackDTOS = new ArrayList<>();
        List<Track> tracks = trackRepository.fetchTrackByRating();
        for (int i = 0; i < tracks.size(); i++) {
            LeaderboardTrackDTO dto = new LeaderboardTrackDTO();
            dto.setId(i + 1);
            dto.setTrackName(tracks.get(i).getName());
            dto.setAlbum(tracks.get(i).getAlbum().getName());
            dto.setImgURL(tracks.get(i).getAlbum().getImageURL());
            dto.setRating(tracks.get(i).getRating());
            dto.setTrackURI(tracks.get(i).getSpotifyURI());
            Set<Review> byTrackSpotifyURI = reviewRepository.findByTrackSpotifyURI(dto.getTrackURI());
            dto.setReviews(byTrackSpotifyURI.size());
            Set<Artist> artists = tracks.get(i).getAlbum().getArtists();
            List<Artist> artistList = new ArrayList<>(artists);
            StringBuilder artistNameBuilder = new StringBuilder();
            for (int j = 0; j < artistList.size(); j++) {
                if (j == artistList.size() - 1) {
                    artistNameBuilder.append(artistList.get(j).getName());
                } else {
                    artistNameBuilder.append(artistList.get(j).getName());
                    artistNameBuilder.append(", ");
                }
            }
            dto.setArtist(artistNameBuilder.toString());

            leaderboardTrackDTOS.add(dto);
        }
        return leaderboardTrackDTOS;
    }

    @Override
    public List<LeaderboardTrackDTO> fetchTrackLeaderboardPagination(int page, int size) {
        ArrayList<LeaderboardTrackDTO> leaderboardTrackDTOS = new ArrayList<>();
        Pageable pageable = PageRequest.of(page, size);
        Page<Track> tracksPage = trackRepository.fetchTrackByRatingPagination(pageable);
        List<Track> content = tracksPage.getContent();
        int offset = page * size;
        for (int i = 0; i < content.size(); i++) {
            LeaderboardTrackDTO dto = new LeaderboardTrackDTO();
            dto.setId(i + 1 + offset);
            dto.setTrackName(content.get(i).getName());
            dto.setAlbum(content.get(i).getAlbum().getName());
            dto.setImgURL(content.get(i).getAlbum().getImageURL());
            dto.setRating(content.get(i).getRating());
            dto.setTrackURI(content.get(i).getSpotifyURI());
            Set<Review> byTrackSpotifyURI = reviewRepository.findByTrackSpotifyURI(dto.getTrackURI());
            dto.setReviews(byTrackSpotifyURI.size());
            Set<Artist> artists = content.get(i).getAlbum().getArtists();
            List<Artist> artistList = new ArrayList<>(artists);
            StringBuilder artistNameBuilder = new StringBuilder();
            for (int j = 0; j < artistList.size(); j++) {
                if (j == artistList.size() - 1) {
                    artistNameBuilder.append(artistList.get(j).getName());
                } else {
                    artistNameBuilder.append(artistList.get(j).getName());
                    artistNameBuilder.append(", ");
                }
            }
            dto.setArtist(artistNameBuilder.toString());

            leaderboardTrackDTOS.add(dto);
        }

        return leaderboardTrackDTOS;
    }

    @Override
    // I'm sorry to write code ugly like this but, I HATE THIS METHOD TOO.
    // You may be curious why I wrote a bunch of Repository methods
    // and did a bunch of ugly conditional judgments here.
    // Nice question. That's because JPA and JPQL are rubbish.
    // I can't believe that JPA with JPQL can't select the sorting key and ASC or DESC
    // order by conditional judgment in 2024.

    public List<LeaderboardTrackDTO> fetchLeaderboardWithFilter(
        String category,
        String key,
        LocalDate startTime,
        LocalDate endTime,
        String order,
        String search,
        int page,
        int size
    ) {
        ArrayList<LeaderboardTrackDTO> leaderboardTrackDTOS = new ArrayList<>();
        Pageable pageable = PageRequest.of(page, size);
        Page<Track> tracksPage = null;
        Page<Album> albumPage = null;

        if (category.equals("track")) {
            if (key.equals("rating")) {
                if (order.equals("desc")) {
                    tracksPage = trackRepository.fetchTrackLBWithFilterRatingDESC(startTime, endTime, search, pageable);
                } else if (order.equals("asc")) {
                    tracksPage = trackRepository.fetchTrackLBWithFilterRatingASC(startTime, endTime, search, pageable);
                }
            } else if (key.equals("review")) {
                if (order.equals("desc")) {
                    tracksPage = trackRepository.fetchTrackLBWithFilterReviewsDESC(startTime, endTime, search, pageable);
                } else if (order.equals("asc")) {
                    tracksPage = trackRepository.fetchTrackLBFilterReviewsASC(startTime, endTime, search, pageable);
                }
            }
            // TODO: add TrackRecord into DTO
            List<Track> content = tracksPage.getContent();
            int offset = page * size;
            for (int i = 0; i < content.size(); i++) {
                LeaderboardTrackDTO dto = new LeaderboardTrackDTO();
                dto.setId(i + 1 + offset);
                dto.setTrackName(content.get(i).getName());
                dto.setAlbum(content.get(i).getAlbum().getName());
                dto.setImgURL(content.get(i).getAlbum().getImageURL());
                dto.setRating(content.get(i).getRating());
                dto.setTrackURI(content.get(i).getSpotifyURI());
                Set<Review> byTrackSpotifyURI = reviewRepository.findByTrackSpotifyURI(dto.getTrackURI());
                dto.setReviews(byTrackSpotifyURI.size());
                Set<Artist> artists = content.get(i).getAlbum().getArtists();
                List<Artist> artistList = new ArrayList<>(artists);
                StringBuilder artistNameBuilder = new StringBuilder();
                for (int j = 0; j < artistList.size(); j++) {
                    if (j == artistList.size() - 1) {
                        artistNameBuilder.append(artistList.get(j).getName());
                    } else {
                        artistNameBuilder.append(artistList.get(j).getName());
                        artistNameBuilder.append(", ");
                    }
                }
                dto.setArtist(artistNameBuilder.toString());

                leaderboardTrackDTOS.add(dto);
            }
        } else if (category.equals("album")) {
            if (key.equals("rating")) {
                if (order.equals("desc")) {
                    albumPage = albumRepository.fetchAlbumLBWithFilterRatingDESC(startTime, endTime, search, pageable);
                } else if (order.equals("asc")) {
                    albumPage = albumRepository.fetchAlbumLBWithFilterRatingASC(startTime, endTime, search, pageable);
                }
            } else if (key.equals("review")) {
                if (order.equals("desc")) {
                    albumPage = albumRepository.fetchAlbumLBWithFilterReviewsDESC(startTime, endTime, search, pageable);
                } else if (order.equals("asc")) {
                    albumPage = albumRepository.fetchAlbumLBWithFilterReviewsASC(startTime, endTime, search, pageable);
                }
            }
            // TODO: add AlbumRecord into TrackDTO
            List<Album> content = albumPage.getContent();
            int offset = page * size;
            //id自动生成
            //albumName -> trackName        1
            //albumReviews -> trackReviews
            //albumRating -> trackRating    1
            //albumArtist -> trackArtist
            //albumURI -> trackURI          1
            //albumImgURL -> trackImgURL    1
            for (int i = 0; i < content.size(); i++) {
                LeaderboardTrackDTO dto = new LeaderboardTrackDTO();
                dto.setId(i + 1 + offset);
                dto.setTrackName(content.get(i).getName());
                dto.setImgURL(content.get(i).getImageURL());
                dto.setRating(content.get(i).getRating());
                dto.setTrackURI(content.get(i).getSpotifyURI());
                //                Set<Review> byTrackSpotifyURI = reviewRepository.findByTrackSpotifyURI(dto.getTrackURI());
                int reviews = 0;
                Set<Review> byTrackSpotifyURI = content.get(i).getReviews();

                dto.setReviews(byTrackSpotifyURI.size());
                Set<Artist> artists = content.get(i).getArtists();
                List<Artist> artistList = new ArrayList<>(artists);
                StringBuilder artistNameBuilder = new StringBuilder();
                for (int j = 0; j < artistList.size(); j++) {
                    if (j == artistList.size() - 1) {
                        artistNameBuilder.append(artistList.get(j).getName());
                    } else {
                        artistNameBuilder.append(artistList.get(j).getName());
                        artistNameBuilder.append(", ");
                    }
                }
                dto.setArtist(artistNameBuilder.toString());

                leaderboardTrackDTOS.add(dto);
            }
        }

        return leaderboardTrackDTOS;
    }
}
