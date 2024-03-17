package team.bham.web.rest;

import javax.annotation.Resource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import team.bham.service.ReviewTrackSevice;
import team.bham.service.dto.AddReviewDTO;
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
        //        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        //        String userId = null;
        //        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
        //            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        //            userId = userDetails.getUsername();
        //        } else if (authentication != null && authentication.getPrincipal() instanceof String) {
        //            userId = (String) authentication.getPrincipal();
        //        }
        //        System.out.println("%%%%%%%%%%%988888888 UserId is:" + userId);
        return resp;
    }

    @PostMapping("/addreview")
    public ResponseUtils addReview(@RequestBody AddReviewDTO addReviewDTO) {
        ResponseUtils resp = null;
        System.out.println("Received review: " + addReviewDTO);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = null;
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            userId = userDetails.getUsername();
        } else if (authentication != null && authentication.getPrincipal() instanceof String) {
            userId = (String) authentication.getPrincipal();
        }
        //        System.out.println("7777777777: " + addReviewDTO.getId());
        //        System.out.println("7777777777: " + addReviewDTO.getContent());
        //        System.out.println("7777777777: " + addReviewDTO.getRating());

        //        System.out.println("888888888888888888888888: " + userId);
        try {
            System.out.println(userId);
            reviewTrackSevice.addReview(addReviewDTO.getRating(), addReviewDTO.getContent(), addReviewDTO.getId(), userId);

            resp = new ResponseUtils();
        } catch (Exception e) {
            e.printStackTrace();
            resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
        }
        return resp;
    }

    @GetMapping("/check")
    public ResponseUtils checkExist(String id) {
        ResponseUtils resp = null;
        Boolean checkedExist = reviewTrackSevice.checkExist(id);
        if (checkedExist) {
            resp = new ResponseUtils().put("exist", "true");
        } else {
            resp = new ResponseUtils().put("exist", "false");
        }
        return resp;
    }
}
