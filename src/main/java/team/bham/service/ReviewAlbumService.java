package team.bham.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import team.bham.service.dto.ReviewAlbumDTO;
import team.bham.service.dto.ReviewDTO;
import team.bham.service.dto.ReviewTrackDTO;

/**
 * Service interface for managing {@link team.bham.domain.Review} related to {@link team.bham.domain.Album}.
 */
public interface ReviewAlbumService {
    public ReviewAlbumDTO fetchReviewAndAlbumInfo(String albumSpotifyId);

    public void addReview(int rating, String content, String albumId, String userId);

    public Boolean checkExistAlbum(String albumId);

    public ReviewAlbumDTO fetchAlbumReviewAndAlbumInfo(String albumSpotifyId);

    public void deleteReview(String albumId, String username);
}
