package team.bham.service;

import java.util.ArrayList;
import team.bham.service.dto.ReviewTrackDTO;

/**
 * @project : team31
 * @package: team.bham.service
 * @interface: ReviewTrackSevice
 * @date: (UTC + 0) 03/03/2024 15:34
 * @author: indexss (cnshilinli@gmail.com)
 * @description: TODO
 */

public interface ReviewTrackSevice {
    public ReviewTrackDTO fetchReviewAndTrackInfo(String trackSpotifyId);

    public void addReview(int rating, String content, String trackId, String userId);

    public Boolean checkExist(String trackId);

    public void deleteReview(String trackId, String username);
}
