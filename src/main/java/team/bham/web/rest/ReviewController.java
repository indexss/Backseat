package team.bham.web.rest;

import javax.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.bham.service.ReviewTrackSevice;
import team.bham.service.dto.ReviewTrackDTO;
import team.bham.utils.ResponseUtils;

/**
 * @project : team31
 * @package: team.bham.web.rest
 * @class: ReviewController
 * @date: (UTC + 0 London) 03/03/2024 15:08
 * @author: indexss (cnshilinli@gmail.com)
 * @description: Return the necessary information for Track's comments, for the /rating.
 */

@RestController
@RequestMapping("/api")
public class ReviewController {

    @Resource
    private ReviewTrackSevice reviewTrackSevice;

    @GetMapping("/reivews")
    public ResponseUtils fetchReviews(String id) {
        ResponseUtils resp = null;
        try {
            ReviewTrackDTO reviewTrackDTO = reviewTrackSevice.fetchReviewAndTrackInfo(id);
            resp = new ResponseUtils().put("review", reviewTrackDTO);
        } catch (Exception e) {
            e.printStackTrace();
            resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
        }
        return resp;
    }
}
